"use client";

import { useState } from "react";
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
  Gift,
  Sparkles,
  Star,
  Phone,
  X,
  Home,
  ChevronRight,
  Heart,
  Wifi,
  Coffee,
  Bath,
  Car,
  Utensils,
  Wind,
  Tv,
  Dumbbell,
  Waves,
  Wine,
  Camera,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Resort Detail Modal Component with integrated booking sidebar
function ResortDetailModal({
  resort,
  tour,
  isOpen,
  onClose,
}: {
  resort: any;
  tour: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<any>(
    resort?.roomTypes?.[0] || null,
  );

  if (!isOpen) return null;

  if (!tour) {
    return null;
  }

  const formattedDate = tour.date
    ? new Date(tour.date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Date TBA";

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto" onClick={onClose}>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div
          className="relative bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-white z-10 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Bed className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {resort?.name || "Resort"}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{resort?.rating}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{resort?.priceRange}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{resort?.distance}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Column - Resort Details */}
            <div className="lg:col-span-2 p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Image Gallery */}
              <div className="space-y-3">
                <div className="relative h-80 rounded-2xl overflow-hidden group">
                  <Image
                    src={
                      resort?.gallery?.[selectedImage] ||
                      resort?.image ||
                      "/placeholder.jpg"
                    }
                    alt={resort?.name || "Resort"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {resort?.gallery && resort.gallery.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {resort.gallery.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          selectedImage === idx
                            ? "border-amber-500 shadow-lg"
                            : "border-transparent hover:border-amber-300"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Gallery ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Resort Description */}
              <div>
                <h3 className="font-bold text-slate-800 mb-2 text-lg">
                  About {resort?.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {resort?.description ||
                    "Luxury accommodation with exceptional service."}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> Check-in:{" "}
                    {resort?.checkIn || "2:00 PM"}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> Check-out:{" "}
                    {resort?.checkOut || "12:00 PM"}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full">
                    <MapPin className="w-3 h-3" /> {resort?.distance}
                  </span>
                </div>
              </div>

              {/* Room Types */}
              {resort?.roomTypes && resort.roomTypes.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Home className="w-5 h-5 text-amber-600" />
                    Available Room Types
                  </h3>
                  <div className="space-y-3">
                    {resort.roomTypes.map((room: any, idx: number) => (
                      <div
                        key={idx}
                        className={`border rounded-2xl p-4 transition-all cursor-pointer hover:shadow-md ${
                          selectedRoom?.name === room.name
                            ? "border-amber-500 bg-gradient-to-r from-amber-50/50 to-orange-50/50"
                            : "border-slate-200 hover:border-amber-300"
                        }`}
                        onClick={() => setSelectedRoom(room)}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <h4 className="font-bold text-slate-800">
                                {room.name}
                              </h4>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                {room.available} left
                              </span>
                              {selectedRoom?.name === room.name && (
                                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                  ✓ Selected
                                </span>
                              )}
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-500 mb-3">
                              <span>📏 {room.size}</span>
                              <span>🛏️ {room.beds}</span>
                              <span>👥 {room.capacity}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {room.amenities
                                .slice(0, 5)
                                .map((amenity: string, i: number) => (
                                  <span
                                    key={i}
                                    className="text-xs bg-slate-50 text-slate-600 px-2 py-0.5 rounded-full"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                              {room.amenities.length > 5 && (
                                <span className="text-xs text-slate-400">
                                  +{room.amenities.length - 5} more
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="mb-2">
                              <span className="text-2xl font-bold text-amber-600">
                                ${room.price}
                              </span>
                              {room.originalPrice && (
                                <span className="text-xs text-slate-400 line-through ml-1">
                                  ${room.originalPrice}
                                </span>
                              )}
                              <span className="text-xs text-slate-500">
                                /night
                              </span>
                            </div>
                            {room.originalPrice && (
                              <p className="text-xs text-green-600">
                                Save ${room.originalPrice - room.price}!
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {resort?.amenities && resort.amenities.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-800 mb-3">
                    Hotel Amenities
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {resort.amenities.map((amenity: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-xl"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Hospitality Package */}
              {/* {resort?.hospitalityPackage && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200">
                  <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    {resort.hospitalityPackage.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {resort.hospitalityPackage.includes.map(
                      (item: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-amber-700"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>{item}</span>
                        </div>
                      ),
                    )}
                  </div>
                  {resort.hospitalityPackage.specialOffer && (
                    <div className="bg-white/70 rounded-xl p-3 mt-2">
                      <Heart className="w-4 h-4 text-red-500 inline mr-2" />
                      <span className="text-sm font-semibold text-amber-800">
                        {resort.hospitalityPackage.specialOffer}
                      </span>
                    </div>
                  )}
                </div>
              )} */}
              {/* Event Hospitality Package */}
              {resort?.hospitalityPackage && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200">
                  <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                    <span className="text-2xl">
                      {resort.hospitalityPackage.icon || "🎁"}
                    </span>
                    {resort.hospitalityPackage.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {resort.hospitalityPackage.includes.map(
                      (item: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-amber-700"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>{item}</span>
                        </div>
                      ),
                    )}
                  </div>
                  {resort.hospitalityPackage.specialOffer && (
                    <div className="bg-white/70 rounded-xl p-3 mt-2">
                      <Heart className="w-4 h-4 text-red-500 inline mr-2" />
                      <span className="text-sm font-semibold text-amber-800">
                        {resort.hospitalityPackage.specialOffer}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Contact Info */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button className="bg-green-600 hover:bg-green-700 rounded-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call {resort?.contact || "Resort"}
                </Button>
                {resort?.email && (
                  <Button variant="outline" className="rounded-full">
                    📧 Email Resort
                  </Button>
                )}
              </div>

              {/* Cancellation Policy */}
              {resort?.cancellation && (
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500">
                    🔔 {resort.cancellation}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Booking Sidebar */}
            <div className="lg:col-span-1 bg-gradient-to-b from-slate-50 to-white border-l border-slate-200 p-6 space-y-6">
              {/* Tour Booking Card */}
              <Card className="rounded-2xl shadow-xl border-none overflow-hidden sticky top-6">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5 text-center text-white">
                  <p className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-1">
                    Tour Price Per Person
                  </p>
                  <div className="text-4xl font-extrabold flex items-center justify-center">
                    <span className="text-xl font-medium text-slate-400 mr-1">
                      $
                    </span>
                    {tour?.price || "N/A"}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Full cultural experience
                  </p>
                </div>
                <CardContent className="p-5 bg-white">
                  <div className="space-y-4 mb-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Event Date
                      </span>
                      <span className="text-slate-900 font-bold text-xs">
                        {formattedDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2 border-t border-slate-50">
                      <span className="text-slate-500 font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Duration
                      </span>
                      <span className="text-slate-900 font-bold">
                        Full Day Experience
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2 border-t border-slate-50">
                      <span className="text-slate-500 font-medium flex items-center gap-2">
                        <Users className="w-4 h-4" /> Group size
                      </span>
                      <span className="text-slate-900 font-bold">
                        Max 15 people
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2 border-t border-slate-50">
                      <span className="text-slate-500 font-medium flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Language
                      </span>
                      <span className="text-slate-900 font-bold">
                        English / Amharic
                      </span>
                    </div>
                  </div>

                  {/* Selected Room Summary */}
                  {selectedRoom && (
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 mb-5 border border-amber-200">
                      <p className="text-xs font-semibold text-amber-800 mb-2 flex items-center gap-1">
                        <Home className="w-3 h-3" />
                        Selected Accommodation
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">
                            {selectedRoom.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {selectedRoom.beds} · {selectedRoom.size}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-amber-600">
                            ${selectedRoom.price}
                          </p>
                          <p className="text-[10px] text-slate-400">/night</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Combined Booking CTA */}
                  <Link
                    href={`/tours/${tour?.id}/checkout?resort=${resort?.id}&room=${selectedRoom?.name || ""}`}
                  >
                    <Button className="w-full h-14 rounded-xl text-base font-bold shadow-lg shadow-green-200 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      Book Tour + Accommodation
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>

                  <p className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Instant Confirmation
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 text-center">
                      Or book separately:{" "}
                      <Link
                        href={`/tours/${tour?.id}/checkout`}
                        className="text-green-600 underline hover:text-green-700"
                      >
                        Tour only
                      </Link>
                      {" · "}
                      <button
                        className="text-amber-600 underline hover:text-amber-700"
                        onClick={() =>
                          (window.location.href = `tel:${resort?.contact}`)
                        }
                      >
                        Room only
                      </button>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Price Summary */}
              {selectedRoom && tour?.price && (
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-4 text-white">
                  <p className="text-xs text-slate-300 mb-2">Total Estimate</p>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm">Tour + {selectedRoom.name}</span>
                    <span className="text-xl font-bold">
                      ${tour.price + selectedRoom.price}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    per person + accommodation
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-700">
                    <p className="text-[10px] text-green-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Save 10% when booking together!
                    </p>
                  </div>
                </div>
              )}

              {/* Expert Tip */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center text-white text-sm">
                    💡
                  </div>
                  <h4 className="text-green-900 font-bold text-sm">
                    Expert Tip
                  </h4>
                </div>
                <p className="text-green-700/80 text-xs leading-relaxed">
                  Book your tour + accommodation together to save 10% and
                  guarantee your spot!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Resorts Section Component - 3 Column Grid
export function ResortsSection({
  resorts,
  tour,
}: {
  resorts: any[];
  tour: any;
}) {
  const [selectedResort, setSelectedResort] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (resort: any) => {
    setSelectedResort(resort);
    setIsModalOpen(true);
  };

  if (!tour) {
    return null;
  }

  // Get icon based on amenity
  const getAmenityIcon = (amenity: string) => {
    const icons: Record<string, any> = {
      "Free WiFi": <Wifi className="w-3 h-3" />,
      Pool: <Waves className="w-3 h-3" />,
      Restaurant: <Utensils className="w-3 h-3" />,
      Spa: <Heart className="w-3 h-3" />,
      "Fitness Center": <Dumbbell className="w-3 h-3" />,
      "Room Service": <Coffee className="w-3 h-3" />,
      Parking: <Car className="w-3 h-3" />,
      "Air Conditioning": <Wind className="w-3 h-3" />,
      "Flat Screen TV": <Tv className="w-3 h-3" />,
      "Mini Bar": <Wine className="w-3 h-3" />,
    };
    return icons[amenity] || <CheckCircle2 className="w-3 h-3" />;
  };

  return (
    <>
      <section className="space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-amber-300" />
            <Bed className="w-5 h-5 text-amber-500" />
            <div className="w-12 h-px bg-amber-300" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">
            Where to Stay — Special Hospitality Packages
          </h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            These resorts are offering exclusive packages for{" "}
            <span className="font-semibold text-amber-600">
              {tour.title || "this event"}
            </span>
            . Click "View Details" to see room types, prices, and book your
            complete experience.
          </p>
        </div>

        {/* 3-Column Grid for Resorts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resorts &&
            resorts.map((resort) => (
              <Card
                key={resort.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl"
              >
                {/* Resort Image with Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={resort.image}
                    alt={resort.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-800">
                      {resort.rating}
                    </span>
                  </div>

                  {/* Price Range Badge */}
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-xs font-bold text-white">
                      {resort.priceRange}
                    </span>
                  </div>

                  {/* Distance Badge */}
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-[10px] font-medium text-white flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {resort.distance}
                    </span>
                  </div>
                </div>

                {/* Resort Details */}
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1">
                      {resort.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {resort.description}
                    </p>
                  </div>

                  {/* Quick Price Info */}
                  {resort.roomTypes && resort.roomTypes.length > 0 && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                      <p className="text-xs text-amber-600 font-semibold mb-1">
                        Starting from
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-amber-600">
                          $
                          {Math.min(
                            ...resort.roomTypes.map((r: any) => r.price),
                          )}
                        </span>
                        <span className="text-xs text-slate-500">/night</span>
                        <span className="text-xs text-slate-400 ml-2">
                          {resort.roomTypes.length} room types
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Key Amenities Preview */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {resort.amenities
                      .slice(0, 4)
                      .map((amenity: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-slate-50 text-slate-600 px-2 py-1 rounded-full flex items-center gap-1"
                        >
                          {getAmenityIcon(amenity)}
                          {amenity}
                        </span>
                      ))}
                    {resort.amenities.length > 4 && (
                      <span className="text-[10px] text-slate-400">
                        +{resort.amenities.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Hospitality Package Preview */}
                  {resort.hospitalityPackage && (
                    <div className="mb-4 p-2 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Gift className="w-3 h-3 text-amber-600" />
                        <h4 className="font-bold text-amber-800 text-[10px] uppercase tracking-wide">
                          {resort.hospitalityPackage.title}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {resort.hospitalityPackage.includes
                          .slice(0, 2)
                          .map((item: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-[9px] bg-white text-amber-700 px-1.5 py-0.5 rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                        {resort.hospitalityPackage.includes.length > 2 && (
                          <span className="text-[9px] text-slate-400">
                            +{resort.hospitalityPackage.includes.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-xl text-sm font-semibold shadow-md"
                      onClick={() => handleViewDetails(resort)}
                    >
                      <Star className="w-3.5 h-3.5 mr-1" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl border-amber-200 text-amber-700 hover:bg-amber-50"
                      onClick={() =>
                        (window.location.href = `tel:${resort.contact}`)
                      }
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </div>

        {/* Help Note */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100 mt-6">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <span className="font-semibold text-blue-800">Pro Tip:</span>
            </div>
            <p className="text-sm text-blue-700">
              Mention you&apos;re attending "{tour.title || "this event"}" when
              booking to unlock exclusive hospitality packages and get 10% off!
            </p>
          </div>
        </div>
      </section>

      {/* Resort Detail Modal */}
      {selectedResort && (
        <ResortDetailModal
          resort={selectedResort}
          tour={tour}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
