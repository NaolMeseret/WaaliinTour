import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserId } from "@/lib/auth/role";
import { getHotelTours } from "@/services/tours";
import TourCard from "@/components/tours/TourCard";

export const metadata = {
  title: "Hotel Tours — Resort Dashboard",
  description:
    "Manage the tours created by your hotel in the resort dashboard.",
};

export default async function ResortDashboardToursPage() {
  const ownerId = await getCurrentUserId();

  if (!ownerId) {
    redirect("/login");
  }

  const tours = await getHotelTours(ownerId);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500 mb-3">
              Hotel tour management
            </p>
            <h1 className="text-4xl font-extrabold text-slate-900">
              Tours created by your hotel
            </h1>
            <p className="mt-4 text-slate-600 max-w-2xl leading-7">
              This list contains only the tours authored by your hotel account.
              Use the create form to add a new hotel-owned guest experience.
            </p>
          </div>

          <Link
            href="/resort-dashboard/tours/create"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-300/40 transition hover:bg-emerald-700"
          >
            Create new tour
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tours.length > 0 ? (
          tours.map((tour) => <TourCard key={tour.id} tour={tour} />)
        ) : (
          <div className="col-span-full rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-4">
              No hotel tours yet
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Build your first hotel-owned tour
            </h2>
            <p className="text-slate-500 mb-8 max-w-2xl mx-auto">
              When you add a tour here, it becomes part of your hotel’s premium
              offering and is automatically filtered into your private resort
              dashboard pages.
            </p>
            <Link
              href="/resort-dashboard/tours/create"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition"
            >
              Create Hotel Tour
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
