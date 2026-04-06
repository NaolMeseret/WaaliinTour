import { getExploreContentById } from "@/services/explore"
import { DetailViewPage } from "@/components/explore/DetailViewPage"
import { notFound } from "next/navigation"

interface PageProps {
  params: { id: string }
}

export default async function ExploreDetailPage({ params }: PageProps) {
  const { id } = params
  const item = await getExploreContentById(id)

  if (!item) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <DetailViewPage item={item} />
    </main>
  )
}
