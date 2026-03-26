import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function ContactPage() {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.8 }
        }
    };

    const contactMethods = [
        {
            icon: Phone,
            title: 'Direct Line',
            value: '+91 XXXXX XXXXX',
            description: 'Available Mon-Sat, 9am - 7pm',
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            icon: Mail,
            title: 'Email Address',
            value: 'thangamwrites@gmail.com',
            description: 'Expect a response within 24 hours',
            color: 'text-rose-600',
            bg: 'bg-rose-50'
        },
        {
            icon: MessageSquare,
            title: 'WhatsApp Business',
            value: 'Connect on Chat',
            description: 'Instant support for design queries',
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
        }
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Legend Hero Header */}
            <section className="relative pt-16 pb-12 lg:pt-20 lg:pb-16 bg-muted/30 overflow-hidden border-b border-border/40">
                <div className="container relative z-10 mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Breadcrumbs />
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                                <Sparkles className="h-3.5 w-3.5" />
                                Boutique Command Center
                            </div>
                            <h1 className="font-serif font-bold text-6xl lg:text-8xl text-foreground tracking-tight">
                                Reach Our <span className="text-primary italic">Atelier</span>
                            </h1>
                            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                                Whether you're inquiring about a bespoke creation or seeking admission to our academy, we're here to guide you.
                            </p>
                        </motion.div>
                    </div>
                </div>
                {/* Background Decoration */}
                <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
            </section>

            <section className="container mx-auto px-4 py-20 lg:py-32">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left: Contact Info */}
                    <div className="lg:col-span-12 xl:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <h2 className="font-serif font-bold text-4xl text-foreground tracking-tight">Global Inquiries</h2>
                            <p className="text-muted-foreground font-light leading-relaxed text-lg italic">
                                "Every stitch begins with a conversation. Let's start the dialogue today."
                            </p>
                            <div className="h-1 w-20 bg-primary rounded-full"></div>
                        </div>

                        <div className="space-y-6">
                            {contactMethods.map((method, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    initial="initial"
                                    whileInView="animate"
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-white border border-border/50 shadow-sm hover:shadow-md transition-all group">
                                        <div className={`w-14 h-14 rounded-2xl ${method.bg} ${method.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                            <method.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{method.title}</p>
                                            <p className="text-lg font-bold text-foreground">{method.value}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-10 rounded-[2.5rem] bg-[#3c2a21] text-white space-y-8 relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(60,42,33,0.3)]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors"></div>
                            <div className="relative z-10 flex items-start gap-6">
                                <MapPin className="h-8 w-8 text-primary shrink-0" />
                                <div>
                                    <h3 className="text-xl font-bold mb-2 font-serif">Main Boutique Office</h3>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        Tamil Nadu, India<br />
                                        Serving Global Clients & Students
                                    </p>
                                </div>
                            </div>
                            <div className="relative z-10 flex items-start gap-6">
                                <Clock className="h-8 w-8 text-primary shrink-0" />
                                <div>
                                    <h3 className="text-xl font-bold mb-2 font-serif">Atelier Hours</h3>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        Monday — Saturday<br />
                                        09:00 AM — 07:00 PM IST
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Message Form */}
                    <motion.div 
                        className="lg:col-span-12 xl:col-span-7"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <Card className="rounded-[3rem] border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-white/50 backdrop-blur-xl overflow-hidden p-8 lg:p-16">
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <h3 className="font-serif font-bold text-4xl tracking-tight">Send a Dispatch</h3>
                                    <p className="text-muted-foreground font-light text-lg">Inquire about our masterclasses or custom tailoring services.</p>
                                </div>

                                <form className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                                            <input type="text" placeholder="John Doe" className="w-full h-16 rounded-2xl bg-muted/40 border-none px-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Coordinates</label>
                                            <input type="email" placeholder="john@example.com" className="w-full h-16 rounded-2xl bg-muted/40 border-none px-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Inquiry Type</label>
                                        <select className="w-full h-16 rounded-2xl bg-muted/40 border-none px-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer">
                                            <option>General Inquiry</option>
                                            <option>Academy Admission</option>
                                            <option>Bespoke Tailoring</option>
                                            <option>Wholesale/Collaboration</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Narrative</label>
                                        <textarea rows={6} placeholder="Tell us about your creative vision..." className="w-full rounded-2xl bg-muted/40 border-none p-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"></textarea>
                                    </div>
                                    <Button className="h-16 w-full rounded-2xl text-lg font-bold gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                                        Transmit Message <Send className="h-5 w-5" />
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
