import Link from "next/link"
import { Globe, Mail, Phone, MapPin, Sparkles, CheckCircle2 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-100 text-slate-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="group flex items-center gap-1.5 focus:outline-none">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-green-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-green-900/40">
                <span className="font-bold text-lg">W</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Waaliin<span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Tours</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs font-medium text-slate-400/80">
              Discover the heart of culture through immersive group tours. Explore traditions, languages, and landscapes with local experts.
            </p>
            <div className="flex items-center gap-4 pt-2">
                 <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-slate-400 hover:text-green-400">
                    <Globe className="w-5 h-5" />
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-slate-400 hover:text-green-400">
                    <Mail className="w-5 h-5" />
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-slate-400 hover:text-green-400">
                    <Phone className="w-5 h-5" />
                 </div>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-[0.2em] uppercase mb-8">Platform</h3>
            <ul className="space-y-4">
              <li><Link href="/tours" className="text-sm font-bold text-slate-400 hover:text-green-400 transition-colors">Browse Tours</Link></li>
              <li><Link href="/explore" className="text-sm font-bold text-slate-400 hover:text-green-400 transition-colors">Culture Hub</Link></li>
              <li><Link href="/about" className="text-sm font-bold text-slate-400 hover:text-green-400 transition-colors">Our Mission</Link></li>
              <li><Link href="/contact" className="text-sm font-bold text-slate-400 hover:text-green-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-[0.2em] uppercase mb-8">Experience</h3>
            <ul className="space-y-4">
              <li><Link href="/login" className="text-sm font-bold text-slate-400 hover:text-green-400 transition-colors">User Login</Link></li>
              <li><Link href="/register" className="text-sm font-bold text-slate-400 hover:text-green-400 transition-colors">Create Account</Link></li>
              <li><Link href="/dashboard" className="text-sm font-bold text-slate-400 hover:text-green-400 transition-colors">My Dashboard</Link></li>
            </ul>
          </div>

          {/* Legal / Newsletter */}
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 space-y-4">
             <h4 className="text-white font-bold text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Stay Updated
             </h4>
             <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Join our newsletter to receive the latest cultural insights and news.
             </p>
             <div className="flex gap-2">
                <input type="text" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-green-500" />
                <button className="bg-green-600 p-2 rounded-xl text-white hover:bg-green-700 transition-colors">
                   <ArrowRight className="w-4 h-4" />
                </button>
             </div>
             <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center pt-2">
                 <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Verified Platform
             </p>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 px-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">© {new Date().getFullYear()} Waaliin Tours Enterprise. All rights reserved.</p>
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
             <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function ArrowRight({ className }: { className?: string }) {
    return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
}
