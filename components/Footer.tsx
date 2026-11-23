'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sprout, Instagram, Youtube, Linkedin, Facebook, Loader2, Check, Music2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const exploreLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/what-we-do', label: 'What We Do' },
  { href: '/discover-talent', label: 'Discover Talent' },
  { href: '/stories', label: 'ROOTED Stories' },
  { href: '/live', label: 'ROOTED Live' },
  { href: '/partnerships', label: 'Partnerships' },
];

const getInvolvedLinks = [
  { href: '/discover-talent#submit', label: 'Submit Your Talent' },
  { href: '/discover-talent#nominate', label: 'Nominate Someone' },
  { href: '/stories#share', label: 'Share Your Story' },
  { href: '/partnerships#partner', label: 'Become a Partner' },
  { href: '/contact', label: 'Collaborate With Us' },
];

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Music2, label: 'TikTok' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Facebook, label: 'Facebook' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState('loading');
    try {
      const data = new TextEncoder().encode(localStorage.getItem('rooted_client_id') ?? email);
      const digest = await crypto.subtle.digest('SHA-256', data);
      const ipHash = Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      const { error } = await supabase.rpc('subscribe_newsletter', {
        p_email: email.trim().toLowerCase(),
        p_ip_hash: ipHash,
      });
      if (error) throw error;
      setState('done');
      setEmail('');
    } catch (cause) {
      console.error('newsletter signup failed', cause);
      setState('error');
    }
  }

  return (
    <footer className="grain border-t border-gold/15 bg-espresso">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                <Sprout className="h-5 w-5 text-gold" />
              </span>
              <span className="font-display text-2xl font-semibold tracking-[0.18em] text-cream">
                ROOTED
              </span>
            </Link>
            <p className="mt-5 font-display text-lg italic text-gold-soft">
              Where Every Talent Belongs.
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-cream/50">
              Rooted in Africa. Open to the World.
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              Discover talent. Celebrate culture. Create opportunities.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-all duration-300 hover:border-gold hover:text-gold"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/65 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Get Involved
              </h3>
              <ul className="mt-4 space-y-2.5">
                {getInvolvedLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/65 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Stay Rooted
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-cream/65">
              Join the newsletter for new talent features, stories and
              upcoming ROOTED Live events.
            </p>
            {state === 'done' ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3.5 text-sm font-medium text-gold-soft">
                <Check className="h-4 w-4" />
                You&apos;re on the list. Welcome to ROOTED.
              </div>
            ) : (
              <form onSubmit={subscribe} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === 'error') setState('idle');
                  }}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 rounded-xl border border-input bg-bark px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="shrink-0 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-gold-soft disabled:opacity-60"
                >
                  {state === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Join'
                  )}
                </button>
              </form>
            )}
            {state === 'error' && (
              <p className="mt-2 text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
            <p className="mt-4 font-display text-lg italic text-cream/40">
              Talent Has No Postcode.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="text-sm text-cream/45">
            © {new Date().getFullYear()} ROOTED. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {['Privacy Policy', 'Terms and Conditions', 'Talent Participation Terms'].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-cream/45 transition-colors hover:text-cream"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
