import ResortDashboardSidebar from "@/components/resort-dashboard/Sidebar";
import type { ReactNode } from "react";
import { requireHotelResortUser } from "@/lib/auth/role";

export default async function ResortDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireHotelResortUser();

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(280px,25%)_minmax(0,75%)] gap-8">
          <div className="xl:sticky xl:top-6 xl:self-start">
            <ResortDashboardSidebar />
          </div>
          <main className="space-y-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
