import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Guest } from "@/services/resort-dashboard/mockData";
import {
  getMoodColor,
  getMoodIcon,
  getScoreColor,
} from "@/lib/resort-dashboard/utils";
import { Heart, X, MapPin, Users, Star } from "lucide-react";

interface GuestIntelligencePanelProps {
  guest: Guest;
}

export default function GuestIntelligencePanel({
  guest,
}: GuestIntelligencePanelProps) {
  return (
    <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-lg">
            {guest.name.charAt(0)}
          </div>
          {guest.name}
        </CardTitle>
        <p className="text-slate-500 text-sm">
          Room {guest.roomNumber} • Guest Intelligence
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Room
              </span>
            </div>
            <p className="text-lg font-extrabold text-slate-900">
              {guest.roomNumber}
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Tour
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {guest.tourJoined || "No tour"}
            </p>
          </div>
        </div>

        {/* Mood and Score */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Current Mood
              </span>
            </div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold ${getMoodColor(guest.mood)}`}
            >
              <span className="text-lg">{getMoodIcon(guest.mood)}</span>
              <span className="capitalize">{guest.mood}</span>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Satisfaction
              </span>
            </div>
            <p
              className={`text-2xl font-extrabold ${getScoreColor(guest.satisfactionScore)}`}
            >
              {guest.satisfactionScore}/10
            </p>
          </div>
        </div>

        {/* Behavior Summary */}
        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <h4 className="text-sm font-bold text-blue-800 mb-2">
            Behavior Summary
          </h4>
          <p className="text-blue-700 text-sm">{guest.behaviorSummary}</p>
        </div>

        {/* Likes and Dislikes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-green-600" />
              <h4 className="text-sm font-bold text-green-800">Likes</h4>
            </div>
            <ul className="space-y-1">
              {guest.likes.map((like, index) => (
                <li
                  key={index}
                  className="text-sm text-green-700 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  {like}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
            <div className="flex items-center gap-2 mb-3">
              <X className="w-4 h-4 text-red-600" />
              <h4 className="text-sm font-bold text-red-800">Dislikes</h4>
            </div>
            <ul className="space-y-1">
              {guest.dislikes.map((dislike, index) => (
                <li
                  key={index}
                  className="text-sm text-red-700 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  {dislike}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <h4 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
            <span className="text-lg">🤖</span>
            AI Recommendation
          </h4>
          <p className="text-amber-700 text-sm font-medium">
            {guest.aiSuggestion}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
