import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Clock, Sparkles } from "lucide-react";
import { DailyAnalytics, Guest } from "@/services/resort-dashboard/mockData";
import { calculateAverageScore } from "@/lib/resort-dashboard/utils";

interface AIInsightsPanelProps {
  analytics: DailyAnalytics;
  guests: Guest[];
}

export default function AIInsightsPanel({
  analytics,
  guests,
}: AIInsightsPanelProps) {
  const averageScore = calculateAverageScore(guests);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-green-600" />
            Daily Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl border border-green-100">
            <div>
              <p className="text-sm font-bold text-green-800">
                Peak Activity Time
              </p>
              <p className="text-lg font-extrabold text-green-900">
                {analytics.peakActivityTime}
              </p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-3">
              Top Performing Services
            </h4>
            <div className="space-y-2">
              {analytics.topSellingItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                >
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-3">
              Low Performing Services
            </h4>
            <div className="space-y-2">
              {analytics.lowSellingItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100"
                >
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">
            Guest Behavior Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-6 bg-slate-900 rounded-2xl text-white">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
              Average Satisfaction
            </p>
            <p className="text-5xl font-extrabold">{averageScore}/10</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700">Key Insights</h4>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-800 font-medium">
                  Most guests are highly engaged with cultural activities
                </p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-sm text-amber-800 font-medium">
                  Some guests prefer quieter, personalized experiences
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-sm text-green-800 font-medium">
                  High satisfaction correlates with active participation
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
