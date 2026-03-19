import { supabase } from '../lib/supabase';
import type { Business } from '../types';

// Columns that actually exist in the `businesses` table on P1
type DbRow = {
  id: string;
  name: string | null;
  category: string | null;
  governorate: string | null;
  city: string | null;
  phone: string | null;
  address: string | null;
  created_at?: string;
};

// ─── Category image map (Unsplash) ─────────────────────────────────────────
const CATEGORY_IMAGES: Record<string, string> = {
  restaurant:   'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400',
  cafe:         'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400',
  pharmacy:     'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400',
  hospital:     'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400',
  school:       'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=400',
  supermarket:  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400',
  bank:         'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=400',
  hotel:        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400',
  gym:          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400',
  fuel:         'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=400',
  bus_station:  'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=400',
  fire_station: 'https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b?auto=format&fit=crop&q=80&w=400',
  clothes:      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=400',
  furniture:    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=400';

function imageForCategory(category: string | null): string {
  if (!category) return DEFAULT_IMAGE;
  const key = category.toLowerCase().replace(/\s+/g, '_');
  return CATEGORY_IMAGES[key] ?? DEFAULT_IMAGE;
}

function mapRow(row: DbRow): Business {
  return {
    id:          row.id,
    name:        row.name ?? 'Unknown Business',
    nameAr:      undefined,
    nameKu:      undefined,
    category:    row.category ?? 'uncategorized',
    governorate: row.governorate ?? undefined,
    city:        row.city ?? undefined,
    address:     row.address ?? (row.city ? `${row.city}, ${row.governorate}` : undefined),
    phone:       row.phone ?? undefined,
    rating:      0,
    imageUrl:    imageForCategory(row.category),
  };
}

// ─── Query params ───────────────────────────────────────────────────────────
export interface BusinessQuery {
  page: number;
  pageSize: number;
  category?: string;
  governorate?: string;
  minRating?: number;
  search?: string;
}

export interface BusinessQueryResult {
  businesses: Business[];
  totalCount: number;
  usingMockData: boolean;
  error: string | null;
}

export const getBusinesses = async (params: BusinessQuery): Promise<BusinessQueryResult> => {
  const from = params.page * params.pageSize;
  const to   = from + params.pageSize - 1;

  let query = supabase
    .from<DbRow>('businesses')
    .select('id, name, category, governorate, city, phone, address', { count: 'exact' });

  if (params.category && params.category !== 'all') {
    query = query.eq('category', params.category);
  }

  if (params.governorate && params.governorate !== 'all') {
    query = query.eq('governorate', params.governorate);
  }

  if (params.search?.trim()) {
    const term = `%${params.search.trim()}%`;
    query = query.or(`name.ilike.${term},city.ilike.${term},category.ilike.${term}`);
  }

  const { data, count, error } = await query.range(from, to);

  if (error || !data) {
    return { businesses: [], totalCount: 0, usingMockData: false, error: error?.message ?? 'Failed to load' };
  }

  return {
    businesses:   data.map(mapRow),
    totalCount:   count ?? data.length,
    usingMockData: false,
    error:        null,
  };
};
