"use client";

import { useState, useEffect } from "react";
import ActionPanel from "@/components/resort-dashboard/ActionPanel";
import AIChatInterface from "@/components/resort-dashboard/AIChatInterface";
import { mockGuests } from "@/services/resort-dashboard/mockData";
import { ResortAIService } from "@/services/resort-dashboard/aiService";

export default function AISuggestionsClient() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [selectedRecommendation, setSelectedRecommendation] = useState<{
    text: string;
    index: number;
  } | null>(null);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recs = await ResortAIService.generateDailyRecommendations();
        setRecommendations(recs);
      } catch (error) {
        console.error("Error loading recommendations:", error);
      } finally {
        setLoadingRecommendations(false);
      }
    };

    loadRecommendations();
  }, []);

  const handleRecommendationSelect = (text: string, index: number) => {
    setSelectedRecommendation({ text, index });
  };

  const handleClearSelection = () => {
    setSelectedRecommendation(null);
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">
            AI Suggestions
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Personalized actions for your resort teams
          </h1>
          <p className="text-slate-600 leading-8">
            Use AI-driven recommendations to improve guest satisfaction,
            optimize service staffing, and increase revenue.
          </p>
        </div>
      </section>

      {/* LOADING */}
      {loadingRecommendations ? (
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
          <div className="max-w-3xl animate-pulse">
            <div className="h-6 w-2/5 rounded-full bg-slate-200 mb-4" />
            <div className="h-4 w-4/5 rounded-full bg-slate-200 mb-6" />
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(2)].map((_, idx) => (
                <div key={idx} className="h-40 rounded-[2rem] bg-slate-100" />
              ))}
            </div>
          </div>
        </section>
      ) : (
        recommendations.length > 0 && (
          <>
            <ActionPanel
              recommendations={recommendations}
              onRecommendationSelect={handleRecommendationSelect}
            />

            <AIChatInterface
              recommendations={recommendations}
              selectedRecommendation={selectedRecommendation}
              onClearSelection={handleClearSelection}
            />
          </>
        )
      )}

      {/* GUEST SECTION */}
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Guest-Level AI Suggestions
          </h2>
          <p className="text-slate-500">
            Individual recommendations tailored for each guest.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {mockGuests.map((guest) => (
              <div
                key={guest.id}
                className="rounded-3xl border border-slate-200 p-5 bg-slate-50"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {guest.name}
                </h3>
                <p className="text-sm text-slate-500 mb-3">
                  Room {guest.roomNumber}
                </p>

                <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-500 uppercase tracking-[0.2em] mb-2">
                    Suggested action
                  </p>
                  <p className="text-slate-800 font-medium">
                    {guest.aiSuggestion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
