import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, CheckCircle, MessageCircle } from "lucide-react";
import { DailyAnalytics } from "@/services/resort-dashboard/mockData";

interface ActionPanelProps {
  recommendations: string[];
  onRecommendationSelect?: (text: string, index: number) => void;
}

export default function ActionPanel({
  recommendations,
  onRecommendationSelect,
}: ActionPanelProps) {
  return (
    <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-500" />
          AI Action Recommendations
        </CardTitle>
        <p className="text-slate-500 text-sm">
          What your hotel should do today
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 group hover:shadow-md transition-shadow"
            >
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-slate-800 font-medium leading-relaxed">
                  {recommendation}
                </p>
              </div>
              {onRecommendationSelect && (
                <button
                  onClick={() => onRecommendationSelect(recommendation, index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-white/50"
                  title="Discuss this recommendation with AI"
                >
                  <MessageCircle className="w-5 h-5 text-green-600 hover:text-green-700" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <h4 className="text-sm font-bold text-amber-800">AI Insight</h4>
          </div>
          <p className="text-amber-700 text-sm">
            Based on current guest behavior and satisfaction scores, focusing on
            personalized experiences during peak hours (2-4 PM) will maximize
            revenue and guest happiness.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
