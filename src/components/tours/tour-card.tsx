import Link from "next/link"
import { Tour } from "@/types"

interface TourCardProps {
  tour: Tour
}

export function TourCard({ tour }: TourCardProps) {
  const formattedDate = new Date(tour.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <article className="tour-card glass-card rounded-2xl overflow-hidden group">
      {/* Image placeholder */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-900/40 to-slate-800">
        {tour.image_url ? (
          <img
            src={tour.image_url}
            alt={tour.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-30">🏔️</span>
          </div>
        )}
        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
          ${tour.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-white font-semibold text-base leading-snug group-hover:text-emerald-400 transition-colors">
            {tour.title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-3">
          <span>📍</span>
          <span>{tour.location}</span>
          <span className="mx-1 text-slate-600">·</span>
          <span>📅</span>
          <span>{formattedDate}</span>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {tour.description}
        </p>

        <Link
          href={`/tours/${tour.id}`}
          className="block w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/20"
        >
          View Details →
        </Link>
      </div>
    </article>
  )
}
