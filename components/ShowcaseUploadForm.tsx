'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SHOWCASE_CATEGORIES, type ShowcaseCategory } from '@/lib/showcase';

const inputClass =
  'w-full rounded-xl border border-input bg-bark px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold';

const coverColors = [
  { value: 'amber', label: 'Amber' },
  { value: 'rose', label: 'Rose' },
  { value: 'teal', label: 'Teal' },
  { value: 'clay', label: 'Clay' },
  { value: 'gold', label: 'Gold' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'copper', label: 'Copper' },
  { value: 'plum', label: 'Plum' },
];

async function getClientHash(): Promise<string> {
  const KEY = 'rooted_client_id';
  let clientId = typeof window !== 'undefined' ? localStorage.getItem(KEY) : null;
  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem(KEY, clientId);
  }
  const data = new TextEncoder().encode(clientId);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

type State = 'idle' | 'loading' | 'done' | 'error';

export function ShowcaseUploadForm() {
  const [values, setValues] = useState({
    creator_name: '',
    creator_handle: '',
    email: '',
    country: '',
    category: '' as ShowcaseCategory | '',
    title: '',
    description: '',
    media_url: '',
    cover_color: 'gold',
  });
  const [consent, setConsent] = useState(false);
  const [ownConfirm, setOwnConfirm] = useState(false);
  const [state, setState] = useState<State>('idle');

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent || !ownConfirm) return;
    if (!values.category) return;
    setState('loading');
    try {
      const ipHash = await getClientHash();
      const { error } = await supabase.rpc('submit_showcase_submission', {
        p_creator_name: values.creator_name.trim(),
        p_creator_handle: values.creator_handle.trim() || null,
        p_email: values.email.trim().toLowerCase(),
        p_country: values.country.trim(),
        p_category: values.category,
        p_title: values.title.trim(),
        p_description: values.description.trim(),
        p_media_url: values.media_url.trim() || null,
        p_cover_color: values.cover_color,
        p_consent: consent,
        p_ip_hash: ipHash,
      });
      if (error) throw error;
      setState('done');
    } catch (cause) {
      console.error('showcase submission failed', cause);
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-gold/40 bg-gold/5 px-8 py-14 text-center">
        <CheckCircle2 className="h-12 w-12 text-gold" />
        <h3 className="mt-5 font-display text-2xl font-semibold text-cream">
          Thank you — your work is in for review.
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/65">
          The ROOTED team reviews every submission to keep the showcase a safe,
          respectful space. If your piece is approved, it will appear in the
          public gallery with your name. Keep creating.
        </p>
        <button
          onClick={() => {
            setState('idle');
            setValues({
              creator_name: '',
              creator_handle: '',
              email: '',
              country: '',
              category: '',
              title: '',
              description: '',
              media_url: '',
              cover_color: 'gold',
            });
            setConsent(false);
            setOwnConfirm(false);
          }}
          className="mt-6 rounded-full border border-gold/50 px-6 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
        >
          Submit another piece
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="mb-2 block text-sm font-medium text-cream/80">
            Your name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            required
            maxLength={200}
            placeholder="How should you be credited?"
            value={values.creator_name}
            onChange={(e) => set('creator_name', e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-2 block text-sm font-medium text-cream/80">
            Handle (optional)
          </label>
          <input
            type="text"
            maxLength={60}
            placeholder="@yourhandle"
            value={values.creator_handle}
            onChange={(e) => set('creator_handle', e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-2 block text-sm font-medium text-cream/80">
            Email <span className="text-gold">*</span>
          </label>
          <input
            type="email"
            required
            maxLength={254}
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-2 block text-sm font-medium text-cream/80">
            Country <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            required
            maxLength={100}
            placeholder="Where are you based?"
            value={values.country}
            onChange={(e) => set('country', e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-2 block text-sm font-medium text-cream/80">
            Category <span className="text-gold">*</span>
          </label>
          <select
            required
            value={values.category}
            onChange={(e) => set('category', e.target.value as ShowcaseCategory)}
            className={inputClass}
          >
            <option value="">Choose the closest match…</option>
            {SHOWCASE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-1">
          <label className="mb-2 block text-sm font-medium text-cream/80">
            Cover colour
          </label>
          <select
            value={values.cover_color}
            onChange={(e) => set('cover_color', e.target.value)}
            className={inputClass}
          >
            {coverColors.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-cream/80">
            Title of your work <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            required
            maxLength={200}
            placeholder="Give your piece a name"
            value={values.title}
            onChange={(e) => set('title', e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-cream/80">
            Description <span className="text-gold">*</span>
          </label>
          <textarea
            rows={5}
            required
            maxLength={2000}
            placeholder="Tell us about your work — what is it, what inspired it, what do you want people to feel?"
            value={values.description}
            onChange={(e) => set('description', e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-cream/80">
            Link to your work (optional)
          </label>
          <input
            type="url"
            maxLength={500}
            placeholder="https:// — video, portfolio, track, project page…"
            value={values.media_url}
            onChange={(e) => set('media_url', e.target.value)}
            className={inputClass}
          />
          <p className="mt-2 text-xs text-cream/40">
            Add a link if your work lives elsewhere. If you don&apos;t have one,
            your piece will still show with a branded cover in the gallery.
          </p>
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-bark/60 px-4 py-3.5">
        <input
          type="checkbox"
          checked={ownConfirm}
          onChange={(e) => setOwnConfirm(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#d4a94e]"
          required
        />
        <span className="text-sm leading-relaxed text-cream/70">
          I confirm that this is my original work, that I own the rights to it,
          and that I am free to share it.
        </span>
      </label>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-bark/60 px-4 py-3.5">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#d4a94e]"
          required
        />
        <span className="text-sm leading-relaxed text-cream/70">
          I consent to ROOTED reviewing my submission and, if approved,
          displaying my name, country and work publicly in the ROOTED Showcase.
          I retain full ownership of my content.
        </span>
      </label>

      {state === 'error' && (
        <div className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          Something went wrong sending your submission. Please check your
          details and try again.
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-espresso shadow-md shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-lg disabled:opacity-60 sm:w-auto"
      >
        {state === 'loading' ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Your Creativity
          </span>
        )}
      </button>
    </form>
  );
}
