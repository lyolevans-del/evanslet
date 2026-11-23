import { Reveal } from './Reveal';

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="grain relative overflow-hidden border-b border-gold/10 bg-espresso">
      <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />
      <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-clay/30 blur-[90px]" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-5xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/65">
              {lead}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
