import { ResortAIService } from "@/services/resort-dashboard/aiService";
import { formatCurrency } from "@/lib/resort-dashboard/utils";

export const metadata = {
  title: "Resort Dashboard — Revenue Insight",
  description: "Revenue insights and performance for resort managers.",
};

export default async function ResortDashboardRevenuePage() {
  const analytics = await ResortAIService.getDailyAnalytics();

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">
            Revenue Insight
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Revenue trends for hotel and resort growth
          </h1>
          <p className="text-slate-600 leading-8">
            Review earnings projections, top-selling services, and performance
            gaps to improve resort profitability.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Estimated Revenue
          </h2>
          <p className="text-5xl font-extrabold text-slate-900 mb-3">
            {formatCurrency(analytics.estimatedRevenue)}
          </p>
          <p className="text-slate-500 mb-6">
            Today’s projected revenue based on guest bookings and activity.
          </p>

          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
              <p className="text-sm text-slate-500 uppercase tracking-[0.2em] mb-2">
                Peak time
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {analytics.peakActivityTime}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
              <p className="text-sm text-slate-500 uppercase tracking-[0.2em] mb-2">
                Active tours
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {analytics.activeTours}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Service Performance
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-[0.2em] mb-3">
                Top selling services
              </p>
              <div className="space-y-3">
                {analytics.topSellingItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl bg-emerald-50 p-4 text-slate-800 font-medium"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-[0.2em] mb-3">
                Underperforming services
              </p>
              <div className="space-y-3">
                {analytics.lowSellingItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl bg-rose-50 p-4 text-slate-800 font-medium"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
