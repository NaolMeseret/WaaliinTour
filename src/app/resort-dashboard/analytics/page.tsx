import AIInsightsPanel from "@/components/resort-dashboard/AIInsightsPanel";
import { ResortAIService } from "@/services/resort-dashboard/aiService";

export const metadata = {
  title: "Resort Dashboard — Analytics",
  description: "Analytics page for hotel and resort performance metrics.",
};

export default async function ResortDashboardAnalyticsPage() {
  const insights = await ResortAIService.getAIInsights();

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">
            Analytics Center
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Deep analytics for hotel operations
          </h1>
          <p className="text-slate-600 leading-8">
            Explore performance insights, guest satisfaction trends, and top
            service analytics designed for resorts and hospitality teams.
          </p>
        </div>
      </section>

      <AIInsightsPanel
        analytics={insights.dailyAnalytics}
        guests={insights.guestInsights}
      />
    </div>
  );
}
