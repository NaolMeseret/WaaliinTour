"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateTourForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [requirements, setRequirements] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!title || !location || !date || !price || !description) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    const tourPayload = {
      title,
      location,
      date,
      price: Number(price),
      requirements: requirements
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      description,
      image_url: imageUrl || null,
    };

    const response = await fetch("/api/resort-dashboard/tours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tourPayload),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Unable to create tour. Please try again later.");
      return;
    }

    router.push("/resort-dashboard/tours");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40 space-y-6"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Tour title
          </label>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Example: Sidama New Year Festival Tour"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Location
          </label>
          <Input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Example: Hawassa, Ethiopia"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Tour date
          </label>
          <Input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Price (USD)
          </label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="150"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Image URL
          </label>
          <Input
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="Optional image URL"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-800">
          Description
        </label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={5}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          placeholder="Write a short overview of the tour experience."
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-800">
          Requirements
        </label>
        <Input
          value={requirements}
          onChange={(event) => setRequirements(event.target.value)}
          placeholder="List items separated by commas"
        />
        <p className="text-xs text-slate-500">
          Example: Comfortable shoes, water bottle, camera
        </p>
      </div>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Once created, this tour will be available only under your hotel
          dashboard and linked culture hub content.
        </p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Publishing tour..." : "Publish Hotel Tour"}
        </Button>
      </div>
    </form>
  );
}
