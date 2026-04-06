import { getExploreContent } from "@/services/explore"
import ExploreClient from "./explore-client"

export const metadata = {
  title: "Interactive Culture Hub — Waaliin Tours",
  description: "Learn about the rich traditions, languages, and unique clothing of the regions we explore.",
}

export default async function ExplorePage() {
  const content = await getExploreContent()

  return <ExploreClient initialContent={content} />
}
