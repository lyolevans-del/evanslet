import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Palette,
  Shirt,
  CalendarDays,
  BookOpen,
  Network,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'What We Do – ROOTED',
  description:
    'Explore ROOTED TALENT, CULTURE, LIFESTYLE, EXPERIENCES, STORIES and CONNECT.',
};

const sections = [
  {
    id: 'talent',
    icon: Sparkles,
    name: 'ROOTED Talent',
    headline: 'Your talent deserves to be discovered.',
    intro:
      'We provide a platform for individuals to showcase their abilities, share their work and connect with opportunities. Whether you are an emerging creative or an established professional, ROOTED provides a space to showcase what you do.',
    items: [
      'Talent discovery and profiling',
      'Artist and creative showcases',
      'Emerging talent features',
      'Professional networking',
      'Mentorship and development opportunities',
      'Talent-to-business connections',
      'Creative commissions and bookings',
    ],
    cta: { label: 'Submit Your Talent', href: '/discover-talent#submit' },
  },
  {
    id: 'culture',
    icon: Palette,
    name: 'ROOTED Culture',
    headline: 'Celebrating who we are and what makes us unique.',
    intro:
      'Culture shapes our identities, influences our creativity and connects generations. We believe culture should be celebrated, respected and given room to evolve.',
    items: [
      'Music and performing arts',
      'Fashion and contemporary design',
      'Dance and creative performance',
      'Visual arts and photography',
      'Traditional craftsmanship',
      'Cultural heritage and storytelling',
      'Cross-cultural collaborations',
    ],
    cta: { label: 'Read ROOTED Stories', href: '/stories' },
  },
  {
    id: 'lifestyle',
    icon: Shirt,
    name: 'ROOTED Lifestyle',
    headline: 'Creativity beyond the canvas.',
    intro:
      'ROOTED Lifestyle brings culture, originality and creativity into everyday life. Through curated products and creative collaborations, we celebrate designers, makers and entrepreneurs. We believe products can tell stories, express identity and create opportunities for their creators.',
    items: [
      'Clothing and fashion',
      'Accessories',
      'Creative merchandise',
      'Designer collaborations',
      'Limited-edition collections',
      'Contemporary lifestyle products',
      'Creative marketplaces',
    ],
    cta: { label: 'Partner With Us', href: '/partnerships#partner' },
  },
  {
    id: 'experiences',
    icon: CalendarDays,
    name: 'ROOTED Experiences',
    headline: 'Where creativity comes together.',
    intro:
      'We create experiences that bring people together to discover, appreciate and participate in culture and creativity — opportunities for talent to connect with audiences and potential collaborators.',
    items: [
      'Creative exhibitions',
      'Talent showcases',
      'Music and cultural events',
      'Fashion presentations',
      'Workshops and masterclasses',
      'Networking experiences',
      'Community creative gatherings',
      'Festivals and collaborative events',
    ],
    cta: { label: 'Explore ROOTED Live', href: '/live' },
  },
  {
    id: 'stories',
    icon: BookOpen,
    name: 'ROOTED Stories',
    headline: 'Every talent has a story worth telling.',
    intro:
      'We believe stories have the power to inspire, connect and challenge perceptions. ROOTED Stories documents people, creativity, culture and experiences with authenticity, dignity and respect for the people behind them.',
    items: [
      'Talent interviews',
      'Photography',
      'Short films and documentaries',
      'Podcasts and conversations',
      'Creative journeys',
      'Cultural features',
      'Digital publications',
    ],
    cta: { label: 'Read ROOTED Stories', href: '/stories' },
  },
  {
    id: 'connect',
    icon: Network,
    name: 'ROOTED Connect',
    headline: 'Connecting people. Creating possibilities.',
    intro:
      'ROOTED Connect brings together businesses, brands, institutions, creative professionals and talent — facilitating collaboration, creative partnerships and commercial engagement. When the right people connect, new possibilities emerge.',
    items: [
      'Corporate and brand partnerships',
      'Creative campaigns and production',
      'Talent sourcing and bookings',
      'Mentorship collaborations',
      'Sponsorship opportunities',
      'Business and creative networks',
      'International collaborations',
    ],
    cta: { label: 'Explore Partnerships', href: '/partnerships#partner' },
  },
];

export default function WhatWeDoPage() {
  return (
    <main>
      <PageHero
        eyebrow="What We Do"
        title="Discovering talent. Celebrating culture. Creating opportunities."
        lead="ROOTED brings together different aspects of creative expression, cultural identity, talent development and commercial collaboration."
      />

      <div className="mx-auto max-w-7xl space-y-20 px-5 py-24 sm:px-8 sm:py-28">
        {sections.map((section, i) => (
          <Reveal key={section.id}>
            <section
              id={section.id}
              className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-border bg-card"
            >
              <div
                className={`grid lg:grid-cols-2 ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="p-8 sm:p-12">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10">
                      <section.icon className="h-6 w-6 text-gold" />
                    </div>
                    <h2 className="font-display text-2xl font-semibold tracking-wide text-gold sm:text-3xl">
                      {section.name}
                    </h2>
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-cream text-balance">
                    {section.headline}
                  </h3>
                  <p className="mt-5 leading-relaxed text-cream/60">
                    {section.intro}
                  </p>
                  <Link
                    href={section.cta.href}
                    className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-espresso transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft"
                  >
                    {section.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
                <div className="border-t border-border bg-bark/40 p-8 sm:p-12 lg:border-l lg:border-t-0">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/50">
                    Our areas of focus
                  </h4>
                  <ul className="mt-6 space-y-3.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <span className="text-sm leading-relaxed text-cream/75">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
