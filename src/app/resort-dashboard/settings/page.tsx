import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Resort Dashboard — Settings",
  description: "Settings for the hotel and resort dashboard.",
};

export default function ResortDashboardSettingsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">
            Dashboard Settings
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Resort dashboard controls
          </h1>
          <p className="text-slate-600 leading-8">
            Configure access, notifications, and resort-specific dashboard
            behavior from this settings page.
          </p>
        </div>
      </section>

      <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/40">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">
            Feature Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">
                Role-based access
              </h2>
              <p className="text-slate-500 mt-2">
                Only users with hotel or resort roles can access the resort
                dashboard.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">
                Navigation updates
              </h2>
              <p className="text-slate-500 mt-2">
                Dashboard navigation is kept clean and responsive for resort
                operators.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
