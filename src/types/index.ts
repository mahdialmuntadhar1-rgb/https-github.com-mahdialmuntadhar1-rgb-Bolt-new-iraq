export interface Business {
  id: string;
  name: string;
  phone?: string;
  category: string;
  governorate: string;
  created_at?: string;
}

export type Language = 'en' | 'ar' | 'ku';
