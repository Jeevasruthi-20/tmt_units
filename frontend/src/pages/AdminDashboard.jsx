import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEnrollments, fetchMeasurements } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

export default function AdminDashboard() {
    const [enrollments, setEnrollments] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [loading, setLoading] = useState(true);
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

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Button onClick={() => {
                    localStorage.removeItem('isAdmin');
                    navigate('/admin');
                }} variant="outline">Logout</Button>
            </div>

            <div className="grid gap-8">
                {/* Class Enrollments */}
                <Card>
                    <CardHeader>
                        <CardTitle>Class Enrollments & Inquiries</CardTitle>
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
                                            <th className="px-4 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {enrollments.map((enrollment) => (
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
                                                <td className="px-4 py-3">
                                                    <Badge variant="outline">{enrollment.status}</Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Measurement Orders */}
                <Card>
                    <CardHeader>
                        <CardTitle>Stitching & Measurement Orders</CardTitle>
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
                                            <th className="px-4 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {measurements.map((order) => (
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
                                                <td className="px-4 py-3">
                                                    <Badge variant="outline">{order.status}</Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

import { Button } from '@/components/ui/button';
