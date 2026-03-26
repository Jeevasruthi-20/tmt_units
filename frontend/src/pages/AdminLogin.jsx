import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';

// Configure API base URL:
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    useState(() => {
        if (localStorage.getItem('isAdmin') === 'true') {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('userEmail', data.user.email);
                toast({
                    title: 'Authentication Successful',
                    description: `Welcome back to the Command Center.`,
                });
                navigate('/admin/dashboard');
            } else {
                toast({
                    title: 'Access Denied',
                    description: data.message || 'Invalid credentials provided.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            toast({
                title: 'System Error',
                description: 'Unable to connect to the authentication server.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-lg relative z-10"
            >
                <Card className="border-none shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] bg-zinc-900/80 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-primary via-primary/50 to-primary"></div>
                    <CardHeader className="space-y-4 pt-12 pb-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 rounded-3xl bg-zinc-800 flex items-center justify-center ring-1 ring-white/10 shadow-2xl">
                                <ShieldCheck className="h-10 w-10 text-primary" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Sparkles className="h-3 w-3 text-primary/60" />
                                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-primary/60">Secure Portal</span>
                                <Sparkles className="h-3 w-3 text-primary/60" />
                            </div>
                            <CardTitle className="text-4xl font-serif font-bold text-white tracking-tight">Admin Gateway</CardTitle>
                            <CardDescription className="text-zinc-400 font-light italic">
                                Please authenticate to access the boutique management suite.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="px-12 pb-16">
                        <form onSubmit={handleLogin} className="space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-3 group">
                                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1 group-focus-within:text-primary transition-colors">
                                        Intelligence ID
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="identity@thangam.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="h-14 pl-12 bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-600 rounded-2xl focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3 group">
                                    <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1 group-focus-within:text-primary transition-colors">
                                        Security Pattern
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="h-14 pl-12 pr-12 bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-600 rounded-2xl focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-4 flex items-center text-zinc-500 hover:text-white transition-colors"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full h-16 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-50" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="h-6 w-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                                    />
                                ) : (
                                    <>Authorize Entry</>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <div className="mt-8 text-center text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">
                    &copy; {new Date().getFullYear()} Thangam Magalir Thaiyalagam
                </div>
            </motion.div>
        </div>
    );
}

