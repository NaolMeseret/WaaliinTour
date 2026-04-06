"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerForTour } from '@/services/registrations'
import { Tour } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldCheck, CreditCard, Loader2, CheckCircle2, User, Mail, Phone, Users, MapPin, Sparkles, ArrowRight } from 'lucide-react'

interface RegistrationFormProps {
  tour: Tour
}

export default function RegistrationForm({ tour }: RegistrationFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    origin_location: '',
    exploration_vibe: '',
    guests_count: 1,
  })

  // Validation State (for red/green borders)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validate = (name: string, value: any) => {
    if (name === 'origin_location') return value.length >= 3
    if (name === 'exploration_vibe') return value.length >= 5
    if (name === 'guests_count') return value >= 1 && value <= 15
    return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Basic client-side validation check
    if (!validate('origin_location', formData.origin_location) || 
        !validate('exploration_vibe', formData.exploration_vibe)) {
      setError("Please fill in all fields correctly.")
      setLoading(false)
      return
    }

    try {
      const result = await registerForTour({
        tour_id: tour.id,
        ...formData,
        payment_status: 'paid' // Mock payment success for MVP
      })

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        // Redirect to Explore page with the tour ID for recommendation logic (Step 5)
        setTimeout(() => {
          router.push(`/explore?tourId=${tour.id}`)
        }, 3000)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please check your internet connection.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-xl shadow-green-100/50">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Registration Successful!</h2>
        <p className="text-slate-500 max-w-sm mb-10 leading-relaxed font-medium">
          Welcome to the {tour.title}. You have been officially registered and your spot is reserved.
        </p>
        <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4 border border-slate-100 mb-8 max-w-xs w-full">
           <Loader2 className="w-5 h-5 text-green-600 animate-spin shrink-0" />
           <p className="text-xs font-bold text-slate-600 tracking-tight uppercase">Redirecting to your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Col — Information Form */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 text-sm">1</span>
              Personal Details
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2 mt-4">
                    <MapPin className="w-3 h-3" /> Origin Location
                </label>
                <Input
                  name="origin_location"
                  placeholder="Where are you traveling from?"
                  value={formData.origin_location}
                  onChange={handleChange}
                  isValid={touched.origin_location && validate('origin_location', formData.origin_location)}
                  isInvalid={touched.origin_location && !validate('origin_location', formData.origin_location)}
                  className="h-14 rounded-2xl bg-white border-slate-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2 mt-4">
                    <Sparkles className="w-3 h-3" /> Exploration Vibe
                </label>
                <Input
                  name="exploration_vibe"
                  placeholder="What is your expected vibe? (e.g. Adventure, Peace)"
                  value={formData.exploration_vibe}
                  onChange={handleChange}
                  isValid={touched.exploration_vibe && validate('exploration_vibe', formData.exploration_vibe)}
                  isInvalid={touched.exploration_vibe && !validate('exploration_vibe', formData.exploration_vibe)}
                  className="h-14 rounded-2xl bg-white border-slate-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2 mt-4">
                    <Users className="w-3 h-3" /> Number of Guests
                </label>
                <Input
                  type="number"
                  name="guests_count"
                  min="1"
                  max="15"
                  value={formData.guests_count}
                  onChange={handleChange}
                  isValid={touched.guests_count && validate('guests_count', formData.guests_count)}
                  isInvalid={touched.guests_count && !validate('guests_count', formData.guests_count)}
                  className="h-14 rounded-2xl bg-white border-slate-200"
                  required
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 text-sm">2</span>
              Payment Method (Mock)
            </h3>
            <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden shadow-2xl shadow-green-100/50 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px]">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-8 bg-amber-400/20 rounded border border-amber-300/30 flex items-center justify-center overflow-hidden">
                     <div className="w-full h-1 bg-amber-300/20" />
                  </div>
                  <CreditCard className="w-8 h-8 text-slate-500" />
                </div>
                <div>
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">MOCK CARD</p>
                   <p className="text-xl font-mono tracking-[0.2em] font-bold">•••• •••• •••• 4242</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </div>
            <p className="text-[10px] text-slate-400 mt-4 px-2 font-bold uppercase tracking-wider flex items-center gap-1.5 justify-center">
                 <ShieldCheck className="w-3 h-3" /> Secured by Waaliin Payments Gateway
            </p>
          </section>
        </div>

        {/* Right Col — Summary & Action */}
        <div className="space-y-8">
            <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/50 overflow-hidden">
                <CardHeader className="bg-slate-50 p-6 border-b border-white">
                    <CardTitle className="text-lg font-bold text-slate-900">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between py-2">
                        <span className="text-slate-500 font-medium">Tour Price</span>
                        <span className="text-slate-900 font-extrabold uppercase tracking-tight">${tour.price}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-slate-500 font-medium">Guests</span>
                        <span className="text-slate-900 font-extrabold pb-0.5">x {formData.guests_count}</span>
                    </div>
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-slate-900 font-extrabold text-xl">Total</span>
                        <span className="text-green-600 font-extrabold text-3xl tracking-tight leading-none">${tour.price * formData.guests_count}</span>
                    </div>

                    <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 space-y-2 mt-8">
                         <div className="flex items-center gap-2 mb-1">
                             <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                             <h4 className="text-amber-900 font-bold text-xs">Payment Information</h4>
                         </div>
                         <p className="text-amber-700/80 text-[10px] uppercase font-bold tracking-wider leading-relaxed">
                             This is a trial/MVP platform. Payment is currently simulated for demonstration.
                         </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">⚠️</div>
                            <p className="text-red-700 text-xs font-bold leading-relaxed">{error}</p>
                        </div>
                    )}

                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full h-16 rounded-2xl text-lg font-extrabold shadow-2xl shadow-green-100 group mt-4 relative overflow-hidden"
                    >
                        {loading ? (
                           <Loader2 className="w-6 h-6 animate-spin mx-auto text-white" />
                        ) : (
                           <div className="flex items-center gap-2">
                               Secure Checkout
                               <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                           </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-green-800/20" />
                    </Button>
                </CardContent>
            </Card>

            <div className="px-8 space-y-4">
                <div className="flex items-center gap-3 text-slate-400">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em]">256-bit SSL encrypted connection</p>
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                    By confirming your spot, you agree to the Waaliin Tours Terms of Service and Privacy Policy. All payments are final and subject to our refund protocol.
                </p>
            </div>
        </div>
      </form>
    </div>
  )
}
