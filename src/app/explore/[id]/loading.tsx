import { Skeleton } from "@/components/ui/skeleton"

export default function ExploreLoading() {
  return (
    <div className="max-w-4xl mx-auto py-32 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-16 animate-pulse">
        <div className="h-10 w-40 bg-slate-100 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
           <Skeleton className="h-8 w-32 rounded-full" />
           <Skeleton className="h-20 w-3/4 rounded-2xl" />
           <Skeleton className="h-32 w-full rounded-2xl" />
           <div className="h-48 bg-slate-50 rounded-[2.5rem] animate-pulse" />
        </div>
        <div className="aspect-[3/4] bg-slate-100 rounded-[3rem] animate-pulse" />
      </div>
    </div>
  )
}
