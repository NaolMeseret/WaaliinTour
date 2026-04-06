"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface RegistrationFormData {
  tour_id: string
  origin_location: string
  exploration_vibe: string
  guests_count: number
  payment_status: 'pending' | 'paid'
}

export async function registerForTour(formData: RegistrationFormData) {
  const supabase = createClient()
  
  // Verify authenticated user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: "You must be logged in to register for a tour." }
  }

  // Insert Registration
  const { data, error } = await supabase
    .from('registrations')
    .insert([
      {
        tour_id: formData.tour_id,
        user_id: user.id,
        origin_location: formData.origin_location,
        exploration_vibe: formData.exploration_vibe,
        guests_count: formData.guests_count,
        payment_status: formData.payment_status,
      }
    ])
    .select()

  if (error) {
    console.error("Registration Error: ", error)
    if (error.code === '23505') {
      return { error: "You are already registered for this tour." }
    }
    return { error: "Failed to process registration. Try again." }
  }

  revalidatePath('/dashboard')
  return { success: true, data }
}
