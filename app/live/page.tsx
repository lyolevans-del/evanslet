import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Music,
  Shirt,
  Camera,
  Store,
  Sparkles,
  Globe2,
  MessagesSquare,
  Network,
  CalendarDays,
  Mic2,
  Handshake,
  ArrowRight,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SubmitForm } from '@/components/SubmitForm';

export const metadata: Metadata = {
  title: 'ROOTED LIVE – Events and Creative Experiences',
  description:
    'Explore creative showcases, exhibitions, cultural events and experiences by ROOTED.',
};

const expectations = [
  { icon: Music, label: 'Live performances' },
  { icon: Shirt, label: 'Fashion and design showcases' },
  { icon: Camera, label: 'Art and photography exhibitions' },
  { icon: Store, label: 'Creative marketplaces' },
  { icon: Sparkles, label: 'Talent presentations' },
  { icon: Globe2, label: 'Cultural experiences' },
  { icon: MessagesSquare, label: 'Panel discussions' },
  { icon: Network, label: 'Networking and collaboration opportunities' },
];

const showcaseFields = [
  { name: 'full_name', label: 'Your name', type: 'text' as const, required: true, placeholder: 'Your full name', half: true },
  { name: 'email', label: 'Email address', type: 'email' as const, required: true, placeholder: 'you@example.com', half: true },
  { name: 'country', label: 'Country', type: 'text' as const, required: true, placeholder: 'Where are you based?', half: true },
  {
    name: 'enquiry_type',
    label: 'How would you like to take part?',
    type: 'select' as const,
    required: true,
    placeholder: 'Choose one…',
    options: [
      'Performing live',
      'Fashion / design showcase',
      'Exhibiting art or photography',
      'Creative marketplace stall',
      'Workshop or masterclass',
      'Event collaboration',
      'Something else',
    ],
  },
  {
    name: 'message',
    label: 'Tell us about what you do',
    type: 'textarea' as const,
    required: true,
    placeholder: 'What would you bring to a ROOTED Live experience?',
  },
];

const eventPartnerFields = [
  { name: 'organisation', label: 'Organisation', type: 'text' as const, required: true, placeholder: 'Company or organisation name', half: true },
  { name: 'contact_name', label: 'Contact name', type: 'text' as const, required: true, placeholder: 'Your full name', half: true },
  { name: 'email', label: 'Email address', type: 'email' as const, required: true, placeholder: 'you@company.com', half: true },
  { name: 'country', label: 'Country', type: 'text' as const, required: true, placeholder: 'Where are you based?', half: true },
  {
    name: 'interest',
    label: 'Area of interest',
    type: 'select' as const,
    required: true,
    placeholder: 'Choose one…',
    options: [
      'Event sponsorship',
      'Hosting a ROOTED Live experience',
      'Media partnership',
      'In-kind support',
      'Something else',
    ],
  },
  {
    name: 'message',
    label: 'Your message',
    type: 'textarea' as const,
    required: true,
    placeholder: 'Tell us how you would like to work together…',
  },
];

export default function LivePage() {
  return (
    <main>
      <PageHero
        eyebrow="ROOTED Live"
        title="Experience creativity. Celebrate culture. Connect with talent."
        lead="ROOTED Live brings our philosophy to life through events and experiences that celebrate creativity, cultural expression and human potential — from intimate showcases to larger creative gatherings."
      />

      {/* What to expect */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              What to Expect
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-5xl">
              Spaces to discover, experience and connect.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {expectations.map((item, i) => (
              <Reveal key={item.label} delay={i * 70}>
                <div className="flex h-full items-center gap-3.5 rounded-2xl border border-border bg-card px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                  <item.icon className="h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm font-medium leading-snug text-cream/80">
                    {item.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="border-y border-gold/10 bg-bark py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
              <CalendarDays className="h-7 w-7 text-gold" />
            </div>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-cream text-balance sm:text-5xl">
              Upcoming events
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/60">
              The first ROOTED Live experiences are being planned right now.
              Join the newsletter in the footer below and you will be the
              first to hear about showcases, exhibitions, workshops and
              gatherings as dates are announced.
            </p>
            <Link
              href="/contact"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-espresso transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft"
            >
              Ask About Upcoming Events
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Showcase interest form */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                <Mic2 className="h-7 w-7 text-gold" />
              </div>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-cream text-balance sm:text-5xl">
                Interested in showcasing your talent?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-cream/60">
                We welcome expressions of interest from creatives, performers,
                designers, exhibitors and potential event collaborators.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12 rounded-[2rem] border border-border bg-card p-6 sm:p-10">
              <SubmitForm
                table="contact_messages"
                hidden={{ enquiry_type: 'ROOTED Live' }}
                fields={showcaseFields}
                submitLabel="Express Interest"
                successTitle="Interest registered."
                successBody="Thank you — the ROOTED Live team will keep your details on file and reach out as upcoming events take shape."
                consentLabel="I consent to ROOTED storing these details and contacting me about ROOTED Live events."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Partner form */}
      <section
        id="live-partner"
        className="grain relative scroll-mt-24 overflow-hidden border-t border-gold/10 bg-bark py-24 sm:py-28"
      >
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-gold/8 blur-[110px]" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                <Handshake className="h-7 w-7 text-gold" />
              </div>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-cream text-balance sm:text-5xl">
                Partner with ROOTED Live
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-cream/60">
                We welcome businesses and organisations interested in
                supporting, sponsoring or collaborating on creative
                experiences.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12 rounded-[2rem] border border-border bg-card p-6 sm:p-10">
              <SubmitForm
                table="partnership_enquiries"
                hidden={{ interest: 'ROOTED Live event' }}
                fields={eventPartnerFields}
                submitLabel="Discuss Partnerships"
                successTitle="Thank you — message received."
                successBody="The ROOTED team will be in touch to explore how we can create something meaningful together."
                consentLabel="I consent to ROOTED storing these details and contacting me about this partnership enquiry."
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
