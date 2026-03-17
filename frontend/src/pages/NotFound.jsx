import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Scissors, Home, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Access attempt to non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10 max-w-2xl"
      >
        <div className="flex justify-center mb-8">
            <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-24 h-24 rounded-3xl bg-zinc-900 flex items-center justify-center border border-white/10 shadow-2xl"
            >
                <Scissors className="h-12 w-12 text-primary" />
            </motion.div>
        </div>

        <div className="space-y-4 mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary/60" />
                <span className="text-xs uppercase font-bold tracking-[0.4em] text-primary/60">Pattern Not Found</span>
                <Sparkles className="h-4 w-4 text-primary/60" />
            </div>
            <h1 className="text-8xl font-serif font-bold text-white tracking-tighter">404</h1>
            <p className="text-2xl font-serif text-zinc-400 italic">"Threads unravel where the path ends."</p>
            <p className="text-zinc-500 max-w-md mx-auto leading-relaxed">
                The page you are looking for has been moved, altered, or simply doesn't exist in our current collection.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl shadow-primary/20 transition-all">
                <Link to="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Return Home
                </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()} className="h-14 px-8 rounded-2xl border-zinc-800 bg-transparent text-white hover:bg-zinc-900 transition-all">
                <div className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Previous Step
                </div>
            </Button>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5">
            <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.3em]">
                Thangam Magalir Thaiyalagam &bull; Boutique Intelligence
            </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;


