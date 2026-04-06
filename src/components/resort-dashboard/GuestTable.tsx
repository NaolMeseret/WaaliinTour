import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Guest } from "@/services/resort-dashboard/mockData";
import {
  getMoodColor,
  getMoodIcon,
  getScoreColor,
} from "@/lib/resort-dashboard/utils";

interface GuestTableProps {
  guests: Guest[];
}

export default function GuestTable({ guests }: GuestTableProps) {
  return (
    <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900">
          Guest Intelligence
        </CardTitle>
        <p className="text-slate-500 text-sm">
          Real-time insights and AI recommendations
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-4 px-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Name
                </th>
                <th className="text-left py-4 px-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Room
                </th>
                <th className="text-left py-4 px-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Mood
                </th>
                <th className="text-left py-4 px-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Score
                </th>
                <th className="text-left py-4 px-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  AI Suggestion
                </th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr
                  key={guest.id}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-2">
                    <div>
                      <div className="font-bold text-slate-900">
                        {guest.name}
                      </div>
                      {guest.tourJoined && (
                        <div className="text-xs text-slate-500">
                          {guest.tourJoined}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">
                      {guest.roomNumber}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${getMoodColor(guest.mood)}`}
                    >
                      <span>{getMoodIcon(guest.mood)}</span>
                      <span className="capitalize">{guest.mood}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-lg font-extrabold ${getScoreColor(guest.satisfactionScore)}`}
                      >
                        {guest.satisfactionScore}
                      </span>
                      <span className="text-xs text-slate-400">/10</span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="text-sm text-slate-700 max-w-xs">
                      {guest.aiSuggestion}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
