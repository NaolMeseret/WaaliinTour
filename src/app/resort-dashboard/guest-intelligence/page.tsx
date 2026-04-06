import GuestTable from "@/components/resort-dashboard/GuestTable";
import { ResortAIService } from "@/services/resort-dashboard/aiService";

export const metadata = {
  title: "Resort Dashboard — Guest Intelligence",
  description: "Guest intelligence features for hotels and resorts.",
};

export default async function ResortDashboardGuestIntelligencePage() {
  const insights = await ResortAIService.getAIInsights();

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">
            Guest Intelligence
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Track guest behavior and satisfaction
          </h1>
          <p className="text-slate-600 leading-8">
            See room details, mood indicators, and AI-driven recommendations for
            every guest staying at your property.
          </p>
        </div>
      </section>

      <GuestTable guests={insights.guestInsights} />
    </div>
  );
}
