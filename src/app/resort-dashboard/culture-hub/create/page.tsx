import { redirect } from "next/navigation";
import CreateCultureContentForm from "@/components/resort-dashboard/CreateCultureContentForm";
import { getCurrentUserId } from "@/lib/auth/role";
import { getHotelTours } from "@/services/tours";

export const metadata = {
  title: "Create Culture Content — Resort Dashboard",
  description: "Add premium culture content created for your hotel’s tours.",
};

export default async function ResortDashboardCreateCulturePage() {
  const ownerId = await getCurrentUserId();

  if (!ownerId) {
    redirect("/login");
  }

  const hotelTours = await getHotelTours(ownerId);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500 mb-3">
            Create premium content
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Add culture hub content for your hotel tours
          </h1>
          <p className="mt-4 text-slate-600 leading-7">
            Connect your hotel tours with stories, language tips, and cultural
            details that make the guest experience feel premium and locally
            curated.
          </p>
        </div>
      </section>

      <CreateCultureContentForm hotelTours={hotelTours} />
    </div>
  );
}
