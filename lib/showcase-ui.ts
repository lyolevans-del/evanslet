import {
  Video,
  Palette,
  Camera,
  Megaphone,
  Music,
  Shirt,
  Lightbulb,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import type { ShowcaseCategory } from './showcase';

export const categoryIcon: Record<ShowcaseCategory, LucideIcon> = {
  Video: Video,
  Artwork: Palette,
  Photography: Camera,
  Advertising: Megaphone,
  Music: Music,
  Fashion: Shirt,
  'Creative Project': Lightbulb,
  Other: Sparkles,
};

/** Tailwind gradient classes keyed by the seeded cover_color hints. */
export const coverGradient: Record<string, string> = {
  amber: 'from-amber-500/30 via-orange-600/20 to-amber-700/30',
  rose: 'from-rose-500/30 via-pink-600/20 to-rose-700/30',
  teal: 'from-teal-500/30 via-cyan-600/20 to-teal-700/30',
  clay: 'from-orange-700/30 via-amber-800/20 to-stone-700/30',
  gold: 'from-yellow-500/30 via-amber-500/20 to-yellow-600/30',
  emerald: 'from-emerald-500/30 via-green-600/20 to-emerald-700/30',
  copper: 'from-orange-600/30 via-amber-700/20 to-orange-800/30',
  plum: 'from-fuchsia-600/25 via-purple-600/20 to-fuchsia-800/25',
};

export function gradientFor(color: string | null): string {
  return coverGradient[color ?? 'gold'] ?? coverGradient.gold;
}
