import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  Sparkles,
  Compass,
  Map,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My Dashboard — Waaliin Tours",
  description:
    "Manage your cultural journeys and access personalized travel insights.",
};

export default async function DashboardPage() {
  const supabase = createClient();

  // Verify authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch registrations and the tour details
  const { data: registrations, error } = await supabase
    .from("registrations")
    .select(
      `
      *,
      tours (*)
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="bg-slate-50/70 min-h-screen pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold shadow-lg shadow-green-100/50 uppercase">
                {user.email?.charAt(0) || <User className="w-6 h-6" />}
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Welcome Back
                </h1>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                  {user.email}
                </p>
              </div>
            </div>
            <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
              Your portal for immersive cultural exploration. Manage your
              upcoming trips and access exclusive educational content here.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-3">
            <div className="flex items-center gap-6 bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50">
              <div className="text-center px-4 border-r border-slate-100">
                <p className="text-3xl font-extrabold text-green-600 tracking-tight">
                  {registrations?.length || 0}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Bookings
                </p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl font-extrabold text-amber-500 tracking-tight">
                  Active
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Status
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Col — Bookings */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-green-600 rounded-full" />
                My Upcoming Journeys
              </h2>

              {registrations && registrations.length > 0 ? (
                <div className="space-y-6">
                  {registrations.map((reg) => (
                    <Card
                      key={reg.id}
                      className="rounded-[2.5rem] border-none shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 overflow-hidden bg-white group"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-48 bg-slate-900/5 border-r border-slate-50 p-8 flex flex-col justify-center items-center text-center">
                          <Calendar className="w-8 h-8 text-green-600 mb-3" />
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                            DEPARTURE
                          </p>
                          <p className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                            {new Date(reg.tours.date).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" },
                            )}
                          </p>
                        </div>
                        <CardContent className="flex-1 p-8">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <div className="flex items-center justify-between gap-4 mb-4">
                                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-green-600 transition-colors leading-tight">
                                  {reg.tours.title}
                                </h3>
                                <div className="px-3 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600 uppercase border border-emerald-100">
                                  Confirmed
                                </div>
                              </div>
                              <div className="flex flex-wrap items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-green-600" />{" "}
                                  {reg.tours.location}
                                </span>
                                <span className="flex items-center gap-2">
                                  <CreditCard className="w-4 h-4 text-green-600" />{" "}
                                  ${reg.tours.price * reg.guests_count} Paid
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between gap-4 pt-8">
                              <p className="text-slate-500 text-xs font-medium">
                                Order ID: #{reg.id.slice(0, 8).toUpperCase()}
                              </p>
                              <Link href={`/tours/${reg.tour_id}`}>
                                <Button
                                  variant="ghost"
                                  className="h-10 px-4 rounded-xl text-xs font-bold border border-slate-100 hover:bg-green-50 hover:text-green-600 hover:border-green-100 transition-all"
                                >
                                  View Tour Page
                                  <ExternalLink className="ml-2 w-3 h-3" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[2.5rem] p-16 text-center border-2 border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
                    🏜️
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                    No bookings yet
                  </h3>
                  <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium mb-10 leading-relaxed">
                    Your cultural adventure hasn't started yet. Browse our
                    curated tours to find your first journey.
                  </p>
                  <Link href="/tours">
                    <Button className="h-14 px-10 rounded-full font-bold shadow-xl shadow-green-100 bg-green-600 hover:bg-green-700">
                      Explore Available Tours
                    </Button>
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Right Col / Sidebar — Mini Features */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Cultural Insights Preview */}
              <Card className="rounded-[2.5rem] bg-slate-900 text-white overflow-hidden border-none shadow-2xl">
                <div className="p-8 border-b border-white/5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                    <Sparkles className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    Your Trip Insights
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-bold uppercase tracking-widest">
                    Step 5: Recommendations
                  </p>
                </div>
                <CardContent className="p-8 space-y-6 bg-white/5">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Based on your upcoming trips, we've prepared personalized
                    cultural guides for you.
                  </p>
                  <Link href="/explore">
                    <Button className="w-full h-14 rounded-2xl bg-white text-slate-900 hover:bg-white/90 font-bold shadow-xl shadow-white/5">
                      Explore Culture Hub
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Secure Experience
                    </h4>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                      Verified Support
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed font-medium pb-6 border-b border-slate-50">
                  Our 24/7 cultural support team is available via the floating
                  chat icon below to assist you with any questions during your
                  trip.
                </p>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest pt-2">
                  <span>Total Tours</span>
                  <span className="text-slate-900">
                    {registrations?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
