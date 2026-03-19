import { UI_TEXT } from '../types/constants';
import { Language } from '../types';
import { Accessibility, Eye, Zap, ShieldCheck, Heart } from 'lucide-react';

interface SectionProps {
  lang: Language;
}

export function AccessibilitySection({ lang }: SectionProps) {
  return (
    <section className="py-20 bg-[#0A0E1A]/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#6C63FF] text-sm font-bold tracking-widest uppercase">
                <Accessibility className="w-4 h-4" />
                A Platform For Everyone
              </div>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">
                Built with Accessibility in Mind
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Iraq Compass is designed to be inclusive and accessible to all users, regardless of their abilities or the devices they use.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-5 glass-card">
                <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center border border-[#6C63FF]/20">
                  <Eye className="w-5 h-5 text-[#6C63FF]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-bold">High Contrast</h4>
                  <p className="text-white/40 text-xs">Optimized for visibility in all lighting conditions.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 glass-card">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B9D]/10 flex items-center justify-center border border-[#FF6B9D]/20">
                  <Zap className="w-5 h-5 text-[#FF6B9D]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-bold">Fast Performance</h4>
                  <p className="text-white/40 text-xs">Lightweight and optimized for slow connections.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 glass-card">
                <div className="w-10 h-10 rounded-xl bg-[#F6C90E]/10 flex items-center justify-center border border-[#F6C90E]/20">
                  <ShieldCheck className="w-5 h-5 text-[#F6C90E]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-bold">Secure & Private</h4>
                  <p className="text-white/40 text-xs">Your data is protected with industry standards.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 glass-card">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Heart className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-bold">User Centric</h4>
                  <p className="text-white/40 text-xs">Designed based on real feedback from Iraqis.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#6C63FF]/20 to-[#FF6B9D]/20 blur-3xl rounded-full" />
            <div className="relative glass-card p-8 aspect-square flex items-center justify-center border-white/10 shadow-2xl">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#FF6B9D] mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(108,99,255,0.4)]">
                  <Accessibility className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">WCAG 2.1 Compliant</h3>
                  <p className="text-white/50 text-sm">Meeting the highest standards for web accessibility.</p>
                </div>
                <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white font-bold hover:bg-white/10 transition-all">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ lang }: SectionProps) {
  return (
    <footer className="py-20 bg-[#0A0E1A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#FF6B9D] flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Iraq Compass</span>
            </div>
            <p className="text-white/50 text-lg max-w-md leading-relaxed">
              The first and most comprehensive business directory in Iraq. Connecting thousands of businesses with millions of customers across all 20 governorates.
            </p>
            <div className="flex items-center gap-4">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((s) => (
                <a key={s} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                  <span className="sr-only">{s}</span>
                  <div className="w-5 h-5 bg-current rounded-sm opacity-50" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4 text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">List Your Business</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Contact</h4>
            <ul className="space-y-4 text-white/50">
              <li>Baghdad, Al-Mansour District</li>
              <li>support@iraqcompass.com</li>
              <li>+964 770 000 0000</li>
              <li>Available 24/7</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <p>© 2026 Iraq Compass. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
