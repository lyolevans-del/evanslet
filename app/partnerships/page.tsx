import type { Metadata } from 'next';
import {
  Sparkles,
  HeartHandshake,
  Palette,
  Users,
  GraduationCap,
  Globe2,
  Building2,
  Store,
  Shirt,
  Clapperboard,
  School,
  Cpu,
  Megaphone,
  Landmark,
  UserRound,
  CheckCircle2,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SubmitForm } from '@/components/SubmitForm';

export const metadata: Metadata = {
  title: 'Partner With ROOTED – Create Opportunities',
  description:
    'Collaborate with ROOTED through sponsorships, talent partnerships, creative campaigns and cultural experiences.',
};

const benefits = [
  {
    icon: Sparkles,
    title: 'Access to Creative Talent',
    body: 'Connect with emerging and established creatives across different disciplines and communities.',
  },
  {
    icon: HeartHandshake,
    title: 'Authentic Brand Engagement',
    body: 'Develop campaigns and experiences grounded in real people, authentic stories and cultural expression.',
  },
  {
    icon: Palette,
    title: 'Creative Collaboration',
    body: 'Work with designers, artists, performers, photographers, filmmakers and other professionals.',
  },
  {
    icon: Users,
    title: 'Community Connection',
    body: 'Engage with diverse audiences and communities through relevant creative initiatives.',
  },
  {
    icon: GraduationCap,
    title: 'Talent Development',
    body: 'Support mentorship, professional development and initiatives that expand access to opportunity.',
  },
  {
    icon: Globe2,
    title: 'Cultural Exchange',
    body: 'Participate in collaborations that celebrate diverse perspectives and connect creative communities.',
  },
];

const areas = [
  'Campaign sponsorship',
  'Talent development programmes',
  'Creative production',
  'Events and exhibitions',
  'Fashion and lifestyle collaborations',
  'Media and storytelling',
  'Technology and digital innovation',
  'Mentorship and professional development',
  'International creative exchange',
];

const partners = [
  { icon: Building2, label: 'Corporate organisations' },
  { icon: Store, label: 'Small and medium-sized businesses' },
  { icon: Shirt, label: 'Fashion and lifestyle brands' },
  { icon: Clapperboard, label: 'Media and entertainment companies' },
  { icon: School, label: 'Educational institutions' },
  { icon: Landmark, label: 'Cultural institutions' },
  { icon: Cpu, label: 'Technology companies' },
  { icon: Megaphone, label: 'Creative agencies' },
  { icon: Landmark, label: 'Foundations and development organisations' },
  { icon: UserRound, label: 'Individual professionals and mentors' },
];

const partnerFields = [
  { name: 'organisation', label: 'Organisation', type: 'text' as const, required: true, placeholder: 'Company or organisation name', half: true },
  { name: 'contact_name', label: 'Contact name', type: 'text' as const, required: true, placeholder: 'Your full name', half: true },
  { name: 'email', label: 'Email address', type: 'email' as const, required: true, placeholder: 'you@company.com', half: true },
  { name: 'country', label: 'Country', type: 'text' as const, required: true, placeholder: 'Where are you based?', half: true },
  {
    name: 'interest',
    label: 'Area of interest',
    type: 'select' as const,
    required: true,
    placeholder: 'Choose the closest match…',
    options: [
      'Campaign sponsorship',
      'Talent development programme',
      'Creative production',
      'Events and exhibitions',
      'Fashion and lifestyle collaboration',
      'Media and storytelling',
      'Technology and digital innovation',
      'Mentorship and professional development',
      'International creative exchange',
      'Something else',
    ],
  },
  {
    name: 'message',
    label: 'Your message',
    type: 'textarea' as const,
    required: true,
    placeholder: 'Tell us about your organisation and how you would like to collaborate…',
  },
];

export default function PartnershipsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partnerships"
        title="Great things happen when talent meets opportunity."
        lead="We work with organisations, businesses, brands, institutions and individuals who recognise the value of culture, creativity, diversity and emerging talent. Our partnerships create value for participating organisations while generating meaningful opportunities for the talent and communities connected to ROOTED."
      />

      {/* Why partner */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Why Partner With ROOTED?
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-5xl">
              What collaboration unlocks.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 80}>
                <div className="group h-full rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20">
                    <benefit.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-cream">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/55">
                    {benefit.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities + who */}
      <section className="border-y border-gold/10 bg-bark py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Our Partnership Opportunities
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
                We welcome collaboration in areas including:
              </h2>
              <ul className="mt-8 space-y-3.5">
                {areas.map((area) => (
                  <li key={area} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span className="leading-relaxed text-cream/75">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Who Can Partner With Us?
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
                We welcome enquiries from:
              </h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {partners.map((partner) => (
                  <div
                    key={partner.label}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40"
                  >
                    <partner.icon className="h-4 w-4 shrink-0 text-gold" />
                    <span className="text-sm leading-snug text-cream/75">
                      {partner.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Partner form */}
      <section
        id="partner"
        className="grain relative scroll-mt-24 overflow-hidden py-24 sm:py-28"
      >
        <div className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-gold/8 blur-[110px]" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="text-center">
              <h2 className="font-display text-4xl font-semibold tracking-tight text-cream text-balance sm:text-5xl">
                Let&apos;s create something meaningful.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-cream/60">
                Whether you are interested in sponsoring a programme,
                discovering talent, collaborating on a creative project or
                supporting a ROOTED experience, we would like to hear from
                you.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12 rounded-[2rem] border border-border bg-card p-6 sm:p-10">
              <SubmitForm
                table="partnership_enquiries"
                fields={partnerFields}
                submitLabel="Partner With ROOTED"
                successTitle="Thank you — enquiry received."
                successBody="The ROOTED partnerships team will be in touch to explore how we can create something meaningful together."
                consentLabel="I consent to ROOTED storing these details and contacting me about this partnership enquiry."
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
