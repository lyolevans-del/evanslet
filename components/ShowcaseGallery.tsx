'use client';

import { useMemo, useState } from 'react';
import { ExternalLink, MapPin, X } from 'lucide-react';
import type { ShowcaseItem, ShowcaseCategory } from '@/lib/showcase';
import {
  categoryIcon,
  gradientFor,
} from '@/lib/showcase-ui';

const filters: ('All' | ShowcaseCategory)[] = [
  'All',
  'Video',
  'Artwork',
  'Photography',
  'Music',
  'Fashion',
  'Advertising',
  'Creative Project',
  'Other',
];

export function ShowcaseGallery({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState<'All' | ShowcaseCategory>('All');
  const [selected, setSelected] = useState<ShowcaseItem | null>(null);

  const visible = useMemo(
    () =>
      active === 'All'
        ? items
        : items.filter((item) => item.category === active),
    [items, active]
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2.5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              active === f
                ? 'bg-gold text-espresso shadow-md shadow-gold/20'
                : 'border border-border bg-card text-cream/70 hover:border-gold/50 hover:text-cream'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-cream/50">
          No pieces in this category yet. Be the first to share.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => {
            const Icon = categoryIcon[item.category];
            return (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/5"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {/* Cover */}
                <div
                  className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${gradientFor(
                    item.cover_color
                  )}`}
                >
                  <div className="absolute inset-0 grain opacity-40" />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-espresso/70 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-espresso/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream/90 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold leading-snug text-cream transition-colors group-hover:text-gold-soft">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-cream/55">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 font-display text-xs font-bold uppercase text-gold">
                        {item.creator_name.charAt(0)}
                      </span>
                      <div className="leading-tight">
                        <p className="text-sm font-medium text-cream/85">
                          {item.creator_name}
                        </p>
                        {item.creator_handle && (
                          <p className="text-xs text-cream/45">
                            @{item.creator_handle}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-cream/40">
                      <MapPin className="h-3 w-3" />
                      {item.country}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <ShowcaseModal item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function ShowcaseModal({
  item,
  onClose,
}: {
  item: ShowcaseItem;
  onClose: () => void;
}) {
  const Icon = categoryIcon[item.category];
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gold/25 bg-bark shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-espresso/70 text-cream/80 backdrop-blur-sm transition-colors hover:bg-espresso hover:text-cream"
        >
          <X className="h-4 w-4" />
        </button>

        <div
          className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${gradientFor(
            item.cover_color
          )}`}
        >
          <div className="absolute inset-0 grain opacity-40" />
          <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-espresso/70 backdrop-blur-sm">
            <Icon className="h-6 w-6 text-gold" />
          </div>
          <span className="absolute right-16 top-5 rounded-full bg-espresso/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-cream/90 backdrop-blur-sm">
            {item.category}
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="font-display text-2xl font-semibold leading-tight text-cream sm:text-3xl">
            {item.title}
          </h3>
          <p className="mt-5 text-base leading-relaxed text-cream/70">
            {item.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 font-display text-sm font-bold uppercase text-gold">
                {item.creator_name.charAt(0)}
              </span>
              <div className="leading-tight">
                <p className="font-display font-semibold text-cream">
                  {item.creator_name}
                </p>
                <p className="text-sm text-cream/50">
                  {item.creator_handle
                    ? `@${item.creator_handle}`
                    : item.country}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-sm text-cream/45">
              <MapPin className="h-3.5 w-3.5" />
              {item.country}
            </span>
          </div>

          {item.media_url && (
            <a
              href={item.media_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-espresso transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft"
            >
              View the work
              <ExternalLink className="h-4 w-4" />
            </a>
          )}

          <p className="mt-6 text-xs leading-relaxed text-cream/35">
            This piece was submitted by {item.creator_name} and shared with
            their consent. The creator retains full ownership of their work.
          </p>
        </div>
      </div>
    </div>
  );
}
