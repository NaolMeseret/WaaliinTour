"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const userId = data?.user?.id;
    if (!userId) {
      router.push("/");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    const role = profile?.role ?? "user";

    if (role === "hotel" || role === "resort") {
      router.push("/resort-dashboard");
    } else {
      router.push("/");
    }

    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 px-4 py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-100 rounded-full blur-3xl opacity-50" />

      <Card className="w-full max-w-md rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/60 overflow-hidden bg-white animate-in zoom-in duration-500">
        <CardHeader className="bg-slate-900 p-10 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-transparent" />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 mb-6 group relative z-10"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/10 group-hover:bg-white/20 transition-all">
              <span className="font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Waaliin<span className="text-emerald-400">Tours</span>
            </span>
          </Link>
          <CardTitle className="text-3xl font-extrabold tracking-tight relative z-10">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-slate-400 font-medium mt-2 relative z-10">
            Sign in to your cultural portal
          </CardDescription>
        </CardHeader>

        <CardContent className="p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
                <Mail className="w-3 h-3" /> Email Address
              </label>
              <Input
                type="email"
                placeholder="nina@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setTouched((prev) => ({ ...prev, email: true }));
                }}
                isValid={touched.email && email.includes("@")}
                isInvalid={touched.email && !email.includes("@")}
                className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Lock className="w-3 h-3" /> Password
                </label>
                <Link
                  href="#"
                  className="text-[10px] font-bold text-green-600 hover:text-green-700 uppercase tracking-widest transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setTouched((prev) => ({ ...prev, password: true }));
                }}
                isValid={touched.password && password.length >= 6}
                isInvalid={
                  touched.password && password.length > 0 && password.length < 6
                }
                className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-sm">
                  ⚠️
                </div>
                <p className="text-red-700 text-xs font-bold leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-16 rounded-2xl text-lg font-extrabold shadow-xl shadow-green-100 group overflow-hidden relative active:scale-[0.98] transition-all"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin mx-auto text-white" />
              ) : (
                <div className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 text-sm font-medium">
              New to Waaliin Tours?{" "}
              <Link
                href="/register"
                className="text-green-600 font-bold hover:text-green-700 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-center gap-6 text-slate-300">
            <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-crosshair">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Secure
              </span>
            </div>
            <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-crosshair">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Reliable
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
