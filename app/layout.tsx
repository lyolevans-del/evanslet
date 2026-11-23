import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['opsz'],
});

export const metadata: Metadata = {
  title: 'ROOTED Africa – Where Every Talent Belongs',
  description:
    'Discover ROOTED, an African-originated platform celebrating culture, creativity and talent while connecting people to opportunities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-body">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
