'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Sprout } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/what-we-do', label: 'What We Do' },
  { href: '/discover-talent', label: 'Discover Talent' },
  { href: '/showcase', label: 'Showcase' },
  { href: '/stories', label: 'ROOTED Stories' },
  { href: '/live', label: 'ROOTED Live' },
  { href: '/partnerships', label: 'Partnerships' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/15 bg-espresso/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <Sprout className="h-4.5 w-4.5 h-5 w-5 text-gold" />
          </span>
          <span className="font-display text-xl font-semibold tracking-[0.18em] text-cream">
            ROOTED
          </span>
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-gold-soft ${
                pathname === link.href ? 'text-gold' : 'text-cream/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/discover-talent#submit"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-espresso shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-md"
          >
            Submit Your Talent
          </Link>
          <Link
            href="/partnerships#partner"
            className="rounded-full border border-gold/50 px-5 py-2.5 text-sm font-semibold text-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold/10"
          >
            Partner With Us
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="rounded-lg border border-border p-2 text-cream lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-espresso lg:hidden">
          <div className="space-y-1 px-5 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname === link.href
                    ? 'bg-gold/10 text-gold'
                    : 'text-cream/75 hover:bg-secondary hover:text-cream'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Link
                href="/discover-talent#submit"
                className="rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-espresso"
              >
                Submit Your Talent
              </Link>
              <Link
                href="/partnerships#partner"
                className="rounded-full border border-gold/50 px-5 py-3 text-center text-sm font-semibold text-gold"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
