import type { Metadata } from 'next';
import { Mail, MapPin, Clock3 } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SubmitForm } from '@/components/SubmitForm';

export const metadata: Metadata = {
  title: 'Contact Us – ROOTED',
  description:
    'Get in touch with ROOTED — enquiries, talent submissions, partnerships, media and events.',
};

const contactPoints = [
  {
    icon: Mail,
    title: 'General enquiries',
    body: 'hello@rooted.africa',
    note: 'For any question — big or small.',
  },
  {
    icon: Mail,
    title: 'Talent submissions',
    body: 'talent@rooted.africa',
    note: 'Or use the Submit Your Talent form.',
  },
  {
    icon: Mail,
    title: 'Partnerships',
    body: 'partnerships@rooted.africa',
    note: 'For brands, businesses and institutions.',
  },
  {
    icon: Mail,
    title: 'Media and storytelling',
    body: 'stories@rooted.africa',
    note: 'Interviews, features and collaborations.',
  },
  {
    icon: Mail,
    title: 'Events',
    body: 'live@rooted.africa',
    note: 'ROOTED Live showcases and experiences.',
  },
];

const contactFields = [
  { name: 'full_name', label: 'Full name', type: 'text' as const, required: true, placeholder: 'Your full name', half: true },
  { name: 'email', label: 'Email address', type: 'email' as const, required: true, placeholder: 'you@example.com', half: true },
  { name: 'organisation', label: 'Organisation', type: 'text' as const, placeholder: 'Optional', half: true },
  { name: 'country', label: 'Country', type: 'text' as const, required: true, placeholder: 'Where are you based?', half: true },
  {
    name: 'enquiry_type',
    label: 'Nature of enquiry',
    type: 'select' as const,
    required: true,
    placeholder: 'Choose one…',
    options: [
      'General enquiry',
      'Talent submission',
      'Partnership',
      'Media and storytelling',
      'Events',
      'Something else',
    ],
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea' as const,
    required: true,
    placeholder: 'Tell us how we can help…',
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact Us"
        title="Let's connect."
        lead="Have a question? Want to share your talent? Interested in collaborating? Looking to partner with ROOTED? ROOTED is built around people, ideas and connections — every conversation has the potential to create something meaningful."
      />

      {/* Contact points */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                  Get in Touch
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
                  Reach the right team directly.
                </h2>
              </Reveal>
              <div className="mt-9 space-y-4">
                {contactPoints.map((point, i) => (
                  <Reveal key={point.title} delay={i * 70}>
                    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                        <point.icon className="h-4.5 w-4.5 h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-cream">
                          {point.title}
                        </h3>
                        <p className="mt-0.5 text-sm font-medium text-gold-soft">
                          {point.body}
                        </p>
                        <p className="mt-0.5 text-xs text-cream/45">
                          {point.note}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={400}>
                <div className="mt-8 space-y-4 rounded-2xl border border-gold/25 bg-bark/60 px-6 py-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gold" />
                    <div>
                      <h3 className="text-sm font-semibold text-cream">
                        Location
                      </h3>
                      <p className="text-sm text-cream/60">Kenya, Africa</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-5 w-5 text-gold" />
                    <div>
                      <h3 className="text-sm font-semibold text-cream">
                        Response time
                      </h3>
                      <p className="text-sm text-cream/60">
                        We aim to reply within a few working days.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={150}>
                <div className="rounded-[2rem] border border-border bg-card p-6 sm:p-10">
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-cream">
                    Send us a message
                  </h2>
                  <p className="mt-2 text-sm text-cream/55">
                    We would love to hear from you.
                  </p>
                  <div className="mt-8">
                    <SubmitForm
                      table="contact_messages"
                      fields={contactFields}
                      submitLabel="Submit Enquiry"
                      successTitle="Message sent."
                      successBody="Thank you for reaching out. The right ROOTED team will get back to you shortly."
                      consentLabel="I consent to ROOTED storing these details and contacting me about this enquiry."
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
