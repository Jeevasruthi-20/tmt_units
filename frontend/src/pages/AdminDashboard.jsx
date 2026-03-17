import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEnrollments, fetchMeasurements, updateEnrollmentStatus, updateMeasurementStatus } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { format, isToday, isThisWeek } from 'date-fns';
import { 
    Download, 
    FileDown, 
    CheckCircle, 
    TrendingUp, 
    Users as UsersIcon, 
    ShoppingBag, 
    Clock, 
    AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { exportEnrollmentsPDF, exportMeasurementsPDF, exportSingleEnrollmentPDF, exportSingleMeasurementPDF } from '@/lib/pdf-export';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';

const categorizeData = (data) => {
    const categories = {
        'New (Today)': [],
        'This Week': [],
        'Older': []
    };

    data.forEach(item => {
        if (!item.createdAt) {
            categories['Older'].push(item);
            return;
        }
        
        const date = new Date(item.createdAt);
        if (isToday(date)) {
            categories['New (Today)'].push(item);
        } else if (isThisWeek(date)) {
            categories['This Week'].push(item);
        } else {
            categories['Older'].push(item);
        }
    });

    return categories;
};

const renderTableGroups = (groupedData, renderRow) => {
    return ['New (Today)', 'This Week', 'Older'].map(category => {
        const items = groupedData[category];
        if (!items || items.length === 0) return null;
        return (
            <tbody key={category} className="divide-y border-b border-muted">
                <tr className="bg-muted">
                    <td colSpan={10} className="px-4 py-2 font-semibold text-sm text-foreground">
                        {category} ({items.length})
                    </td>
                </tr>
                {items.map(renderRow)}
            </tbody>
        );
    });
};

export default function AdminDashboard() {
    const [enrollments, setEnrollments] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusError, setStatusError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Check auth
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin');
            return;
        }

        const loadData = async () => {
            try {
                const [enrollRes, measureRes] = await Promise.all([
                    fetchEnrollments(),
                    fetchMeasurements()
                ]);
                if (enrollRes.success) setEnrollments(enrollRes.data);
                if (measureRes.success) setMeasurements(measureRes.data);
            } catch (error) {
                console.error('Failed to load dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [navigate]);

    if (loading) {
        return <div className="p-8 text-center">Loading dashboard...</div>;
    }

    const activeEnrollments = enrollments.filter(e => e.status !== 'completed');
    const activeMeasurements = measurements.filter(m => m.status !== 'completed');

    const groupedEnrollments = categorizeData(activeEnrollments);
    const groupedMeasurements = categorizeData(activeMeasurements);

    const stats = [
        {
            label: 'Total Enrollments',
            value: enrollments.length,
            active: activeEnrollments.length,
            icon: UsersIcon,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            label: 'Stitching Orders',
            value: measurements.length,
            active: activeMeasurements.length,
            icon: ShoppingBag,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
        },
        {
            label: 'New Today',
            value: enrollments.filter(e => isToday(new Date(e.createdAt))).length + 
                   measurements.filter(m => isToday(new Date(m.createdAt))).length,
            icon: Clock,
            color: 'text-amber-600',
            bg: 'bg-amber-50'
        },
        {
            label: 'Action Required',
            value: activeEnrollments.length + activeMeasurements.length,
            icon: AlertCircle,
            color: 'text-rose-600',
            bg: 'bg-rose-50'
        }
    ];

    const handleUpdateEnrollmentStatus = async (id, status) => {
        try {
            await updateEnrollmentStatus(id, status);
            setEnrollments(enrollments.map(e => e._id === id ? { ...e, status } : e));
            setStatusError("");
        } catch (error) {
            setStatusError(error.message || "Failed to update status");
            console.error('Failed to update status', error);
        }
    };

    const handleUpdateMeasurementStatus = async (id, status) => {
        try {
            await updateMeasurementStatus(id, status);
            setMeasurements(measurements.map(m => m._id === id ? { ...m, status } : m));
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            {statusError && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded border border-red-300">
                    {statusError}
                </div>
            )}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage your enrollments and stitching orders.</p>
                </div>
                <div className="flex gap-4">
                    <Button asChild variant="secondary">
                        <Link to="/admin/completed">View Completed</Link>
                    </Button>
                    <Button onClick={() => {
                        localStorage.removeItem('isAdmin');
                        navigate('/admin');
                    }} variant="outline">Logout</Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                                    {stat.active !== undefined && (
                                        <p className="text-xs text-muted-foreground">
                                            <span className="font-semibold text-primary">{stat.active}</span> pending
                                        </p>
                                    )}
                                </div>
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-8">
                {/* Class Enrollments */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Class Enrollments & Inquiries</CardTitle>
                        <Button
                            onClick={() => exportEnrollmentsPDF(enrollments)}
                            variant="outline"
                            size="sm"
                            disabled={enrollments.length === 0}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {enrollments.length === 0 ? (
                            <p className="text-muted-foreground text-center py-8">No enrollments found.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                        <tr>
                                            <th className="px-4 py-3">Date</th>
                                            <th className="px-4 py-3">Type</th>
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Contact</th>
                                            <th className="px-4 py-3">Details</th>
                                            <th className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    {renderTableGroups(groupedEnrollments, (enrollment) => (
                                        <tr key={enrollment._id || enrollment.id} className="hover:bg-muted/50">
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                {enrollment.createdAt ? format(new Date(enrollment.createdAt), 'MMM d, yyyy') : '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge variant={enrollment.type === 'online' ? 'default' : 'secondary'}>
                                                    {enrollment.type}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 font-medium">{enrollment.name}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    <span>{enrollment.email}</span>
                                                    <span className="text-xs text-muted-foreground">{enrollment.phone}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="max-w-xs">
                                                    <p><span className="font-semibold">Class:</span> {enrollment.classType}</p>
                                                    {enrollment.type === 'online' ? (
                                                        <p className="text-xs text-muted-foreground">
                                                            Pref: {enrollment.preferredDate} @ {enrollment.preferredTime}
                                                        </p>
                                                    ) : (
                                                        <p className="text-xs text-muted-foreground truncate" title={enrollment.message}>
                                                            Msg: {enrollment.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        onClick={() => exportSingleEnrollmentPDF(enrollment)} 
                                                        title="Download PDF"
                                                    >
                                                        <FileDown className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Measurement Orders */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Stitching & Measurement Orders</CardTitle>
                        <Button
                            onClick={() => exportMeasurementsPDF(measurements)}
                            variant="outline"
                            size="sm"
                            disabled={measurements.length === 0}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {measurements.length === 0 ? (
                            <p className="text-muted-foreground text-center py-8">No measurement orders found.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                        <tr>
                                            <th className="px-4 py-3">Date</th>
                                            <th className="px-4 py-3">Garment</th>
                                            <th className="px-4 py-3">Customer</th>
                                            <th className="px-4 py-3">Measurements</th>
                                            <th className="px-4 py-3 text-center">Design</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    {renderTableGroups(groupedMeasurements, (order) => (
                                        <tr key={order._id || order.id} className="hover:bg-muted/50">
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                {order.createdAt ? format(new Date(order.createdAt), 'MMM d, yyyy') : '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge variant="outline">{order.garmentType}</Badge>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{order.customerName}</span>
                                                    <span className="text-xs text-muted-foreground">{order.email}</span>
                                                    <span className="text-xs text-muted-foreground">{order.phone}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="text-xs space-y-1">
                                                    {Object.entries(order.measurements || {})
                                                        .filter(([key]) => !key.endsWith('_inches') && key !== 'unit')
                                                        .map(([key, val]) => (
                                                            <p key={key}><span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {val} {order.measurements.unit === 'inches' ? 'in' : 'cm'}</p>
                                                        ))
                                                    }
                                                    {order.notes && (
                                                        <p className="mt-2 pt-2 border-t font-italic text-muted-foreground">
                                                            Notes: {order.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                {order.designFile ? (
                                                    <a 
                                                        href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/..${order.designFile}`} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                                                    >
                                                        <FileDown className="h-4 w-4" />
                                                        View
                                                    </a>
                                                ) : (
                                                    <span className="text-muted-foreground italic">None</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Select 
                                                    value={order.status} 
                                                    onValueChange={(value) => handleUpdateMeasurementStatus(order._id || order.id, value)}
                                                >
                                                    <SelectTrigger className="w-[120px] h-8 text-xs">
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pending">Pending</SelectItem>
                                                        <SelectItem value="processing">Processing</SelectItem>
                                                        <SelectItem value="completed">Completed</SelectItem>
                                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        onClick={() => exportSingleMeasurementPDF(order)} 
                                                        title="Download PDF"
                                                    >
                                                        <FileDown className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
