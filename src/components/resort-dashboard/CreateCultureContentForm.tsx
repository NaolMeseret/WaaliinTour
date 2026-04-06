"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tour } from "@/types";

interface CreateCultureContentFormProps {
  hotelTours: Pick<Tour, "id" | "title">[];
}

const categories = ["Language", "Clothing", "Places", "Traditions"] as const;

export default function CreateCultureContentForm({
  hotelTours,
}: CreateCultureContentFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState<(typeof categories)[number]>("Language");
  const [relatedTourId, setRelatedTourId] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!title || !content) {
      setError("Please fill in the title and content fields.");
      setIsSubmitting(false);
      return;
    }

    const response = await fetch("/api/resort-dashboard/culture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        category,
        content,
        related_tour_id: relatedTourId || null,
        image_url: imageUrl || null,
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(
        data?.error ||
          "Unable to create culture content. Please try again later.",
      );
      return;
    }

    router.push("/resort-dashboard/culture-hub");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40 space-y-6"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Content title
          </label>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Example: Sidama Coffee Ceremony Story"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Category
          </label>
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as (typeof categories)[number])
            }
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Related tour
          </label>
          <select
            value={relatedTourId}
            onChange={(event) => setRelatedTourId(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            <option value="">None (general premium content)</option>
            {hotelTours.map((tour) => (
              <option key={tour.id} value={tour.id}>
                {tour.title}
              </option>
            ))}
          </select>
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
          Culture content
        </label>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={6}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          placeholder="Write the premium culture story, language tip, or hotel-specific experience details."
        />
      </div>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Your hotel content will be shown on the resort culture hub and linked
          to selected tours for a premium guest experience.
        </p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving content..." : "Publish culture content"}
        </Button>
      </div>
    </form>
  );
}
