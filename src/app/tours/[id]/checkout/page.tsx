import { getTourById } from "@/services/tours"
import { notFound } from "next/navigation"
import RegistrationForm from "@/components/tours/RegistrationForm"
import { ArrowLeft, ShieldCheck, Star } from "lucide-react"
import Link from "next/link"

interface CheckoutPageProps {
  params: {
    id: string
  }
}

export const metadata = {
  title: "Complete Your Registration — Waaliin Tours",
  description: "Secure your spot on a cultural group tour. Fill in your details and complete the checkout.",
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const tour = await getTourById(params.id)

  if (!tour) {
    notFound()
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link 
          href={`/tours/${tour.id}`} 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-green-600 font-bold text-xs uppercase tracking-widest mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tour Details
        </Link>

        {/* Header */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    Complete Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Registration</span>
                </h1>
                <p className="text-slate-500 text-lg max-w-lg leading-relaxed animate-in fade-in slide-in-from-top-4 duration-700">
                    You're just one step away from joining the <span className="text-slate-900 font-bold underline decoration-green-200">{tour.title}</span>. Secure your booking below.
                </p>
            </div>
            <div className="hidden lg:flex items-center gap-6 justify-end">
               <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-sm border border-slate-100">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-700 tracking-tight">4.9/5 RATING</span>
               </div>
               <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-sm border border-slate-100 uppercase tracking-widest text-[10px] font-bold text-green-600">
                  <ShieldCheck className="w-4 h-4" />
                  Secured Booking
               </div>
            </div>
        </div>

        {/* Registration Form Component */}
        <RegistrationForm tour={tour} />
      </div>
    </div>
  )
}
