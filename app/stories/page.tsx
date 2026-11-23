import type { Metadata } from 'next';
import {
  Star,
  Map,
  Palette,
  MessagesSquare,
  Lightbulb,
  PenLine,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SubmitForm } from '@/components/SubmitForm';

export const metadata: Metadata = {
  title: 'ROOTED Stories – People, Culture and Creativity',
  description:
    'Discover inspiring talent profiles, creative journeys and cultural stories from Africa and beyond.',
};

const categories = [
  {
    icon: Star,
    name: 'ROOTED Spotlight',
    body: 'Meet individuals whose talents and contributions deserve recognition.',
  },
  {
    icon: Map,
    name: 'ROOTED Journeys',
    body: 'Discover the experiences, ideas and ambitions behind people\u2019s work.',
  },
  {
    icon: Palette,
    name: 'ROOTED Culture',
    body: 'Explore cultural expression, traditions, creativity and identity.',
  },
  {
    icon: MessagesSquare,
    name: 'ROOTED Voices',
    body: 'Hear perspectives, conversations and ideas from people shaping their communities and industries.',
  },
  {
    icon: Lightbulb,
    name: 'ROOTED Innovation',
    body: 'Discover creative ideas, products and solutions emerging from different communities.',
  },
];

const storyFields = [
  { name: 'full_name', label: 'Your name', type: 'text' as const, required: true, placeholder: 'Your full name', half: true },
  { name: 'email', label: 'Email address', type: 'email' as const, required: true, placeholder: 'you@example.com', half: true },
  { name: 'country', label: 'Country', type: 'text' as const, required: true, placeholder: 'Where are you based?', half: true },
  {
    name: 'enquiry_type',
    label: 'What are you sharing?',
    type: 'select' as const,
    required: true,
    placeholder: 'Choose one…',
    options: [
      'My own story',
      'A story suggestion',
      'A nomination',
      'A collaboration idea',
      'Something else',
    ],
  },
  {
    name: 'message',
    label: 'Tell us the story',
    type: 'textarea' as const,
    required: true,
    placeholder: 'Who is it about? What makes it worth sharing? What should the world know?',
  },
];

export default function StoriesPage() {
  return (
    <main>
      <PageHero
        eyebrow="ROOTED Stories"
        title="People. Culture. Creativity. Stories worth discovering."
        lead="The world is full of remarkable people doing extraordinary things. Some are already recognised. Others are building their journeys away from the spotlight. ROOTED Stories exists to share these experiences and celebrate the creativity, perspectives and contributions that make our communities unique."
      />

      {/* Categories */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Our Story Categories
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-5xl">
              Five ways into a story.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <Reveal
                key={category.name}
                delay={i * 90}
                className={i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}
              >
                <div className="group h-full rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20">
                    <category.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-cream">
                    {category.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/55">
                    {category.body}
                  </p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={450}>
              <div className="grain relative flex h-full flex-col justify-center overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/15 to-bark p-7">
                <PenLine className="h-6 w-6 text-gold" />
                <p className="mt-4 font-display text-xl font-semibold leading-snug text-cream">
                  We tell stories with authenticity, dignity and respect for
                  the people behind them.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Share your story */}
      <section
        id="share"
        className="grain relative scroll-mt-24 overflow-hidden border-t border-gold/10 bg-bark py-24 sm:py-28"
      >
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gold/8 blur-[110px]" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="text-center">
              <h2 className="font-display text-4xl font-semibold tracking-tight text-cream text-balance sm:text-5xl">
                Share your story
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-cream/60">
                Are you doing something interesting? Have a creative journey
                worth sharing? Know someone whose story should be heard? We
                welcome story suggestions, nominations and collaborations.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12 rounded-[2rem] border border-border bg-card p-6 sm:p-10">
              <SubmitForm
                table="contact_messages"
                hidden={{ enquiry_type: 'Story' }}
                fields={storyFields}
                submitLabel="Share Your Story"
                successTitle="Story received."
                successBody="Thank you for sharing. The ROOTED Stories team reads every submission and will be in touch if your story is selected for a feature."
                consentLabel="I consent to ROOTED storing these details and contacting me about this story."
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
