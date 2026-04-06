import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";

export default async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let showResortLink = false;
  let hideHeaderLinks = false;

  if (user?.id) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role;
    showResortLink = role === "hotel";
    hideHeaderLinks = role === "hotel" || role === "resort";
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white/70 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="group flex items-center gap-1.5 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-green-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-green-200 group-hover:scale-105 transition-transform duration-200">
              <span className="font-bold text-lg">W</span>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-800">
              Waaliin
              <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                Tours
              </span>
            </span>
          </Link>
        </div>

        {!hideHeaderLinks && (
          <div className="hidden md:flex md:items-center md:gap-10 font-bold uppercase tracking-widest text-[10px]">
            {[
              { name: "Explore Tours", href: "/tours" },
              { name: "Culture Hub", href: "/explore" },
              ...(showResortLink
                ? [{ name: "Resort Dashboard", href: "/resort-dashboard" }]
                : []),
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-500 hover:text-green-600 transition-all duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-widest hover:bg-green-50 hover:text-green-600"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <form action="/auth/signout" method="post">
                <Button
                  type="submit"
                  variant="ghost"
                  className="p-2 h-auto text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </form>
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white ring-offset-2 ring-offset-green-100 shadow-lg shadow-green-100/50">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-xs font-bold text-slate-600 uppercase tracking-widest hover:text-green-600 hover:bg-green-50 transition-colors"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-slate-900 hover:bg-green-700 text-white font-bold px-6 h-11 rounded-xl shadow-xl shadow-green-100 hover:shadow-green-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-xs uppercase tracking-widest">
                  Join Free
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
