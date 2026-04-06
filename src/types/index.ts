export interface Tour {
  id: string
  title: string
  description: string
  date: string
  location: string
  price: number
  requirements: string[]
  image_url: string
  owner_id?: string
  created_at?: string
}

export interface TourRegistration {
  id: string
  tour_id: string
  user_id: string
  origin_location: string
  exploration_vibe: string
  guests_count: number
  payment_status: 'pending' | 'paid'
  created_at?: string
}

export interface ExploreContent {
  id: string
  category: 'Language' | 'Clothing' | 'Places' | 'Traditions'
  type?: 'language' | 'conversation' | 'clothing'
  title: string
  content?: string
  text_content?: string
  audio_text?: string
  image_url?: string
  related_tour_id?: string
  owner_id?: string
  // Enhanced language fields
  local_text?: string
  english_text?: string
  pronunciation?: string
  example_sentence?: string
  explanation?: string
  category_name?: string
  // Collection support for grouped expressions
  is_collection?: boolean
  sub_items?: ExploreContent[]
  ethnic_group?: 'Oromo' | 'Amhara' | 'Sidama' | 'Other'
}
