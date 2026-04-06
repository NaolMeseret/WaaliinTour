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
      { error: "Authentication required to create a hotel tour." },
      { status: 401 }
    )
  }

  const { title, description, date, location, price, requirements, image_url } = body

  if (!title || !description || !date || !location || !price) {
    return NextResponse.json(
      { error: "Missing required tour fields." },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from("tours")
    .insert([
      {
        title,
        description,
        date,
        location,
        price,
        requirements: Array.isArray(requirements) ? requirements : [],
        image_url: image_url || null,
        owner_id: user.id,
      },
    ])
    .select()
    .single()

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || "Unable to create tour." },
      { status: 500 }
    )
  }

  return NextResponse.json({ tour: data })
}
