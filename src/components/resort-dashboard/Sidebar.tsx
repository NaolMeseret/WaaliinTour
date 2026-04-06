"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Users,
  Sparkles,
  BarChart3,
  DollarSign,
  Home,
  Settings,
  MapPin,
  BookOpen,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/resort-dashboard",
    icon: Home,
  },
  {
    title: "Tours",
    href: "/resort-dashboard/tours",
    icon: MapPin,
  },
  {
    title: "Culture Hub",
    href: "/resort-dashboard/culture-hub",
    icon: BookOpen,
  },
  {
    title: "Guests",
    href: "/resort-dashboard/guest-intelligence",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/resort-dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "AI Suggestions",
    href: "/resort-dashboard/ai-suggestions",
    icon: Sparkles,
  },
  {
    title: "Settings",
    href: "/resort-dashboard/settings",
    icon: Settings,
  },
];

export default function ResortDashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-[2rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/30 p-6 sticky top-6 h-fit">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500 mb-2">
          Resort Control
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          Hotel & Resort Dashboard
        </h2>
        <p className="text-sm text-slate-500 mt-4">
          Manage guest intelligence, revenue, and AI recommendations from one
          place.
        </p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
