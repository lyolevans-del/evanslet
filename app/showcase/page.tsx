import type { Metadata } from 'next';
import { Sparkles, Upload, ShieldCheck, Heart, Eye } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { ShowcaseGallery } from '@/components/ShowcaseGallery';
import { ShowcaseUploadForm } from '@/components/ShowcaseUploadForm';
import { getShowcaseItems } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'ROOTED Showcase – Your Talent. Your Projects. Your Platform.',
  description:
    'Explore and share creative work from the ROOTED community — video, artwork, photography, music, fashion and more. Upload your creativity and be discovered.',
};

const pillars = [
  {
    icon: ShieldCheck,
    title: 'You keep ownership',
    body: 'Every creator retains full rights to their work. You share on your terms.',
  },
  {
    icon: Eye,
    title: 'Reviewed before it shows',
    body: 'Each submission is reviewed by the ROOTED team to keep the showcase safe and respectful.',
  },
  {
    icon: Heart,
    title: 'Real recognition',
    body: 'Your name, country and work appear together — so credit travels with your creativity.',
  },
];

export default async function ShowcasePage() {
  const items = await getShowcaseItems();
  const creators = new Set(items.map((i) => i.creator_name)).size;
  const countries = new Set(items.map((i) => i.country)).size;

  return (
    <main>
      <PageHero
        eyebrow="ROOTED Showcase"
        title="Your Talent. Your Projects. Your Platform."
        lead="A gallery of creativity from the ROOTED community. Explore videos, artwork, photography, music, fashion and more — then share your own work with the world."
      />

      {/* Stats strip */}
      <section className="border-b border-gold/10 bg-bark py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 px-5 sm:px-8">
          {[
            { value: items.length, label: 'Pieces showcased' },
            { value: creators, label: 'Creators featured' },
            { value: countries, label: 'Countries represented' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-semibold text-gold sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-cream/50 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="scroll-mt-24 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                  The Gallery
                </p>
                <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-5xl">
                  Discover creativity from across the community.
                </h2>
              </div>
              <a
                href="#upload"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-espresso shadow-md shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft"
              >
                <Upload className="h-4 w-4" />
                Upload Your Creativity
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10">
              <ShowcaseGallery items={items} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works / ownership */}
      <section className="border-y border-gold/10 bg-bark py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              How It Works
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-5xl">
              Share on your terms. Always.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10">
                    <p.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-cream">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/55">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upload form */}
      <section id="upload" className="scroll-mt-24 py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                <Sparkles className="h-7 w-7 text-gold" />
              </div>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-cream text-balance sm:text-5xl">
                Upload your creativity
              </h2>
              <p className="mt-4 text-lg text-cream/60">
                Share a piece of your work with the ROOTED community. Add a
                title, a description, choose a category, and let your talent be
                seen.
              </p>
              <p className="mt-3 font-display text-xl italic text-gold-soft">
                Your Talent. Your Projects. Your Platform.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12 rounded-[2rem] border border-border bg-card p-6 sm:p-10">
              <ShowcaseUploadForm />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
