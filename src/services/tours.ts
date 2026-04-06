import { createClient } from "@/lib/supabase/server"
import { Tour } from "@/types"
const MOCK_TOURS: Tour[] = [
  {
    id: "tour-1",
    title: "Irreecha Cultural Festival Experience",
    description: "Join thousands at the Irreecha festival in Bishoftu. Experience Oromo thanksgiving traditions, music, dance, and cultural unity.",
    date: "2026-10-03",
    location: "Bishoftu, Ethiopia",
    price: 200,
    requirements: ["Traditional clothing", "Water bottle", "Camera"],
    image_url: "/irrecha.jpg",
  },
  {
    id: "tour-2",
    title: "Addis Ababa City & Culture Tour",
    description: "Discover Addis Ababa. Visit the National Museum, Merkato, and enjoy a traditional coffee ceremony.",
    date: "2026-06-15",
    location: "Addis Ababa, Ethiopia",
    price: 120,
    requirements: ["Comfortable shoes", "Valid ID", "Camera"],
    image_url: "/addis_city.jpg",
  },
  {
    id: "tour-3",
    title: "Fichee Chambalaalla Celebration Tour",
    description: "Celebrate the Sidama New Year with traditional food, dances, and cultural experiences.",
    date: "2026-07-05",
    location: "Sidama, Ethiopia",
    price: 180,
    requirements: ["Respectful attire", "Camera"],
    image_url: "/fichechambala.jpg"
  },
  {
    id: "tour-4",
    title: "Simien Mountains Adventure Trek",
    description: "Explore dramatic cliffs, valleys, and wildlife in one of Africa’s most stunning landscapes.",
    date: "2026-07-20",
    location: "Simien Mountains, Ethiopia",
    price: 450,
    requirements: ["Trekking gear", "Warm clothes", "Fitness"],
    image_url: "/simien_mountains.jpg",
  },
  {
    id: "tour-5",
    title: "Lalibela Rock Churches Tour",
    description: "Visit the famous rock-hewn churches and explore Ethiopia’s spiritual heritage.",
    date: "2026-08-10",
    location: "Lalibela, Ethiopia",
    price: 320,
    requirements: ["Modest clothing", "Sun protection"],
    image_url: "/lalibela.jpg",
  },
  {
    id: "tour-6",
    title: "Omo Valley Cultural Experience",
    description: "Meet diverse tribes and explore unique traditions in the Omo Valley.",
    date: "2026-09-12",
    location: "Omo Valley, Ethiopia",
    price: 600,
    requirements: ["Guide required", "Respect culture"],
    image_url: "/omo_valley.jpg",
  },
  {
    id: "tour-7",
    title: "Lake Tana & Blue Nile Falls",
    description: "Explore Lake Tana monasteries and enjoy the Blue Nile Falls.",
    date: "2026-08-25",
    location: "Bahir Dar, Ethiopia",
    price: 250,
    requirements: ["Boat trip readiness", "Camera"],
    image_url: "/blue_nile.jpg",
  },
  {
    id: "tour-8",
    title: "Harar Historic City Tour",
    description: "Explore Harar’s old city, markets, and famous hyena feeding tradition.",
    date: "2026-09-05",
    location: "Harar, Ethiopia",
    price: 220,
    requirements: ["Guide", "Comfortable shoes"],
    image_url: "/harar.jpg",
  }
];

function fixImagePath(path: string | null): string {
  if (!path) return "/images (2).jpg"; // Fallback to an existing image
  
  // If it's already a full URL (Supabase or external), leave it alone
  if (path.startsWith('http')) return path;

  // Fix common mismatches from seed data
  let fixedPath = path;
  if (fixedPath.startsWith('/images/')) {
    fixedPath = fixedPath.replace('/images/', '/');
  }

  // Exact filename fixes for specific seed data mismatches
  if (fixedPath === '/irreecha.jpg') fixedPath = '/irrecha.jpg';
  if (fixedPath === '/fichee.jpg') fixedPath = '/fichechambala.jpg';

  return fixedPath;
}

export async function getTours(filters?: { location?: string; price?: number }, ownerId?: string): Promise<Tour[]> {
  const supabase = createClient()

  let query = supabase.from('tours').select('*')

  if (ownerId) {
    query = query.eq('owner_id', ownerId)
  }

  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`)
  }

  if (filters?.price) {
    query = query.lte('price', filters.price)
  }

  const { data, error } = await query.order('date', { ascending: true })

  if (error || !data) {
    if (ownerId) {
      console.warn("Failed to load hotel-owned tours:", error)
      return []
    }

    console.warn("Using mock tours due to missing database data or error:", error)
    return MOCK_TOURS.map((t) => ({ ...t, image_url: fixImagePath(t.image_url) }))
  }

  if (ownerId && Array.isArray(data) && data.length === 0) {
    return []
  }

  return (data as Tour[]).map((t) => ({
    ...t,
    image_url: fixImagePath(t.image_url),
  }))
}

export async function getHotelTours(ownerId: string): Promise<Tour[]> {
  return getTours(undefined, ownerId)
}

export async function createHotelTour(payload: {
  title: string
  description: string
  date: string
  location: string
  price: number
  requirements: string[]
  image_url?: string | null
  owner_id: string
}): Promise<Tour | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('tours')
    .insert([
      {
        title: payload.title,
        description: payload.description,
        date: payload.date,
        location: payload.location,
        price: payload.price,
        requirements: payload.requirements,
        image_url: payload.image_url || null,
        owner_id: payload.owner_id,
      },
    ])
    .select()
    .single()

  if (error || !data) {
    console.error("Failed to create hotel tour:", error)
    return null
  }

  return {
    ...data,
    image_url: fixImagePath(data.image_url),
  }
}

export async function getTourById(id: string): Promise<Tour | null> {
  const supabase = createClient()
  const { data, error } = await supabase.from('tours').select('*').eq('id', id).single()

  if (error || !data) {
    console.warn(`Tour with ID ${id} not found in DB, checking mock data...`)
    const mock = MOCK_TOURS.find(t => t.id === id)
    return mock ? { ...mock, image_url: fixImagePath(mock.image_url) } : null
  }

  return {
    ...data as Tour,
    image_url: fixImagePath(data.image_url)
  }
}
