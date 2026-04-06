import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const body = await req.json()
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required to add culture content." },
      { status: 401 }
    )
  }

  const { title, category, content, related_tour_id, image_url } = body

  if (!title || !content || !category) {
    return NextResponse.json(
      { error: "Missing required culture content fields." },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from("explore_content")
    .insert([
      {
        title,
        category,
        content,
        related_tour_id: related_tour_id || null,
        image_url: image_url || null,
        owner_id: user.id,
      },
    ])
    .select()
    .single()

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || "Unable to add culture content." },
      { status: 500 }
    )
  }

  return NextResponse.json({ content: data })
}
