import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#3c2a21] text-white border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.jpeg" 
                alt="Thangam Magalir Thaiyalagam" 
                className="h-12 w-12 rounded-2xl object-cover ring-1 ring-white/10"
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-tight">தையலகம்</span>
                <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-primary/60 flex items-center gap-1">
                    <Sparkles className="h-2 w-2" />
                    Elite Boutique
                </span>
              </div>
            </div>
            <p className="text-zinc-500 text-sm leading-loose font-light italic">
              "Weaving tradition with modern elegance. Empowering the artisan within every woman through the art of fine tailoring and creative craftsmanship."
            </p>
            <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-xl bg-[#2a1d17] flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-white/5"><Instagram className="h-4 w-4" /></a>
                <a href="#" className="w-10 h-10 rounded-xl bg-[#2a1d17] flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-white/5"><Facebook className="h-4 w-4" /></a>
                <a href="#" className="w-10 h-10 rounded-xl bg-[#2a1d17] flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-white/5"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-400 mb-8 border-l-2 border-primary pl-4">Navigation</h3>
            <ul className="space-y-4">
              {['Home', 'Classes', 'Stitching', 'About', 'Contact', 'Admin'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="text-zinc-500 hover:text-primary text-sm font-medium transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/0 group-hover:bg-primary transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Masterclasses */}
          <div>
            <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-400 mb-8 border-l-2 border-primary pl-4">Curriculum</h3>
            <ul className="space-y-4 text-sm text-zinc-500 font-light">
              <li><Link to="/classes/tailoring" className="hover:text-primary transition-colors">Advanced Tailoring</Link></li>
              <li><Link to="/classes/aari" className="hover:text-primary transition-colors">Bridal Aari Work</Link></li>
              <li><Link to="/classes/embroidery" className="hover:text-primary transition-colors">Creative Embroidery</Link></li>
              <li className="text-zinc-700">Boutique Management (Coming Soon)</li>
              <li className="text-zinc-700">Pattern Drafting (Enquire for Details)</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-400 mb-8 border-l-2 border-primary pl-4">Command Center</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2a1d17] flex items-center justify-center border border-white/5"><Phone className="h-4 w-4 text-primary" /></div>
                <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 mb-1">Direct Line</p>
                    <p className="text-sm font-medium text-zinc-300">+91 XXXXX XXXXX</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2a1d17] flex items-center justify-center border border-white/5"><Mail className="h-4 w-4 text-primary" /></div>
                <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 mb-1">Secure Email</p>
                    <p className="text-sm font-medium text-zinc-300">thangamwrites@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2a1d17] flex items-center justify-center border border-white/5"><MapPin className="h-4 w-4 text-primary" /></div>
                <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 mb-1">Boutique Office</p>
                    <p className="text-sm font-medium text-zinc-300">Tamil Nadu, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 overflow-visible">
            <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.2em] relative group">
                &copy; {new Date().getFullYear()} Thangam Magalir Thaiyalagam
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-700"></span>
            </p>
            <div className="flex items-center gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-600">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-colors">Institutional Access</a>
            </div>
        </div>
      </div>
    </footer>
  );
}


