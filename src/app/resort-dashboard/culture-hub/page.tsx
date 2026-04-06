import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserId } from "@/lib/auth/role";
import { getHotelExploreContent } from "@/services/explore";
import { getHotelTours } from "@/services/tours";

export const metadata = {
  title: "Culture Hub — Resort Dashboard",
  description:
    "Showcase culture content created by your hotel and manage premium experiences.",
};

export default async function ResortDashboardCultureHubPage() {
  const ownerId = await getCurrentUserId();

  if (!ownerId) {
    redirect("/login");
  }

  const hotelTours = await getHotelTours(ownerId);
  const cultureItems = await getHotelExploreContent(ownerId);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500 mb-3">
              Premium culture hub
            </p>
            <h1 className="text-4xl font-extrabold text-slate-900">
              Culture and stories built around your hotel tours
            </h1>
            <p className="mt-4 text-slate-600 max-w-2xl leading-7">
              Only culture content created by your hotel appears here, giving
              guests a premium and personalized local experience.
            </p>
          </div>

          <Link
            href="/resort-dashboard/culture-hub/create"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-300/40 transition hover:bg-emerald-700"
          >
            Add culture content
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.45fr)]">
        <div className="space-y-6">
          <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Hotel-owned tours
                </p>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Your active premium tours
                </h2>
              </div>
              <Link
                href="/resort-dashboard/tours"
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Manage tours
              </Link>
            </div>

            {hotelTours.length > 0 ? (
              <div className="space-y-3">
                {hotelTours.map((tour) => (
                  <article
                    key={tour.id}
                    className="rounded-3xl border border-slate-200 p-5 bg-slate-50"
                  >
                    <h3 className="text-xl font-semibold text-slate-900">
                      {tour.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                      {tour.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      <span>{new Date(tour.date).toLocaleDateString()}</span>
                      <span>{tour.location}</span>
                    </div>
                    <Link
                      href={`/tours/${tour.id}`}
                      className="mt-4 inline-flex text-sm font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      View tour details
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-3">
                  No hotel tours found
                </p>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
                  Create a tour first
                </h3>
                <p className="text-slate-500 mb-6">
                  Culture hub content can be linked to your hotel tours and
                  shown as premium material for guests.
                </p>
                <Link
                  href="/resort-dashboard/tours/create"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
                >
                  Create your first tour
                </Link>
              </div>
            )}
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Premium content
                </p>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Hotel culture stories
                </h2>
              </div>
              <Link
                href="/resort-dashboard/culture-hub/create"
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Add new item
              </Link>
            </div>

            {cultureItems.length > 0 ? (
              <div className="space-y-4">
                {cultureItems.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-3xl border border-slate-200 p-5 bg-slate-50"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                      {item.content}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      <span>{item.category}</span>
                      {item.related_tour_id ? (
                        <span>Linked tour</span>
                      ) : (
                        <span>General premium content</span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-3">
                  No culture items yet
                </p>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
                  Add premium hotel culture content
                </h3>
                <p className="text-slate-500 mb-6">
                  This area is reserved for the hotel-specific experiences you
                  want your guests to see.
                </p>
                <Link
                  href="/resort-dashboard/culture-hub/create"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
                >
                  Add culture content
                </Link>
              </div>
            )}
          </div>
        </div>

        <aside className="rounded-[2rem] bg-emerald-950 p-8 text-white shadow-xl shadow-emerald-300/10">
          <h2 className="text-3xl font-extrabold">Premium Hotel Experience</h2>
          <p className="mt-4 text-slate-200 leading-7">
            Guests who book your hotel’s tours will receive exclusive local
            stories, culture guides, and recommendations created specifically
            for your property.
          </p>
          <div className="mt-8 space-y-4 text-sm text-slate-200">
            <p className="rounded-3xl bg-emerald-900/80 p-4">
              • Curate location-specific content tied directly to your tours.
            </p>
            <p className="rounded-3xl bg-emerald-900/80 p-4">
              • Build premium culture guides that only your guests can access.
            </p>
            <p className="rounded-3xl bg-emerald-900/80 p-4">
              • Use this page to keep your hotel’s stories fresh and exclusive.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
