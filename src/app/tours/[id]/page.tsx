import { getTourById } from "@/services/tours";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Users,
  Globe,
  Bed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ResortsSection } from "./ResortSection";

interface TourDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: TourDetailPageProps) {
  const tour = await getTourById(params.id);
  return {
    title: tour ? `${tour.title} — Waaliin Tours` : "Tour Not Found",
    description:
      tour?.description?.substring(0, 160) ||
      "Explore immersive cultural group tours.",
  };
}

// Dynamic resort data based on event type
const getResortsForEvent = (eventId: string, eventTitle?: string) => {
  // Detect event type from title
  const eventTitleLower = eventTitle?.toLowerCase() || "";
  const isIrreecha = eventTitleLower.includes("irreecha");
  const isMeskel = eventTitleLower.includes("meskel");
  const isTimkat = eventTitleLower.includes("timkat");
  const isEnkutatash =
    eventTitleLower.includes("enkutatash") ||
    eventTitleLower.includes("new year");
  const isGenna =
    eventTitleLower.includes("genna") || eventTitleLower.includes("christmas");

  // Base resort data
  const baseResorts = [
    {
      id: 1,
      name: "Ethiopian Skylight Hotel",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      ],
      rating: 4.8,
      priceRange: "$$$",
      distance: "2.5 km from event",
      description:
        "Luxury hotel offering authentic Ethiopian hospitality with modern amenities, located near Bole International Airport.",
      roomTypes: [
        {
          name: "Standard Room",
          price: 120,
          originalPrice: 150,
          size: "32 m²",
          beds: "1 King or 2 Twin",
          capacity: "2 Adults",
          amenities: [
            "City View",
            "Free WiFi",
            "Air Conditioning",
            "Mini Bar",
            "Flat Screen TV",
            "Work Desk",
          ],
          available: 8,
        },
        {
          name: "Deluxe Room",
          price: 180,
          originalPrice: 220,
          size: "45 m²",
          beds: "1 King Bed",
          capacity: "2 Adults + 1 Child",
          amenities: [
            "Pool View",
            "Free WiFi",
            "Coffee Machine",
            "Bath Tub",
            "Balcony",
            "Welcome Drink",
          ],
          available: 5,
        },
        {
          name: "Executive Suite",
          price: 280,
          originalPrice: 350,
          size: "75 m²",
          beds: "1 King Bed + Living Area",
          capacity: "3 Adults",
          amenities: [
            "City View",
            "Free WiFi",
            "Separate Living Room",
            "Kitchenette",
            "Jacuzzi",
            "Butler Service",
          ],
          available: 3,
        },
      ],
      amenities: [
        "Free WiFi",
        "Spa",
        "Pool",
        "Restaurant",
        "Parking",
        "24/7 Concierge",
        "Fitness Center",
        "Business Center",
        "Airport Shuttle",
        "Room Service",
      ],
      contact: "+251-911-234567",
      email: "reservations@skylight.com",
      website: "www.skylighthotel.com",
      checkIn: "2:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 48 hours before check-in",
    },
    {
      id: 2,
      name: "Hyatt Regency Addis",
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      ],
      rating: 4.9,
      priceRange: "$$$$",
      distance: "1.2 km from event",
      description:
        "5-star luxury hotel featuring world-class amenities, fine dining restaurants, and spectacular views of Addis Ababa.",
      roomTypes: [
        {
          name: "Guest Room",
          price: 220,
          originalPrice: 280,
          size: "38 m²",
          beds: "1 King or 2 Queen",
          capacity: "2 Adults",
          amenities: [
            "City View",
            "Free WiFi",
            "Rain Shower",
            '55" TV',
            "Mini Bar",
            "Coffee/Tea Maker",
          ],
          available: 12,
        },
        {
          name: "Club Room",
          price: 320,
          originalPrice: 400,
          size: "52 m²",
          beds: "1 King Bed",
          capacity: "2 Adults",
          amenities: [
            "Club Lounge Access",
            "Free Breakfast",
            "Evening Cocktails",
            "Butler Service",
            "Premium Toiletries",
          ],
          available: 6,
        },
        {
          name: "Presidential Suite",
          price: 550,
          originalPrice: 700,
          size: "120 m²",
          beds: "2 King Beds",
          capacity: "4 Adults",
          amenities: [
            "Panoramic View",
            "Private Terrace",
            "Dining Area",
            "Kitchen",
            "Steam Room",
            "Private Elevator",
          ],
          available: 2,
        },
      ],
      amenities: [
        "Free WiFi",
        "Spa",
        "Infinity Pool",
        "Fine Dining",
        "Butler Service",
        "Valet Parking",
        "Rooftop Bar",
        "Concierge",
        "Limousine Service",
        "Fitness Center",
      ],
      contact: "+251-911-876543",
      email: "addis.regency@hyatt.com",
      website: "www.hyattregencyaddis.com",
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 72 hours before check-in",
    },
    {
      id: 3,
      name: "Marriott Executive Apartments",
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800",
        "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=800",
      ],
      rating: 4.7,
      priceRange: "$$",
      distance: "3.8 km from event",
      description:
        "Modern serviced apartments perfect for families and groups, offering home-like comfort with hotel amenities.",
      roomTypes: [
        {
          name: "Studio Apartment",
          price: 95,
          originalPrice: 120,
          size: "45 m²",
          beds: "1 Queen Bed",
          capacity: "2 Adults",
          amenities: [
            "Kitchenette",
            "Free WiFi",
            "Washer/Dryer",
            "Smart TV",
            "Work Space",
            "Weekly Housekeeping",
          ],
          available: 10,
        },
        {
          name: "1-Bedroom Apartment",
          price: 140,
          originalPrice: 180,
          size: "70 m²",
          beds: "1 King Bed + Sofa Bed",
          capacity: "3 Adults",
          amenities: [
            "Full Kitchen",
            "Living Room",
            "Dining Area",
            "Balcony",
            "Two Bathrooms",
            "Free Parking",
          ],
          available: 7,
        },
        {
          name: "2-Bedroom Apartment",
          price: 210,
          originalPrice: 260,
          size: "110 m²",
          beds: "2 King Beds",
          capacity: "5 Adults",
          amenities: [
            "Full Kitchen",
            "Large Living Room",
            "Two Balconies",
            "Washer/Dryer",
            "Dishwasher",
            "Premium TV Package",
          ],
          available: 4,
        },
      ],
      amenities: [
        "Free WiFi",
        "Fitness Center",
        "Kitchenette",
        "Laundry",
        "Meeting Rooms",
        "Restaurant",
        "Playground",
        "Business Center",
        "Convenience Store",
        "24/7 Security",
      ],
      contact: "+251-911-987654",
      email: "reservations@marriottaddis.com",
      website: "www.marriott.com/addis",
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 24 hours before check-in",
    },
  ];

  // Dynamic packages based on event type
  if (isIrreecha) {
    return baseResorts.map((resort) => ({
      ...resort,
      hospitalityPackage: {
        title: "🌿 Irreecha Festival - Oromo Thanksgiving Celebration",
        icon: "🌿",
        includes: [
          "🌅 Sunrise blessing ceremony at Lake Hora (Arsedi)",
          "🥘 Authentic Oromo cuisine: Basso, Marqa, Chechebsa, and Dokona",
          "🎵 Live traditional Oromo music & cultural performances (Qeerroo & Qarree)",
          "👘 Traditional Oromo attire rental (Waaqeffata outfit)",
          "📿 Guided cultural tour explaining Irreecha's significance",
          "🚌 Private shuttle to Bishoftu (Lake Hora)",
          "🌿 Traditional grass & flower arrangement workshop",
          "🍵 Post-ceremony coffee ceremony with Oromo storytelling",
          "📸 Professional photographer capturing your Irreecha experience",
          "🎁 Traditional Oromo gift basket (Qerensa, cultural items)",
          "🕯️ Evening cultural storytelling around bonfire",
        ],
        specialOffer:
          "Book before festival week and get 25% off + complimentary traditional Oromo coffee ceremony set!",
      },
    }));
  }

  if (isMeskel) {
    return baseResorts.map((resort) => ({
      ...resort,
      hospitalityPackage: {
        title: "🔥 Meskel Festival - Demera Celebration Package",
        icon: "🔥",
        includes: [
          "🕯️ VIP viewing area for the Demera bonfire lighting ceremony",
          "🌸 Traditional Meskel flower (Adey Abeba) bouquet & crown",
          "⛪ Early morning access to Meskel Square",
          "🍽️ Special festival dinner with traditional dishes (Doro Wat, Kitfo, Gomen)",
          "🎶 Live Azmari music & traditional dancing (Eskista)",
          "👗 Traditional Ethiopian attire rental (Habesha Kemis with Meskel embroidery)",
          "📿 Guided explanation of Meskel history & religious significance",
          "🚗 Private transfer to/from Meskel Square",
          "🔥 Commemorative Meskel cross necklace",
          "🍷 Wine tasting of Ethiopian varietals (Tej & Tella)",
          "🕯️ Candle-making workshop with traditional patterns",
        ],
        specialOffer:
          "Book 2 nights and receive a free traditional coffee ceremony experience + 15% off!",
      },
    }));
  }

  if (isTimkat) {
    return baseResorts.map((resort) => ({
      ...resort,
      hospitalityPackage: {
        title: "💧 Timkat - Ethiopian Epiphany VIP Package",
        icon: "💧",
        includes: [
          "⛪ Reserved seating at the Tabot procession",
          "👘 Traditional white ceremonial shamma rental with Timkat embroidery",
          "🌊 Holy water blessing ceremony participation",
          "🍛 Traditional fasting food experience (Yekik, Shiro, Selata, Bula)",
          "🎺 Front row access to Ark of Covenant procession",
          "📿 Guided spiritual journey with a local priest",
          "🎨 Traditional cross painting workshop",
          "🚐 Private transport to multiple ceremony locations",
          "📖 Commemorative Timkat prayer book in Amharic",
          "☕ Post-festival traditional breakfast (Firfir, Chechebsa)",
          "💧 Blessed water bottle from the ceremony",
        ],
        specialOffer:
          "Book 3 nights and get a complimentary guided church tour + 20% off your stay!",
      },
    }));
  }

  if (isEnkutatash) {
    return baseResorts.map((resort) => ({
      ...resort,
      hospitalityPackage: {
        title: "🌼 Enkutatash - Ethiopian New Year Celebration",
        icon: "🌼",
        includes: [
          "🎉 New Year's Eve Gala Dinner with champagne & fireworks",
          "💐 Traditional Enkutatash flower bouquet (Adey Abeba & Meskel Dama)",
          "🥂 Midnight toast with Ethiopian honey wine (Tej)",
          "🍲 Special New Year's Day breakfast buffet (Genfo, Chechebsa)",
          "🎵 Live traditional music & cultural performances",
          "📜 Traditional New Year blessings from elders",
          "🎨 Traditional art & craft workshop (Mesob making)",
          "👗 Traditional Ethiopian attire fashion show",
          "🎆 Rooftop fireworks viewing party",
          "🎁 Ethiopian New Year gift exchange (Habesha Kemis)",
          "📅 Ethiopian calendar & history lesson",
        ],
        specialOffer:
          "Celebrate with us and get a complimentary spa treatment + 30% off group bookings!",
      },
    }));
  }

  if (isGenna) {
    return baseResorts.map((resort) => ({
      ...resort,
      hospitalityPackage: {
        title: "⭐ Genna - Ethiopian Orthodox Christmas Package",
        icon: "⭐",
        includes: [
          "⛪ Midnight mass attendance with traditional candles & hymn book",
          "🍲 Traditional Genna feast (Doro Wat, homemade cheese, fresh injera, Defo Dabo)",
          "🎄 Special Christmas tree lighting ceremony with Ethiopian decorations",
          "🎁 Traditional Ethiopian Christmas gift exchange (Wraps, honey)",
          "☕ 12-hour coffee ceremony experience (Bunna Qalle)",
          "🎵 Church choir performance & ancient hymns (Zema)",
          "🍪 Traditional holiday cookies & sweets (Dabo, Ambasha)",
          "🧣 Handmade traditional scarf (Netela) gift",
          "🕯️ Candlelight dinner on Christmas Eve",
          "🚗 Transport to local churches (Lalibela, Axum)",
          "📖 Genna (Yelidet Be'al) cultural booklet",
        ],
        specialOffer:
          "Book early and receive a complimentary traditional Ethiopian blanket + 20% off!",
      },
    }));
  }

  // Default cultural package for other events
  return baseResorts.map((resort) => ({
    ...resort,
    hospitalityPackage: {
      title: "🎭 Ethiopian Cultural Immersion Package",
      icon: "🎭",
      includes: [
        "☕ Traditional Ethiopian coffee ceremony (Bunna Qalle)",
        "🍽️ Authentic Ethiopian dinner (Doro Wat, Tibs, Kitfo, Vegetarian combo)",
        "🎵 Live Ethiopian music & cultural dance performance (Eskista)",
        "👘 Traditional Habesha dress rental for event",
        "📿 Cultural guide explaining Ethiopian traditions & customs",
        "🚌 Private shuttle to/from event venue",
        "🎨 Hands-on cultural workshop (cooking, coffee, or dance)",
        "📸 Professional photography session in traditional attire",
        "🛍️ Local artisan market visit with guide",
        "🌿 Traditional herb & spice experience (Berbere, Mitmita)",
        "🎁 Ethiopian souvenir gift bag",
      ],
      specialOffer:
        "Book 2+ nights and receive a complimentary coffee ceremony kit + 15% off your total stay!",
    },
  }));
};

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const tour = await getTourById(params.id);
  const resorts = getResortsForEvent(params.id, tour?.title);

  if (!tour) {
    notFound();
  }

  const formattedDate = new Date(tour.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-slate-50/30 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[60vh] w-full overflow-hidden">
        {tour.image_url ? (
          <Image
            src={tour.image_url}
            alt={tour.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-slate-700 to-slate-900 flex items-center justify-center text-slate-400">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-10 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 bg-green-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              CULTURAL GROUP TOUR
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
              {tour.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-400" />
                {tour.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-400" />
                {formattedDate}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Col — Details */}
        <div className="lg:col-span-4 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-green-600 rounded-full" />
              Tour Overview
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
              {tour.description}
            </p>
          </section>

          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              What to Expect
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Authentic Experience",
                  desc: "Visit hidden spots away from typical tourist crowds.",
                },
                {
                  title: "Local Guides",
                  desc: "Led by residents with deep cultural knowledge.",
                },
                {
                  title: "Safety First",
                  desc: "Comprehensive health and safety protocols included.",
                },
                {
                  title: "Personalized Content",
                  desc: "Access unique cultural education on your dashboard.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Resorts Section - Client Component */}
          <ResortsSection resorts={resorts} tour={tour} />

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Requirements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.isArray(tour.requirements) &&
                tour.requirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-slate-700 font-medium text-sm">
                      {req}
                    </span>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
