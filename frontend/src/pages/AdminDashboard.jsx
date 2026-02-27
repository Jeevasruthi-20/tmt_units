import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEnrollments } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

export default function AdminDashboard() {
    const [enrollments, setEnrollments] = useState([]);
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
                const response = await fetchEnrollments();
                if (response.success) {
                    setEnrollments(response.data);
                }
            } catch (error) {
                console.error('Failed to load enrollments:', error);
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

            <div className="grid gap-6">
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
            </div>
        </div>
    );
}

import { Button } from '@/components/ui/button';
