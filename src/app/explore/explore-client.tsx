"use client"

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Globe, Library, Shirt, MapPin, ArrowRight, Sparkles, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ExploreContent } from '@/types'
import { LanguageCard, ClothingCard } from '@/components/explore/explore-cards'
import Link from 'next/link'

interface ExploreClientProps {
  initialContent: ExploreContent[]
}

const CATEGORIES = [
  { name: 'All', icon: <Globe className="w-5 h-5" />, value: 'All' },
  { name: 'Language', icon: <Library className="w-5 h-5" />, value: 'language' },
  { name: 'Conversations', icon: <MessageSquare className="w-5 h-5" />, value: 'conversation' },
  { name: 'Clothing', icon: <Shirt className="w-5 h-5" />, value: 'clothing' },
]

export default function ExploreClient({ initialContent }: ExploreClientProps) {
  const searchParams = useSearchParams()
  const tourId = searchParams.get('tourId')
  
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeCulture, setActiveCulture] = useState('All')
  const [search, setSearch] = useState('')

  const cultures = ['All', 'Oromo', 'Amhara', 'Sidama']

  const recommendedContent = useMemo(() => {
    if (!tourId) return []
    return initialContent.filter(item => item.related_tour_id === tourId)
  }, [initialContent, tourId])

  const filteredContent = useMemo(() => {
    return initialContent.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.type === activeCategory || item.category === activeCategory
      const matchesCulture = activeCulture === 'All' || item.ethnic_group === activeCulture
      const matchesSearch = 
        item.title.toLowerCase().includes(search.toLowerCase()) || 
        (item.content || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.ethnic_group || '').toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesCulture && matchesSearch
    })
  }, [initialContent, activeCategory, activeCulture, search])

  return (
    <div className="bg-slate-50/50 min-h-screen pb-24">
      {/* Header */}
      <section className="bg-white border-b pt-24 pb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-50 rounded-full blur-3xl -z-10 translate-x-1/4 -translate-y-1/4" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
                Interactive <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Culture Academy</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl leading-relaxed mb-10">
                Unlock the secrets of Ethiopian culture. Practice languages, discover traditional styles, and master local conversations before your trip.
            </p>

            {/* Search */}
            <div className="relative max-w-xl group">
               <div className="absolute inset-0 bg-green-100 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-50 transition-opacity duration-300" />
               <div className="relative flex items-center bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                  <Search className="w-5 h-5 text-slate-400 ml-6 shrink-0" />
                  <Input 
                    placeholder="Search traditions, clothing, words..." 
                    className="h-16 border-none focus-visible:ring-0 text-slate-700 bg-transparent px-4 font-medium"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="px-6 text-[10px] font-extrabold text-slate-300 tracking-[0.2em] uppercase mr-2.5">
                    SEARCH
                  </div>
               </div>
            </div>
        </div>
      </section>

      {/* Culture Filter Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 bg-white p-2 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 w-fit min-w-full sm:min-w-0">
             <div className="flex items-center gap-3 px-8 border-r border-slate-100 whitespace-nowrap">
                <Sparkles className="w-5 h-5 text-green-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Filter By Culture</span>
             </div>
             <div className="flex gap-2 px-4">
                {cultures.map((culture) => (
                   <button
                     key={culture}
                     onClick={() => setActiveCulture(culture)}
                     className={`
                        px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                        ${activeCulture === culture 
                           ? 'bg-green-600 text-white shadow-lg' 
                           : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}
                     `}
                   >
                     {culture}
                   </button>
                ))}
             </div>
          </div>
      </div>

      {/* Tabs / Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
         <div className="flex flex-wrap items-center gap-3">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`
                        flex items-center gap-3 px-8 py-4 rounded-full text-sm font-extrabold transition-all duration-300 tracking-wide
                        ${activeCategory === cat.value 
                            ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300 scale-105' 
                            : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-green-600 border border-slate-100'}
                    `}
                >
                    <span className={activeCategory === cat.value ? 'text-green-400' : ''}>{cat.icon}</span>
                    {cat.name}
                </button>
            ))}
         </div>
      </div>

      {/* Recommended Section (Personalized Logic Remaining from previous TURN) */}
      {recommendedContent.length > 0 && (
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="bg-green-600 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-green-200/50">
                <div className="absolute top-0 right-0 p-8 opacity-20"><Sparkles className="w-24 h-24" /></div>
                <div className="relative z-10">
                    <h2 className="text-xs font-extrabold tracking-[0.3em] uppercase mb-4 flex items-center gap-2 text-green-200">
                        <Sparkles className="w-4 h-4" /> Personal Learning Path
                    </h2>
                    <h3 className="text-3xl sm:text-4xl font-extrabold mb-8 tracking-tight">Essential Insights for <br /><span className="text-green-200 italic">Your Selection</span></h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {recommendedContent.map((item) => (
                            <Link key={item.id} href={`/explore/${item.id}`} className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group hover:bg-white/20 transition-all border-dashed">
                                <h4 className="font-extrabold text-xl mb-3 flex items-center justify-between">
                                    {item.title}
                                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </h4>
                                <p className="text-sm text-green-50 font-medium line-clamp-2 leading-relaxed">{item.content}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
         </div>
      )}

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex items-center justify-between mb-12">
             <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Current <span className="text-green-600">Focus</span>
             </h2>
             <div className="bg-white px-6 py-2 rounded-full border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest leading-none">
                  <span className="text-slate-900">{filteredContent.length}</span> Results Found
                </p>
             </div>
         </div>

         {filteredContent.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {filteredContent.map((item) => {
                 // For Language, only show Collections in the main grid
                 if (item.category === 'Language' && !item.is_collection) {
                   return null;
                 }

                 if (item.type === 'language' || item.type === 'conversation' || item.is_collection) {
                   return <LanguageCard key={item.id} item={item} />
                 }
                 if (item.type === 'clothing') {
                   return <ClothingCard key={item.id} item={item} />
                 }
                 return (
                   <Card key={item.id} className="group overflow-hidden rounded-[2.5rem] border-none shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-all duration-500 bg-white flex flex-col h-full animate-in fade-in slide-in-from-bottom-4">
                       <CardHeader className="p-10 pb-0">
                          <CardTitle className="text-2xl font-extrabold text-slate-900 group-hover:text-green-600 transition-colors tracking-tight leading-tight">
                             {item.title}
                          </CardTitle>
                       </CardHeader>
                       <CardContent className="p-10 flex-1 flex flex-col justify-between">
                          <p className="text-slate-500 leading-relaxed font-medium mb-10 line-clamp-3">
                             {item.content}
                          </p>
                          <Link href={`/explore/${item.id}`}>
                            <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-200 font-bold group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300">
                               Learn More
                               <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </Link>
                       </CardContent>
                   </Card>
                 )
               }).filter(Boolean)}
            </div>
         ) : (
            <div className="text-center py-40 bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 border-dashed max-w-4xl mx-auto">
               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10 text-5xl">🔭</div>
               <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">No Discoveries Here</h3>
               <p className="text-slate-400 max-w-xs mx-auto text-lg mb-12 font-medium">Try another category or search term to unlock more culture.</p>
               <Button size="lg" onClick={() => { setActiveCategory('All'); setSearch(''); }} className="font-extrabold rounded-2xl h-14 px-12 shadow-lg">Reset Exploration</Button>
            </div>
         )}
      </div>

      {/* CTA Final */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-48">
           <div className="bg-slate-950 rounded-[4rem] p-16 sm:p-24 text-center relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(5,150,105,0.1),transparent)]" />
               <div className="relative z-10 max-w-3xl mx-auto">
                   <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-10 tracking-tight leading-[1.1]">Transform Theory into <br /><span className="text-green-500 italic">Experience</span></h2>
                   <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-16 italic font-medium opacity-80">Master the basics now, and connect deeply with the people of Ethiopia when you land. Every word learned is a bridge built.</p>
                   <Link href="/tours">
                      <Button size="lg" className="h-20 px-16 rounded-full text-2xl font-extrabold bg-green-600 hover:bg-green-700 shadow-3xl shadow-green-900/40 hover:-translate-y-1 transition-all">Start Your Journey</Button>
                   </Link>
               </div>
           </div>
      </section>
    </div>
  )
}
