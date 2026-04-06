"use client"

import { useState, useMemo } from 'react'
import { Search, MapPin, Calendar, DollarSign, SlidersHorizontal, ArrowRight } from 'lucide-react'
import { Tour } from '@/types'
import TourCard from '@/components/tours/TourCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ToursClientProps {
  initialTours: Tour[]
}

export default function ToursClient({ initialTours }: ToursClientProps) {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredTours = useMemo(() => {
    return initialTours.filter(tour => {
      const matchSearch = tour.title.toLowerCase().includes(search.toLowerCase()) || 
                          tour.description.toLowerCase().includes(search.toLowerCase())
      const matchLocation = !location || tour.location.toLowerCase().includes(location.toLowerCase())
      const matchPrice = !maxPrice || tour.price <= parseFloat(maxPrice)
      
      return matchSearch && matchLocation && matchPrice
    })
  }, [initialTours, search, location, maxPrice])

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white border-b pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
                Explore <span className="text-green-600 underline decoration-green-200 decoration-8 underline-offset-4">Ancient</span> Cultures
              </h1>
              <p className="text-slate-500 text-lg max-w-2xl animate-in fade-in slide-in-from-top-4 duration-700">
                Discover authentic cultural group tours curated by local experts. Find your next transformative journey.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="Search tours, festivals, or keywords..." 
                  className="pl-12 h-14 border-none focus-visible:ring-0 text-slate-700"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="h-10 sm:h-auto w-px bg-slate-100 hidden sm:block mx-1" />
              <Button 
                variant="ghost" 
                onClick={() => setShowFilters(!showFilters)}
                className="h-14 sm:px-6 rounded-xl flex items-center justify-center gap-2 font-bold text-slate-600 hover:text-green-700 hover:bg-green-50"
              >
                <SlidersHorizontal className="h-5 w-5" />
                {showFilters ? 'Hide Filters' : 'More Filters'}
              </Button>
              <Button className="h-14 sm:px-10 rounded-xl font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-100">
                Find Tours
              </Button>
            </div>

            {/* Filter Drawer */}
            {showFilters && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl shadow-lg border border-slate-50 animate-in zoom-in-95 duration-300">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder="e.g. Addis Ababa" 
                      className="pl-10 bg-slate-50 border-slate-100 h-12 rounded-xl focus-visible:ring-green-500"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Max Price ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      type="number"
                      placeholder="e.g. 500" 
                      className="pl-10 bg-slate-50 border-slate-100 h-12 rounded-xl focus-visible:ring-green-500"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pt-16">
        <div className="flex items-center justify-between mb-8">
          <p className="text-slate-500 text-sm font-bold">
            Showing <span className="text-slate-900">{filteredTours.length}</span> authentic tours
          </p>
        </div>

        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[2rem] shadow-sm border border-slate-100">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No tours found</h3>
            <p className="text-slate-500 max-w-xs mx-auto mb-8 text-sm">
              We couldn't find any tours matching your current search or filter criteria. Try adjusting them!
            </p>
            <Button 
                variant="outline" 
                onClick={() => { setSearch(''); setLocation(''); setMaxPrice(''); }}
                className="font-bold border-green-200 text-green-700 hover:bg-green-50"
            >
                Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
