import type { Metadata } from 'next';
import {
  Music,
  Mic2,
  Scissors,
  Palette,
  Camera,
  PenLine,
  Hammer,
  MonitorSmartphone,
  Briefcase,
  HandHeart,
  UserPlus,
  Sparkles,
  Trophy,
  CalendarDays,
  Users,
  GraduationCap,
  BriefcaseBusiness,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SubmitForm } from '@/components/SubmitForm';

export const metadata: Metadata = {
  title: 'Discover Talent – ROOTED',
  description:
    'Showcase your abilities, share your creative work and connect with the ROOTED talent community.',
};

const whoCanJoin = [
  { icon: Music, label: 'Musicians and singers' },
  { icon: Mic2, label: 'Dancers and performers' },
  { icon: Scissors, label: 'Fashion designers and stylists' },
  { icon: Palette, label: 'Artists and illustrators' },
  { icon: Camera, label: 'Photographers and filmmakers' },
  { icon: PenLine, label: 'Writers and storytellers' },
  { icon: Hammer, label: 'Artisans and craftspeople' },
  { icon: MonitorSmartphone, label: 'Digital creators' },
  { icon: Briefcase, label: 'Entrepreneurs and innovators' },
  { icon: HandHeart, label: 'Creative professionals' },
];

const gains = [
  {
    icon: UserPlus,
    title: 'Talent profile and visibility opportunities',
  },
  {
    icon: PenLine,
    title: 'Editorial and storytelling features',
  },
  {
    icon: CalendarDays,
    title: 'Invitations to selected showcases and events',
  },
  {
    icon: Users,
    title: 'Creative networking opportunities',
  },
  {
    icon: Users,
    title: 'Connections with potential collaborators',
  },
  {
    icon: GraduationCap,
    title: 'Mentorship and development opportunities',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Potential commercial introductions and commissions',
  },
];

const talentFields = [
  { name: 'full_name', label: 'Full name', type: 'text' as const, required: true, placeholder: 'Your full name', half: true },
  { name: 'email', label: 'Email address', type: 'email' as const, required: true, placeholder: 'you@example.com', half: true },
  { name: 'phone', label: 'Phone number', type: 'tel' as const, placeholder: 'Optional', half: true },
  { name: 'country', label: 'Country', type: 'text' as const, required: true, placeholder: 'Where are you based?', half: true },
  {
    name: 'discipline',
    label: 'Your discipline',
    type: 'select' as const,
    required: true,
    placeholder: 'Choose the closest match…',
    options: [
      'Music / Singing',
      'Dance / Performance',
      'Fashion design / Styling',
      'Art / Illustration',
      'Photography / Film',
      'Writing / Storytelling',
      'Craftsmanship / Artisan work',
      'Digital creation',
      'Entrepreneurship / Innovation',
      'Other',
    ],
  },
  { name: 'portfolio_url', label: 'Link to your work', type: 'url' as const, placeholder: 'Instagram, website, portfolio… (optional)' },
  {
    name: 'message',
    label: 'Tell us about your talent',
    type: 'textarea' as const,
    required: true,
    placeholder: 'What do you do? What do you create? What do you aspire to become?',
  },
];

const nominationFields = [
  { name: 'nominee_name', label: 'Who are you nominating?', type: 'text' as const, required: true, placeholder: 'Their full name', half: true },
  {
    name: 'nominee_discipline',
    label: 'Their discipline',
    type: 'select' as const,
    required: true,
    placeholder: 'Choose the closest match…',
    options: [
      'Music / Singing',
      'Dance / Performance',
      'Fashion design / Styling',
      'Art / Illustration',
      'Photography / Film',
      'Writing / Storytelling',
      'Craftsmanship / Artisan work',
      'Digital creation',
      'Entrepreneurship / Innovation',
      'Other',
    ],
  },
  { name: 'nominator_name', label: 'Your name', type: 'text' as const, required: true, placeholder: 'Your full name', half: true },
  { name: 'nominator_email', label: 'Your email', type: 'email' as const, required: true, placeholder: 'you@example.com', half: true },
  {
    name: 'reason',
    label: 'Why do they deserve recognition?',
    type: 'textarea' as const,
    required: true,
    placeholder: 'Tell us about their work and why the world should see it…',
  },
];

export default function DiscoverTalentPage() {
  return (
    <main>
      <PageHero
        eyebrow="Discover Talent"
        title="Your talent has a place here."
        lead="Every individual has something valuable to offer. You do not need to belong to a particular community, have a specific educational background or come from an established industry to participate. We are interested in what you do, what you create, what you know and what you aspire to become."
      />

      {/* Who can join */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Who Can Join?
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-5xl">
              We welcome talent across every discipline.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {whoCanJoin.map((item, i) => (
              <Reveal key={item.label} delay={i * 60}>
                <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-border bg-card px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                  <item.icon className="h-6 w-6 text-gold" />
                  <span className="text-sm font-medium leading-snug text-cream/80">
                    {item.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What can you gain */}
      <section className="border-y border-gold/10 bg-bark py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              What Can You Gain?
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-5xl">
              Depending on available opportunities, ROOTED may provide:
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gains.map((gain, i) => (
              <Reveal key={gain.title} delay={i * 80}>
                <div className="flex h-full items-center gap-4 rounded-2xl border border-border bg-card px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                  <gain.icon className="h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm font-medium leading-snug text-cream/80">
                    {gain.title}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-cream/45">
              Participation does not guarantee selection, employment,
              representation, funding or paid assignments. Opportunities will
              be communicated transparently.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Submission form */}
      <section id="submit" className="scroll-mt-24 py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                <Sparkles className="h-7 w-7 text-gold" />
              </div>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-cream text-balance sm:text-5xl">
                Ready to be discovered?
              </h2>
              <p className="mt-4 text-lg text-cream/60">
                Your journey is yours. Your talent is yours. Let the world see
                what you can do.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12 rounded-[2rem] border border-border bg-card p-6 sm:p-10">
              <SubmitForm
                table="talent_submissions"
                fields={talentFields}
                submitLabel="Submit Your Talent"
                successTitle="Thank you — we've received your submission."
                successBody="Your talent is now with the ROOTED team. If there is a match with upcoming features, showcases or opportunities, we will reach out using the details you shared. Keep creating."
                consentLabel="I consent to ROOTED storing these details and contacting me about opportunities connected to my submission."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Nomination form */}
      <section
        id="nominate"
        className="grain relative scroll-mt-24 overflow-hidden border-t border-gold/10 bg-bark py-24 sm:py-28"
      >
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-gold/8 blur-[110px]" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                <Trophy className="h-7 w-7 text-gold" />
              </div>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-cream text-balance sm:text-5xl">
                Nominate someone
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-cream/60">
                Know someone whose work deserves more recognition? Nominate a
                friend, colleague, artist, entrepreneur, performer or creative
                whose talent you believe deserves to be discovered.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12 rounded-[2rem] border border-border bg-card p-6 sm:p-10">
              <SubmitForm
                table="nominations"
                fields={nominationFields}
                submitLabel="Make a Nomination"
                successTitle="Nomination received."
                successBody="Thank you for shining a light on someone's talent. The ROOTED team reviews every nomination and will be in touch if their story is featured."
                consentLabel="I consent to ROOTED storing these details and contacting me about this nomination."
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
