import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface GovCount { governorate: string; count: number; }
interface CatCount { category: string; count: number; }

const StatCard: React.FC<{ label: string; value: string | number; sub?: string }> = ({ label, value, sub }) => (
  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{label}</p>
    <p className="text-3xl font-bold text-white">{typeof value === 'number' ? value.toLocaleString() : value}</p>
    {sub && <p className="text-white/40 text-xs mt-1">{sub}</p>}
  </div>
);

const Bar: React.FC<{ label: string; value: number; max: number; color: string }> = ({ label, value, max, color }) => {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm text-white/60 mb-1">
        <span>{label}</span>
        <span className="text-white/80">{value.toLocaleString()}</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%`, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
};

export const AdminHealthCheck: React.FC = () => {
  const [total, setTotal] = useState<number | null>(null);
  const [withPhone, setWithPhone] = useState<number | null>(null);
  const [withGeo, setWithGeo] = useState<number | null>(null);
  const [govCounts, setGovCounts] = useState<GovCount[]>([]);
  const [catCounts, setCatCounts] = useState<CatCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [totalRes, phoneRes, geoRes, govRes, catRes] = await Promise.all([
        supabase.from('directory').select('id', { count: 'exact', head: true }),
        supabase.from('directory').select('id', { count: 'exact', head: true }).not('phone', 'is', null).neq('phone', ''),
        supabase.from('directory').select('id', { count: 'exact', head: true }).not('lat', 'is', null).not('lng', 'is', null),
        supabase.from('directory').select('governorate').neq('governorate', '').limit(2000),
        supabase.from('directory').select('category').neq('category', '').limit(2000),
      ]);

      if (totalRes.error) throw new Error(totalRes.error.message);

      setTotal(totalRes.count ?? 0);
      setWithPhone(phoneRes.count ?? 0);
      setWithGeo(geoRes.count ?? 0);

      const gc: Record<string, number> = {};
      (govRes.data || []).forEach((r: any) => { const k = r.governorate || 'Unknown'; gc[k] = (gc[k] || 0) + 1; });
      setGovCounts(Object.entries(gc).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([governorate, count]) => ({ governorate, count })));

      const cc: Record<string, number> = {};
      (catRes.data || []).forEach((r: any) => { const k = r.category || 'Unknown'; cc[k] = (cc[k] || 0) + 1; });
      setCatCounts(Object.entries(cc).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([category, count]) => ({ category, count })));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const phonePercent = total ? Math.round(((withPhone || 0) / total) * 100) : 0;
  const geoPercent = total ? Math.round(((withGeo || 0) / total) * 100) : 0;

  return (
    <section className="py-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Directory Stats</h1>
            <p className="text-white/40 text-sm">Iraqi Compass · Live data from Supabase</p>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm border border-white/10 transition-all disabled:opacity-50"
          >
            {loading ? 'Loading…' : '↻ Refresh'}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">{error}</div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Businesses" value={total ?? '…'} sub="all governorates" />
          <StatCard label="With Phone" value={withPhone ?? '…'} sub={`${phonePercent}% coverage`} />
          <StatCard label="With Location" value={withGeo ?? '…'} sub={`${geoPercent}% coverage`} />
          <StatCard label="Governorates" value={govCounts.length || '…'} sub="covered" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h2 className="text-white font-semibold mb-4">Businesses by Governorate</h2>
            <div className="space-y-3">
              {loading
                ? [...Array(5)].map((_, i) => <div key={i} className="h-6 bg-white/5 rounded animate-pulse" />)
                : govCounts.map(({ governorate, count }) => (
                    <Bar key={governorate} label={governorate} value={count} max={govCounts[0]?.count || 1} color="bg-violet-500" />
                  ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h2 className="text-white font-semibold mb-4">Businesses by Category</h2>
            <div className="space-y-3">
              {loading
                ? [...Array(5)].map((_, i) => <div key={i} className="h-6 bg-white/5 rounded animate-pulse" />)
                : catCounts.map(({ category, count }) => (
                    <Bar
                      key={category}
                      label={category.replace(/_/g, ' ')}
                      value={count}
                      max={catCounts[0]?.count || 1}
                      color="bg-blue-500"
                    />
                  ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50">Data quality</span>
            <div className="flex gap-6">
              <span className="text-white/70">Phone: <span className="text-violet-400 font-semibold">{phonePercent}%</span></span>
              <span className="text-white/70">Geo: <span className="text-blue-400 font-semibold">{geoPercent}%</span></span>
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden flex gap-0.5">
            <div className="h-full bg-violet-500 rounded-full" style={{ width: `${phonePercent}%`, transition: 'width 0.6s ease' }} />
          </div>
        </div>
      </div>
    </section>
  );
};
