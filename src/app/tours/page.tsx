import { getTours } from "@/services/tours"
import ToursClient from "./tours-client"

export const metadata = {
  title: "Browse Tours — Waaliin Tours",
  description: "Discover and filter cultural group tours by location, date, and price.",
}

export default async function ToursPage() {
  const tours = await getTours()
  return <ToursClient initialTours={tours} />
}
