import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, MapPin } from "lucide-react";
import { DailyAnalytics } from "@/services/resort-dashboard/mockData";
import { formatCurrency } from "@/lib/resort-dashboard/utils";

interface OverviewCardsProps {
  analytics: DailyAnalytics;
}

export default function OverviewCards({ analytics }: OverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            Total Guests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-extrabold text-slate-900">
            {analytics.totalGuests}
          </div>
          <p className="text-slate-500 text-sm mt-2">Active today</p>
        </CardContent>
      </Card>

      <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Revenue Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-extrabold text-slate-900">
            {formatCurrency(analytics.estimatedRevenue)}
          </div>
          <p className="text-slate-500 text-sm mt-2">Estimated earnings</p>
        </CardContent>
      </Card>

      <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            Active Tours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-extrabold text-slate-900">
            {analytics.activeTours}
          </div>
          <p className="text-slate-500 text-sm mt-2">Running today</p>
        </CardContent>
      </Card>
    </div>
  );
}
