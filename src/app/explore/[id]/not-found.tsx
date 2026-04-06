import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Search } from 'lucide-react'

export default function ExploreNotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-8">
        <Search className="h-10 w-10" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Cultural Piece Not Found</h1>
      <p className="text-slate-500 max-w-sm mb-12 italic text-lg font-medium leading-relaxed">The cultural artifact or lesson you are looking for doesn't exist yet or has been moved.</p>
      <Link href="/explore">
        <Button size="lg" className="h-16 px-12 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl shadow-slate-200">Back to Explore Academy</Button>
      </Link>
    </div>
  )
}
