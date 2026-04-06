import Link from "next/link";
import OverviewCards from "@/components/resort-dashboard/OverviewCards";
import { ResortAIService } from "@/services/resort-dashboard/aiService";

export const metadata = {
  title: "Resort Dashboard — Hotel & Resort Control",
  description:
    "Landing page for the resort dashboard with one-page feature navigation.",
};

export default async function ResortDashboardRootPage() {
  const analytics = await ResortAIService.getDailyAnalytics();

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">
            Resort Dashboard Home
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Welcome to your hotel and resort management hub
          </h1>
          <p className="text-slate-600 leading-8 mb-6">
            Select a feature from the sidebar to manage guest intelligence, AI
            suggestions, analytics, or revenue insights on dedicated pages.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Overview", href: "/resort-dashboard/overview" },
              {
                label: "Guest Intelligence",
                href: "/resort-dashboard/guest-intelligence",
              },
              {
                label: "AI Suggestions",
                href: "/resort-dashboard/ai-suggestions",
              },
              { label: "Revenue Insight", href: "/resort-dashboard/revenue" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <OverviewCards analytics={analytics} />
    </div>
  );
}
