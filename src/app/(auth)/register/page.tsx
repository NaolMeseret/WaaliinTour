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
  User,
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (name: string, value: string) => {
    if (name === "full_name") return value.length >= 3;
    if (name === "email") return value.includes("@");
    if (name === "password") return value.length >= 6;
    if (name === "confirm_password")
      return value === formData.password && value.length > 0;
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.full_name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-20">
        <div className="text-center animate-in zoom-in duration-500 max-w-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-xl shadow-green-100/50">
            <Sparkles className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Account Created!
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed mb-10">
            Verification link sent to your email. Redirecting you to login...
          </p>
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-green-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 px-4 py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-100 rounded-full blur-3xl opacity-50" />

      <Card className="w-full max-w-md rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/60 overflow-hidden bg-white animate-in slide-in-from-bottom-10 duration-700">
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
            Create Account
          </CardTitle>
          <CardDescription className="text-slate-400 font-medium mt-2 relative z-10">
            Join the cultural exploration journey
          </CardDescription>
        </CardHeader>

        <CardContent className="p-10">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
                <User className="w-3 h-3" /> Full Name
              </label>
              <Input
                name="full_name"
                placeholder="Nina Williams"
                value={formData.full_name}
                onChange={handleChange}
                isValid={
                  touched.full_name && validate("full_name", formData.full_name)
                }
                isInvalid={
                  touched.full_name &&
                  !validate("full_name", formData.full_name)
                }
                className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all shadow-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
                <Mail className="w-3 h-3" /> Email Address
              </label>
              <Input
                type="email"
                name="email"
                placeholder="nina@example.com"
                value={formData.email}
                onChange={handleChange}
                isValid={touched.email && validate("email", formData.email)}
                isInvalid={touched.email && !validate("email", formData.email)}
                className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all shadow-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
                <Lock className="w-3 h-3" /> Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                isValid={
                  touched.password && validate("password", formData.password)
                }
                isInvalid={
                  touched.password &&
                  touched.password &&
                  !validate("password", formData.password)
                }
                className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all shadow-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
                <Lock className="w-3 h-3" /> Confirm Password
              </label>
              <Input
                type="password"
                name="confirm_password"
                placeholder="••••••••"
                value={formData.confirm_password}
                onChange={handleChange}
                isValid={
                  touched.confirm_password &&
                  validate("confirm_password", formData.confirm_password)
                }
                isInvalid={
                  touched.confirm_password &&
                  !validate("confirm_password", formData.confirm_password)
                }
                className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all shadow-sm"
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
              className="w-full h-16 rounded-2xl text-lg font-extrabold shadow-xl shadow-green-100 group relative overflow-hidden transition-all active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin mx-auto text-white" />
              ) : (
                <div className="flex items-center gap-2">
                  Join Waaliin Tours
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Already a member?{" "}
              <Link
                href="/login"
                className="text-green-600 font-bold hover:text-green-700 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
