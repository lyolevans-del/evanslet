import { supabase } from './supabase';
import type { ShowcaseItem } from './showcase';

export async function getShowcaseItems(): Promise<ShowcaseItem[]> {
  const { data, error } = await supabase
    .from('showcase_gallery')
    .select(
      'id, creator_name, creator_handle, country, category, title, description, media_url, cover_color, created_at'
    )
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as ShowcaseItem[];
}
