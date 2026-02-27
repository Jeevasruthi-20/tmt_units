import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OnlineClassForm from '@/components/forms/OnlineClassForm';
import OfflineClassForm from '@/components/forms/OfflineClassForm';
import { courses } from '@/data/courses';

export default function EnrollmentPage() {
    const [searchParams] = useSearchParams();
    const initialClassId = searchParams.get('classId');

    return (
        <div className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="font-serif font-bold text-4xl lg:text-5xl text-foreground mb-4">
                        Enroll Now
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Choose your preferred learning mode to get started with your journey.
                    </p>
                </div>

                <Card className="shadow-xl">
                    <CardContent className="p-6 lg:p-8">
                        <Tabs defaultValue="online" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8">
                                <TabsTrigger value="online" className="text-base">Online Classes</TabsTrigger>
                                <TabsTrigger value="offline" className="text-base">Offline Classes</TabsTrigger>
                            </TabsList>

                            <TabsContent value="online" className="space-y-6">
                                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-semibold text-foreground">Online Classes:</span> Join from anywhere with live interactive sessions. Select your preferred time slot and we'll confirm your schedule.
                                    </p>
                                </div>
                                <OnlineClassForm classes={courses} initialClassId={initialClassId} />
                            </TabsContent>

                            <TabsContent value="offline" className="space-y-6">
                                <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-semibold text-foreground">Offline Classes:</span> Attend in-person sessions at our center. Submit your details and we'll contact you with available schedules.
                                    </p>
                                </div>
                                <OfflineClassForm classes={courses} initialClassId={initialClassId} />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
