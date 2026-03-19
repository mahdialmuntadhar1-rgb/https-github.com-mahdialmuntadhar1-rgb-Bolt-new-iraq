import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Business } from '../types';

export function useBusinesses(selectedCity: string, selectedCategory: string, limit: number = 12) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBusinesses() {
      setLoading(true);
      setError(null);
      
      try {
        let query = supabase
          .from('businesses')
          .select('*')
          .limit(limit);

        if (selectedCity !== 'all') {
          query = query.eq('governorate', selectedCity);
        }

        if (selectedCategory !== 'all') {
          query = query.eq('category', selectedCategory);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) {
          console.error('Supabase error:', supabaseError.message, supabaseError.code, supabaseError.details);
          setError(supabaseError.message);
        } else {
          setBusinesses(data || []);
        }
      } catch (err: any) {
        console.error('Unexpected error:', err);
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchBusinesses();
  }, [selectedCity, selectedCategory, limit]);

  return { businesses, loading, error };
}
