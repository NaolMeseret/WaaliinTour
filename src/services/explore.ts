import { createClient } from "@/lib/supabase/server"
import { ExploreContent } from "@/types"

const MOCK_EXPLORE_CONTENT: ExploreContent[] = [
  // OROMO COLLECTIONS
  {
    id: "coll-greet-oromo",
    category: "Language",
    type: "language",
    is_collection: true,
    ethnic_group: "Oromo",
    title: "Oromo Greetings",
    content: "Master the essential ways to greet locals politely in Afaan Oromoo.",
    category_name: "Greetings",
    sub_items: [
      {
        id: "lang-greet-1",
        category: "Language",
        type: "language",
        title: "Hello",
        local_text: "Akkam",
        english_text: "How are you? / Hello",
        pronunciation: "Akkaam",
      },
      {
        id: "lang-greet-2",
        category: "Language",
        type: "language",
        title: "Good Morning",
        local_text: "Akkam bulte?",
        english_text: "Good morning",
        pronunciation: "Akkaam bultee",
      }
    ]
  },
  // AMHARIC COLLECTIONS
  {
    id: "coll-greet-amhara",
    category: "Language",
    type: "language",
    is_collection: true,
    ethnic_group: "Amhara",
    title: "Amharic Basics",
    content: "Learn the foundational greetings of Amharic, the official language of Ethiopia.",
    category_name: "Greetings",
    sub_items: [
      {
        id: "lang-am-1",
        category: "Language",
        type: "language",
        title: "Greeting",
        local_text: "Selam",
        english_text: "Hello",
        pronunciation: "Seh-lahm",
      },
      {
        id: "lang-am-2",
        category: "Language",
        type: "language",
        title: "Thank You",
        local_text: "Ameseginalehu",
        english_text: "Thank you",
        pronunciation: "Ah-meh-seh-geh-nah-leh-hoo",
      }
    ]
  },
  // SIDAMA COLLECTIONS
  {
    id: "coll-greet-sidama",
    category: "Language",
    type: "language",
    is_collection: true,
    ethnic_group: "Sidama",
    title: "Sidama Phrases",
    content: "Essential expressions in Sidaamu Afoo, the language of the Sidama people.",
    category_name: "Daily Life",
    sub_items: [
      {
        id: "lang-sid-1",
        category: "Language",
        type: "language",
        title: "Welcome",
        local_text: "Ayidde",
        english_text: "Welcome",
        pronunciation: "Ah-yee-deh",
      },
      {
        id: "lang-sid-2",
        category: "Language",
        type: "language",
        title: "Peace",
        local_text: "Keere",
        english_text: "Hello / Peace",
        pronunciation: "Kee-reh",
      }
    ]
  },
  // OROMO CLOTHING
  {
    id: "exp-clothing-oromo",
    category: "Clothing",
    type: "clothing",
    ethnic_group: "Oromo",
    title: "Oromo Traditional Attire",
    content: "Features intricate hand-woven white cotton with bold embroidery (Qoolloo).",
    image_url: "/oromo_dress.svg",
  },
  // AMHARA CLOTHING
  {
    id: "exp-clothing-amhara",
    category: "Clothing",
    type: "clothing",
    ethnic_group: "Amhara",
    title: "Habesha Kemis",
    content: "The iconic Amhara hand-woven dress, often adorned with traditional 'Tibeb' patterns.",
    image_url: "/habesha_dress.svg",
  },
  // SIDAMA CLOTHING
  {
    id: "exp-clothing-sidama",
    category: "Clothing",
    type: "clothing",
    ethnic_group: "Sidama",
    title: "Sidama Traditional Dress",
    content: "Rich cultural dress featuring the vibrant green and red characteristic of Sidama art.",
    image_url: "/sidama_dress.svg",
  }
]

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

export async function getExploreContent(tourId?: string, ownerId?: string): Promise<ExploreContent[]> {
  const supabase = createClient()

  let query = supabase.from('explore_content').select('*')

  if (ownerId) {
    query = query.eq('owner_id', ownerId)
  }

  if (tourId && !ownerId) {
    query = query.or(`related_tour_id.eq.${tourId},related_tour_id.is.null`)
  }

  if (tourId && ownerId) {
    query = query.eq('related_tour_id', tourId)
  }

  const { data, error } = await query
  const dbData = (data as ExploreContent[]) || []

  if (ownerId) {
    return dbData.map((item) => ({
      ...item,
      image_url: fixImagePath(item.image_url || null),
    }))
  }

  // To ensure the new redesigned content is always visible during development/prototype,
  // we merge the DB results with our comprehensive mock data.
  const normalizedDbData = dbData.map((item) => ({
    ...item,
    image_url: fixImagePath(item.image_url || null),
  }))

  const mergedContent = MOCK_EXPLORE_CONTENT.map((item) => ({
    ...item,
    image_url: fixImagePath(item.image_url || null),
  }))

  normalizedDbData.forEach((item) => {
    if (!mergedContent.find((m) => m.id === item.id)) {
      mergedContent.push(item)
    }
  })

  if (tourId) {
    return mergedContent.filter(
      (c) => c.related_tour_id === tourId || !c.related_tour_id
    )
  }

  return mergedContent
}

export async function getHotelExploreContent(ownerId: string, tourId?: string): Promise<ExploreContent[]> {
  return getExploreContent(tourId, ownerId)
}

export async function createHotelExploreContent(payload: {
  title: string
  category: "Language" | "Clothing" | "Places" | "Traditions"
  content: string
  related_tour_id?: string | null
  image_url?: string | null
  owner_id: string
}): Promise<ExploreContent | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('explore_content')
    .insert([
      {
        title: payload.title,
        category: payload.category,
        content: payload.content,
        related_tour_id: payload.related_tour_id || null,
        image_url: payload.image_url || null,
        owner_id: payload.owner_id,
      },
    ])
    .select()
    .single()

  if (error || !data) {
    console.error("Failed to create hotel culture hub content:", error)
    return null
  }

  return {
    ...data,
    image_url: fixImagePath(data.image_url || null),
  }
}

export async function getExploreContentById(id: string): Promise<ExploreContent | null> {
  const supabase = createClient()
  const { data, error } = await supabase.from('explore_content').select('*').eq('id', id).single()

  if (error || !data) {
    console.warn(`Explore content with ID ${id} not found in DB, checking mock data...`)
    const mock = MOCK_EXPLORE_CONTENT.find(c => c.id === id)
    return mock ? { ...mock, image_url: fixImagePath(mock.image_url || null) } : null
  }

  return {
    ...data as ExploreContent,
    image_url: fixImagePath(data.image_url)
  }
}
