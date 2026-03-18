import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/classes', label: 'Classes' },
    { path: '/stitching', label: 'Stitching' },
    { path: '/about', label: 'About' },
    { path: '/admin', label: 'Admin' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-100 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
                <div className="absolute inset-x-0 -inset-y-2 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100"></div>
                <img
                  src="/logo.jpeg"
                  alt="Thangam Magalir Thaiyalagam"
                  className="h-14 w-14 lg:h-20 lg:w-20 rounded-2xl group-hover:scale-105 transition-all duration-500 object-cover relative z-10 ring-1 ring-zinc-100 shadow-lg"
                />
            </div>
            <div className="flex flex-col">
                <span className="font-serif font-bold text-lg lg:text-[22px] text-zinc-900 leading-none mb-1 tracking-tight">
                  தங்கம் மகளிர் தையலகம்
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3c2a21]/60 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 fill-current text-primary" />
                    Premium Boutique
                </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 bg-zinc-50/50 p-1.5 rounded-2xl border border-zinc-100">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={`relative font-bold text-xs uppercase tracking-widest px-6 h-11 rounded-xl transition-all hover:bg-white hover:shadow-sm ${
                    isActive(item.path) 
                    ? 'text-primary bg-white shadow-sm ring-1 ring-zinc-100' 
                    : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.div 
                        layoutId="nav-active"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Social / Action area? - Keep it simple or add a "Enroll" button */}
          <div className="hidden md:flex items-center">
             <Button asChild className="rounded-2xl bg-[#3c2a21] hover:bg-[#2a1d17] text-white font-bold text-[10px] uppercase tracking-widest h-11 px-6 shadow-xl shadow-zinc-200">
                <Link to="/classes">Join Class</Link>
             </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 hover:bg-zinc-50 rounded-2xl transition-all text-zinc-900 border border-transparent active:border-zinc-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
            {isMenuOpen && (
              <motion.nav 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden bg-white border-t border-zinc-50"
              >
                <div className="flex flex-col gap-2 py-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4"
                    >
                      <Button
                        variant={isActive(item.path) ? 'default' : 'ghost'}
                        className={`w-full justify-start font-bold text-xs uppercase tracking-widest h-14 rounded-2xl ${isActive(item.path) ? 'bg-[#3c2a21] text-white' : 'text-zinc-500'}`}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </motion.nav>
            )}
        </AnimatePresence>
      </div>
    </header>
  );
}


