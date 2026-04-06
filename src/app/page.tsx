import Link from "next/link"
import { getTours } from "@/services/tours"
import TourCard from "@/components/tours/TourCard"
import { Button } from "@/components/ui/button"
import { Compass, Globe, Map, ShieldCheck, Star, Users, Zap } from "lucide-react"

export const metadata = {
  title: "Waaliin Tours — Discover Cultural Group Tours",
  description: "Explore immersive cultural group tours. Book your next adventure, learn local traditions, and connect with expert guides.",
}

export default async function HomePage() {
  // Fetch featured tours (first 3)
  const allTours = await getTours()
  const featuredTours = allTours.slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* ── Hero Section ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-50/50">
        {/* Background Patterns */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-emerald-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 bg-green-100/80 border border-green-200 text-green-800 text-xs font-bold px-4 py-2 rounded-full mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-600 animate-pulse" />
              AUTHENTIC CULTURAL EXPERIENCES
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Journey into the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                Heart of Culture
              </span>
            </h1>

            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed mb-10">
              Discover unique traditions, learn local languages, and build connections through our expertly curated group tours. More than just travel—it's a transformation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/tours">
                <Button size="lg" className="w-full sm:w-auto h-14 px-10 rounded-full text-lg shadow-xl shadow-green-200 hover:shadow-green-300 transition-all font-bold">
                  Explore Tours
                </Button>
              </Link>
              <Link href="/explore">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-10 rounded-full text-lg border-2 hover:bg-slate-50 font-bold">
                  Explore Culture
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-14 flex flex-wrap items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-xs font-bold overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-green-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                  2k+
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 mb-0.5">Join 2,000+ Explorers</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-slate-500">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Image Wrapper */}
          <div className="relative group animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="absolute inset-0 bg-green-200/30 rounded-[2.5rem] rotate-3 -z-10 group-hover:rotate-6 transition-transform duration-500" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border-8 border-white aspect-[4/5] sm:aspect-square">
              <img
                src="/irreechaa123.jpg"
                alt="Cultural Festival"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Map className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold tracking-wide">ADDIS ABABA, ETHIOPIA</span>
                </div>
                <h3 className="text-2xl font-bold">The Irreecha Festival</h3>
              </div>
            </div>

            {/* Floating Info Badges */}
            <div className="absolute top-10 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 animate-bounce transition-all duration-3000 hover:scale-110">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-2xl">🔥</div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Top Rated</p>
                  <p className="text-sm font-extrabold text-slate-900">Cultural Immersion</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 -right-10 bg-white p-5 rounded-3xl shadow-2xl border border-slate-50 max-w-[200px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-bold text-slate-800 leading-tight">Secure & Safe Tours</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">Full local insurance and emergency support on every journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Tours Section ── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-green-600 font-bold tracking-[0.2em] uppercase text-sm mb-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-green-600" /> Discover Our Trips
            </h2>
            <h3 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Curated Cultural <br />
              <span className="text-slate-400">Experiences</span>
            </h3>
          </div>
          <Link href="/tours">
            <Button variant="outline" className="h-12 px-8 rounded-full font-bold border-slate-200">
              View All Tours
            </Button>
          </Link>
        </div>

        {featuredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🗺️</div>
            <p className="text-xl font-bold text-slate-800 mb-2">New Tours Coming Soon!</p>
            <p className="text-slate-500 max-w-md mx-auto">Our experts are currently curating new authentic cultural journeys. Join our newsletter to be the first to know.</p>
          </div>
        )}

        {/* Categories Bar */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
            {[
              { label: "Festivals", icon: <Zap className="w-8 h-8 text-amber-400" /> },
              { label: "Traditions", icon: <Compass className="w-8 h-8 text-emerald-400" /> },
              { label: "Geography", icon: <Map className="w-8 h-8 text-green-400" /> },
              { label: "Community", icon: <Users className="w-8 h-8 text-blue-400" /> },
            ].map((cat) => (
              <div key={cat.label} className="text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-all group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-white/5 border border-white/5">
                  {cat.icon}
                </div>
                <p className="font-bold text-sm uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors">{cat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Highlights / Why Us ── */}
      <section className="py-24 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Expert Local Guides",
                    desc: "Walk with the people who call these traditions home.",
                    icon: "👤",
                    color: "bg-blue-50"
                  },
                  {
                    title: "Small Groups",
                    desc: "Intimate experiences that prioritize depth over speed.",
                    icon: "🤝",
                    color: "bg-green-50"
                  },
                  {
                    title: "AI-Powered Learning",
                    desc: "Get instant cultural background with our smart assistant.",
                    icon: "🤖",
                    color: "bg-purple-50"
                  },
                  {
                    title: "Sustainable Impact",
                    desc: "We prioritize local economies and ethical travel.",
                    icon: "🌱",
                    color: "bg-emerald-50"
                  }
                ].map((feature) => (
                  <div key={feature.title} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 border border-slate-100">
                    <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6`}>
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900 mb-3">{feature.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-green-600 font-bold tracking-[0.2em] uppercase text-sm mb-4">The Waaliin Advantage</h2>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                Authenticity is our <br />
                <span className="text-slate-400 font-medium italic">North Star.</span>
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                At Waaliin Tours, we don't just visit places; we integrate into them. Our mission is to preserve cultural heritage while making it accessible to those who seek genuine understanding.
              </p>
              <ul className="space-y-6 mb-10">
                {[
                  "Official government partnership and licenses.",
                  "Zero hidden fees. Full transparent pricing.",
                  "Custom-built cultural curriculum for every tour."
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 shrink-0">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-slate-700 font-bold">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <Button className="h-16 px-12 rounded-full text-xl font-extrabold shadow-xl shadow-green-100">
                  Join Our Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Voices of the <span className="text-slate-400">Journey</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Real stories from our global community of explorers who traveled with us across unique cultural landscapes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              name: "Yared Gebre",
              role: "Frequent Explorer",
              text: "The Irreecha tour was transformative. Seeing the gratitude of the elders firsthand and learning the language basics through the app before arrival made everything click.",
              image: "https://i.pravatar.cc/150/u=yared"
            },
            {
              name: "Sarah Miller",
              role: "Cultural Anthropologist",
              text: "Rarely do you find a tour operator so committed to authenticity. The Sidama festival was organized with incredible respect for local protocols. Highly recommended.",
              image: "https://i.pravatar.cc/150/u=sarah"
            },
            {
              name: "Ammanuel Bekele",
              role: "Photographer",
              text: "Visual heaven. Waaliin Tours doesn't just take you to the spots; they explain the meaning behind the colors, the cloth, and the dances. Capturing the Fichee was amazing.",
              image: "https://i.pravatar.cc/150/u=amman"
            }
          ].map((testimonial) => (
            <div key={testimonial.name} className="relative group p-1">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-50 to-emerald-50 rounded-[2.5rem] -z-10 group-hover:scale-105 transition-transform duration-300" />
              <div className="bg-white rounded-[2.2rem] p-10 h-full flex flex-col justify-between shadow-sm border border-slate-50">
                <div>
                  <div className="flex gap-1 mb-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-lg font-medium leading-relaxed mb-10 italic">"{testimonial.text}"</p>
                </div>
                <div className="flex items-center gap-4 border-t border-slate-50 pt-8 mt-auto">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-green-100 p-1">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900">{testimonial.name}</h5>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto overflow-hidden">
        <div className="relative bg-slate-900 rounded-[4rem] p-12 sm:p-24 text-center text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-600/20 via-transparent to-emerald-600/20" />

          <div className="relative z-10 max-w-3xl mx-auto animate-in zoom-in duration-1000">
            <Globe className="w-20 h-20 text-green-400 mx-auto mb-10 animate-spin-slow" />
            <h2 className="text-4xl sm:text-6xl font-extrabold mb-8 tracking-tight leading-tight">
              Ready to <br /> Explore Authentically?
            </h2>
            <p className="text-slate-400 text-xl leading-relaxed mb-12 max-w-xl mx-auto">
              Join Waaliin Tours today. Unlock exclusive cultural guides, book unique festival journeys, and connect with a community of conscious explorers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/register">
                <Button size="lg" className="h-16 px-14 rounded-full text-xl font-extrabold bg-white text-slate-900 hover:bg-slate-100 shadow-2xl shadow-green-900/40">
                  Register Now
                </Button>
              </Link>
              <Link href="/login" className="text-slate-300 font-bold hover:text-white transition-colors">
                Already a member? Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
