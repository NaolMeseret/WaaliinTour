import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

type UserProfile = {
  id: string
  email: string
  role: 'user' | 'hotel'
}

async function fetchUserProfile(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export async function requireHotelResortUser() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const profile = await fetchUserProfile(user.id)
  const role = profile?.role ?? 'user'

  if (role !== 'hotel' && role !== 'resort') {
    redirect('/')
  }

  return { role, userId: user.id }
}

export async function getCurrentUserId() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user?.id ?? null
}

export async function getCurrentUserRole() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null
  const profile = await fetchUserProfile(user.id)
  return profile?.role ?? null
}
