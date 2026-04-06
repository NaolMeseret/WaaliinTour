import OverviewCards from "@/components/resort-dashboard/OverviewCards";
import { ResortAIService } from "@/services/resort-dashboard/aiService";

export const metadata = {
  title: "Resort Dashboard — Overview",
  description: "Overview page for hotel and resort AI dashboard.",
};

export default async function ResortDashboardOverviewPage() {
  const analytics = await ResortAIService.getDailyAnalytics();

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">
            Resort Overview
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Hotel and resort performance at a glance
          </h1>
          <p className="text-slate-600 leading-8">
            Use this page to monitor occupancy, revenue, and active guest
            programs in one curated dashboard view.
          </p>
        </div>
      </section>

      <OverviewCards analytics={analytics} />
    </div>
  );
}
