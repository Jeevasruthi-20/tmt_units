import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEnrollments, fetchMeasurements } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { format, isToday, isThisWeek } from 'date-fns';
import { Download, FileDown, ArrowLeft, CheckCircle2, PackageCheck, LogOut, Search, Clock, Archive } from 'lucide-react';
import { Link } from 'react-router-dom';
import { exportEnrollmentsPDF, exportMeasurementsPDF, exportSingleEnrollmentPDF, exportSingleMeasurementPDF } from '@/lib/pdf-export';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateMeasurementStatus } from '@/lib/api';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

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
                <tr className="bg-muted/30">
                    <td colSpan={10} className="px-6 py-3 font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
                        {category} ({items.length})
                    </td>
                </tr>
                {items.map(renderRow)}
            </tbody>
        );
    });
};

export default function AdminCompleted() {
    const [enrollments, setEnrollments] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
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
                console.error('Failed to load completed data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [navigate]);

    const handleUpdateMeasurementStatus = async (id, status) => {
        try {
            await updateMeasurementStatus(id, status);
            setMeasurements(measurements.map(m => m._id === id ? { ...m, status } : m));
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const completedEnrollments = enrollments.filter(e => e.status === 'completed');
    const completedMeasurements = measurements.filter(m => m.status === 'completed');

    const filteredEnrollments = completedEnrollments.filter(e => 
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        e.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredMeasurements = completedMeasurements.filter(m => 
        m.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groupedEnrollments = categorizeData(filteredEnrollments);
    const groupedMeasurements = categorizeData(filteredMeasurements);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center space-y-4">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full"
                />
                <p className="text-zinc-500 font-serif italic">Accessing Archives...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24">
            {/* Header Section */}
            <header className="bg-white border-b border-border/40 sticky top-0 z-50 backdrop-blur-md bg-white/80">
                <div className="container mx-auto px-4 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link to="/admin/dashboard" className="p-2 hover:bg-muted rounded-full transition-colors group">
                            <ArrowLeft className="h-6 w-6 text-zinc-400 group-hover:text-primary transition-colors" />
                        </Link>
                        <div>
                            <Breadcrumbs />
                            <h1 className="text-3xl font-serif font-bold text-zinc-900 tracking-tight flex items-center gap-3">
                                <Archive className="h-6 w-6 text-primary" />
                                Historical Records
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input 
                                type="text" 
                                placeholder="Search archives..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-11 w-64 pl-10 pr-4 bg-muted/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                        <Button 
                            onClick={() => {
                                localStorage.removeItem('isAdmin');
                                navigate('/admin');
                            }} 
                            variant="ghost"
                            className="text-zinc-500 hover:text-red-500 hover:bg-red-50 font-bold text-xs uppercase tracking-widest"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log Out
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto py-12 px-4 space-y-12">
                {/* Stats Summary Area */}
                <section className="grid md:grid-cols-3 gap-6">
                    <Card className="border-none shadow-sm rounded-3xl bg-white group hover:shadow-md transition-all">
                        <CardContent className="p-8 flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <CheckCircle2 className="h-7 w-7" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Total Graduates</p>
                                <p className="text-3xl font-serif font-bold text-zinc-900">{completedEnrollments.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm rounded-3xl bg-white group hover:shadow-md transition-all">
                        <CardContent className="p-8 flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <PackageCheck className="h-7 w-7" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Orders Fulfilled</p>
                                <p className="text-3xl font-serif font-bold text-zinc-900">{completedMeasurements.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm rounded-3xl bg-white group hover:shadow-md transition-all">
                        <CardContent className="p-8 flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-zinc-50 text-zinc-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Clock className="h-7 w-7" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Archive Integrity</p>
                                <p className="text-3xl font-serif font-bold text-zinc-900">100%</p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Enrollments Table */}
                <Card className="border-none shadow-xl shadow-zinc-200/50 rounded-[2.5rem] bg-white overflow-hidden">
                    <CardHeader className="p-8 lg:p-10 flex flex-row items-center justify-between border-b border-border/40">
                        <div>
                            <CardTitle className="text-2xl font-serif font-bold text-zinc-900 tracking-tight">Completed Admissions</CardTitle>
                            <CardDescription className="italic font-light">Comprehensive list of graduated students and certified artisans.</CardDescription>
                        </div>
                        <Button
                            onClick={() => exportEnrollmentsPDF(completedEnrollments)}
                            variant="outline"
                            className="rounded-xl border-zinc-200 hover:bg-zinc-50 font-bold text-xs uppercase tracking-widest h-11 px-6"
                            disabled={completedEnrollments.length === 0}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export PDF
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="bg-zinc-50/50 text-muted-foreground text-[10px] uppercase font-bold tracking-[0.2em]">
                                    <tr>
                                        <th className="px-8 py-5 border-b border-border/40">Creation</th>
                                        <th className="px-8 py-5 border-b border-border/40">Pathway</th>
                                        <th className="px-8 py-5 border-b border-border/40">Candidate</th>
                                        <th className="px-8 py-5 border-b border-border/40">Intelligence</th>
                                        <th className="px-8 py-5 border-b border-border/40 text-right">Dossier</th>
                                    </tr>
                                </thead>
                                {renderTableGroups(groupedEnrollments, (enrollment) => (
                                    <tr key={enrollment._id || enrollment.id} className="hover:bg-zinc-50/50 transition-colors group border-b border-border/10 last:border-0 font-medium">
                                        <td className="px-8 py-6 text-zinc-500 italic">
                                            {enrollment.createdAt ? format(new Date(enrollment.createdAt), 'MMM d, yyyy') : '-'}
                                        </td>
                                        <td className="px-8 py-6">
                                            <Badge className={`rounded-lg px-2.5 py-1 uppercase text-[9px] font-bold tracking-widest ${enrollment.type === 'online' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'} border shadow-none`}>
                                                {enrollment.type}
                                            </Badge>
                                        </td>
                                        <td className="px-8 py-6 text-zinc-900 font-bold">{enrollment.name}</td>
                                        <td className="px-8 py-6">
                                            <p className="text-zinc-600">{enrollment.classType}</p>
                                            <p className="text-[11px] text-zinc-400 italic">
                                                {enrollment.email} &bull; {enrollment.phone}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-md transition-all text-primary"
                                                onClick={() => exportSingleEnrollmentPDF(enrollment)} 
                                            >
                                                <FileDown className="h-5 w-5" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                            {completedEnrollments.length === 0 && (
                                <div className="py-24 text-center">
                                    <Clock className="h-12 w-12 text-zinc-200 mx-auto mb-4" />
                                    <p className="text-zinc-400 italic">No historical admissions data found.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Measurements Table */}
                <Card className="border-none shadow-xl shadow-zinc-200/50 rounded-[2.5rem] bg-white overflow-hidden">
                    <CardHeader className="p-8 lg:p-10 flex flex-row items-center justify-between border-b border-border/40">
                        <div>
                            <CardTitle className="text-2xl font-serif font-bold text-zinc-900 tracking-tight">Fulfillment Archives</CardTitle>
                            <CardDescription className="italic font-light">Registry of custom garments stitched and delivered to clients.</CardDescription>
                        </div>
                        <Button
                            onClick={() => exportMeasurementsPDF(completedMeasurements)}
                            variant="outline"
                            className="rounded-xl border-zinc-200 hover:bg-zinc-50 font-bold text-xs uppercase tracking-widest h-11 px-6"
                            disabled={completedMeasurements.length === 0}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export PDF
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="bg-zinc-50/50 text-muted-foreground text-[10px] uppercase font-bold tracking-[0.2em]">
                                    <tr>
                                        <th className="px-8 py-5 border-b border-border/40">Delivery</th>
                                        <th className="px-8 py-5 border-b border-border/40">Silhouette</th>
                                        <th className="px-8 py-5 border-b border-border/40">Client</th>
                                        <th className="px-8 py-5 border-b border-border/40 text-center">Schematics</th>
                                        <th className="px-8 py-5 border-b border-border/40">Validation</th>
                                        <th className="px-8 py-5 border-b border-border/40 text-right">Dossier</th>
                                    </tr>
                                </thead>
                                {renderTableGroups(groupedMeasurements, (order) => (
                                    <tr key={order._id || order.id} className="hover:bg-zinc-50/50 transition-colors group border-b border-border/10 last:border-0 font-medium">
                                        <td className="px-8 py-6 text-zinc-500 italic">
                                            {order.createdAt ? format(new Date(order.createdAt), 'MMM d, yyyy') : '-'}
                                        </td>
                                        <td className="px-8 py-6">
                                            <Badge variant="outline" className="rounded-lg border-zinc-200 text-zinc-600 font-bold uppercase text-[9px] tracking-widest">
                                                {order.garmentType}
                                            </Badge>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-zinc-900 font-bold">{order.customerName}</p>
                                            <p className="text-[11px] text-zinc-400 italic">{order.email}</p>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            {order.designFile ? (
                                                <a 
                                                    href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/..${order.designFile}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-primary hover:underline font-bold text-xs uppercase tracking-widest"
                                                >
                                                    <FileDown className="h-4 w-4" />
                                                    View Sketch
                                                </a>
                                            ) : (
                                                <span className="text-zinc-300 italic text-xs">Standard</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6">
                                            <Select 
                                                value={order.status} 
                                                onValueChange={(value) => handleUpdateMeasurementStatus(order._id || order.id, value)}
                                            >
                                                <SelectTrigger className="w-[140px] h-10 text-[10px] font-bold uppercase tracking-widest bg-emerald-50 border-emerald-100 text-emerald-700 rounded-xl">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-border/40">
                                                    <SelectItem value="pending" className="text-xs">Pending</SelectItem>
                                                    <SelectItem value="processing" className="text-xs">Processing</SelectItem>
                                                    <SelectItem value="completed" className="text-xs font-bold text-emerald-600">Completed</SelectItem>
                                                    <SelectItem value="cancelled" className="text-xs text-red-500">Cancelled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-md transition-all text-primary"
                                                onClick={() => exportSingleMeasurementPDF(order)} 
                                            >
                                                <FileDown className="h-5 w-5" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                            {completedMeasurements.length === 0 && (
                                <div className="py-24 text-center">
                                    <Archive className="h-12 w-12 text-zinc-200 mx-auto mb-4" />
                                    <p className="text-zinc-400 italic">No historical fulfillment data found.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

