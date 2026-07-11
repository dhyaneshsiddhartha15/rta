"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { galleryImages } from "@/data/gallery";
import { useLanguage } from "@/context/LanguageContext";

const svgBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const chefHatIcon = (
  <svg {...svgBase} className="h-6 w-6">
    <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
    <path d="M6 17h12" />
  </svg>
);

const categoryKeys = ["campus"] as const;
type CategoryKey = (typeof categoryKeys)[number];
type FilterKey = "all" | CategoryKey;

const iconClass = "h-4 w-4";

const filterIcons: Record<FilterKey, ReactNode> = {
  all: (
    <svg {...svgBase} className={iconClass}>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
    </svg>
  ),
  campus: (
    <svg {...svgBase} className={iconClass}>
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4 8 4v14" />
      <path d="M8 9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12H8V9Z" />
    </svg>
  ),
};

export default function GalleryContent() {
  const { t } = useLanguage();
  const [active, setActive] = useState<FilterKey>("all");
  const [showAll, setShowAll] = useState(false);

  const filtered = active === "all" ? galleryImages : galleryImages.filter((i) => i.category === active);
  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-accent">
            <span className="h-px w-8 bg-accent/50" />
            {chefHatIcon}
            <span className="h-px w-8 bg-accent/50" />
          </div>
          <span className="mt-3 block text-sm font-semibold uppercase tracking-wider text-accent">
            {t.gallery.badge}
          </span>
          <h1 className="section-heading mt-1 text-4xl font-bold text-white sm:text-5xl">{t.gallery.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{t.gallery.subtitle}</p>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {(["all", ...categoryKeys] as FilterKey[]).map((key) => {
              const isActive = active === key;
              const label = key === "all" ? t.gallery.allPhotos : t.gallery.categories[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActive(key);
                    setShowAll(false);
                  }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-accent text-primary-dark shadow"
                      : "bg-white text-primary shadow-sm hover:bg-accent/10"
                  }`}
                >
                  {filterIcons[key]}
                  {label}
                </button>
              );
            })}
          </div>

          {/* Gallery grid */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md"
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
              </div>
            ))}
          </div>

          {filtered.length > visible.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 rounded-full border border-accent px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-primary-dark"
              >
                <svg {...svgBase} className="h-4 w-4">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
                </svg>
                View More Photos
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
