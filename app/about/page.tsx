import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Eye,
  Fingerprint,
  Globe2,
  TrendingUp,
  Handshake,
  Compass,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { RootsGraphic } from '@/components/RootsGraphic';

export const metadata: Metadata = {
  title: 'About ROOTED – Our Story, Vision and Mission',
  description:
    'Learn about ROOTED, our commitment to talent discovery, cultural expression, inclusion and creative opportunities.',
};

const values = [
  {
    icon: Globe2,
    name: 'Inclusion',
    body: 'We believe everyone deserves to be recognised and respected, regardless of their background, identity or circumstances.',
  },
  {
    icon: Fingerprint,
    name: 'Authenticity',
    body: 'We value originality, honesty and the freedom to express individuality.',
  },
  {
    icon: Compass,
    name: 'Cultural Appreciation',
    body: 'We celebrate cultural diversity, heritage, identity and the creativity that connects communities.',
  },
  {
    icon: TrendingUp,
    name: 'Empowerment',
    body: 'We create opportunities for people to develop their abilities, build confidence and pursue their ambitions.',
  },
  {
    icon: Handshake,
    name: 'Collaboration',
    body: 'We believe meaningful progress happens when people, communities and organisations work together.',
  },
  {
    icon: Eye,
    name: 'Growth',
    body: 'We recognise potential and encourage continuous learning, development and innovation.',
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Us"
        title="Every great story begins somewhere. Every talent has roots."
        lead="ROOTED was born from a simple but powerful belief: talent is everywhere, but recognition and opportunities do not always reach everyone."
      />

      {/* Our Story */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Our Story
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
                Born from a belief in people.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-cream/65">
                <p>
                  Across communities, neighbourhoods, villages, towns and
                  cities, there are individuals with extraordinary abilities,
                  creative ideas and entrepreneurial ambitions. Some have
                  access to established networks and platforms. Others have the
                  same potential but fewer opportunities to showcase what they
                  can do.
                </p>
                <p>
                  We believe this should not determine who gets recognised.
                  ROOTED was created to bring people, talent, culture and
                  opportunities together through a platform that values
                  individuality, celebrates diversity and recognises the
                  potential in everyone.
                </p>
                <p>
                  ROOTED begins in Africa, drawing inspiration from its
                  richness, diversity and creativity, while building
                  connections that extend across borders. We are creating a
                  space where people can be discovered, stories can be shared,
                  creativity can thrive and opportunities can grow.
                </p>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-10 rounded-2xl border-l-2 border-gold bg-bark/60 px-6 py-5">
                <p className="font-display text-xl italic leading-snug text-gold-soft">
                  &ldquo;Roots provide identity and belonging, but they do not
                  restrict growth. A tree can grow beyond the place where it
                  was planted. So can talent.&rdquo;
                </p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  href="/discover-talent#submit"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-espresso transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft"
                >
                  Submit Your Talent
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="font-display text-xl italic text-gold-soft">
                  Different roots. Shared possibilities.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="rounded-[2rem] border border-gold/20 bg-bark/50 px-8 py-12">
                <RootsGraphic className="mx-auto w-full max-w-[16rem]" />
                <p className="mt-8 text-center text-sm uppercase tracking-[0.25em] text-cream/50">
                  Culture • Creativity • Talent • Opportunity
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision / Mission / Purpose */}
      <section className="border-y border-gold/10 bg-bark py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                label: 'Our Vision',
                body: 'To become a globally recognised platform where culture, creativity and talent connect, thrive and create opportunities without boundaries.',
              },
              {
                label: 'Our Mission',
                body: 'To discover, nurture, celebrate and connect diverse talent through culture, creative expression, experiences, partnerships and opportunities — ensuring that talent is recognised regardless of where it originates.',
              },
              {
                label: 'Our Purpose',
                body: 'To make talent visible, culture valuable and opportunity accessible.',
              },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 120}>
                <div className="h-full rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                  <h3 className="font-display text-2xl font-semibold text-gold">
                    {item.label}
                  </h3>
                  <p className="mt-4 leading-relaxed text-cream/65">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Our Values
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-5xl">
              What we stand for.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.name} delay={i * 80}>
                <div className="group h-full rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20">
                    <value.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-cream">
                    {value.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/55">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="grain relative overflow-hidden border-t border-gold/10 bg-espresso py-24 sm:py-32">
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-gold/8 blur-[110px]" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Our Philosophy
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-5xl">
              We do not define people by where they come from. We recognise
              them for what they bring.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cream/65">
              We believe that talent deserves visibility, creativity deserves
              appreciation and opportunity should not be restricted by
              geography or social background. We celebrate differences while
              creating a shared sense of belonging.
            </p>
            <p className="mt-10 font-display text-2xl italic text-gold-soft">
              At ROOTED, everyone has something valuable to contribute.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
