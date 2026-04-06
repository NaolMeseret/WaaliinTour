import Link from 'next/link'
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tour } from '@/types'
import { SafeImage } from '@/components/ui/safe-image'

interface TourCardProps {
  tour: Tour
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Card className="group overflow-hidden border-slate-100 transition-all duration-300 hover:shadow-xl hover:shadow-green-100/50 hover:-translate-y-1 bg-white">
      <div className="relative aspect-[16/10] overflow-hidden">
        <SafeImage
          src={tour.image_url}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <div className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-green-700 shadow-sm">
            ${tour.price}
          </div>
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="mb-2 text-xl font-bold text-slate-800 group-hover:text-green-700 transition-colors line-clamp-1">
          {tour.title}
        </h3>
        
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4 text-green-600 shrink-0" />
            <span className="line-clamp-1">{tour.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="h-4 w-4 text-green-600 shrink-0" />
            <span>{new Date(tour.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
        
        <p className="mt-3 text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {tour.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Link href={`/tours/${tour.id}`} className="w-full">
          <Button variant="outline" className="w-full group/btn border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
