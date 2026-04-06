import CreateTourForm from "@/components/resort-dashboard/CreateTourForm";

export const metadata = {
  title: "Create Hotel Tour — Resort Dashboard",
  description: "Create a new hotel-owned tour for your resort dashboard.",
};

export default function ResortDashboardCreateTourPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500 mb-3">
            Add new hotel tour
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Create a premium hotel tour experience
          </h1>
          <p className="mt-4 text-slate-600 leading-7">
            Publish a new tour that is owned by your hotel account and
            automatically appears in your resort dashboard and culture hub
            workflows.
          </p>
        </div>
      </section>

      <CreateTourForm />
    </div>
  );
}
