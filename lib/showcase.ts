export type ShowcaseCategory =
  | 'Video'
  | 'Artwork'
  | 'Photography'
  | 'Advertising'
  | 'Music'
  | 'Fashion'
  | 'Creative Project'
  | 'Other';

export const SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  'Video',
  'Artwork',
  'Photography',
  'Advertising',
  'Music',
  'Fashion',
  'Creative Project',
  'Other',
];

export type ShowcaseItem = {
  id: string;
  creator_name: string;
  creator_handle: string | null;
  country: string;
  category: ShowcaseCategory;
  title: string;
  description: string;
  media_url: string | null;
  cover_color: string | null;
  created_at: string;
};
