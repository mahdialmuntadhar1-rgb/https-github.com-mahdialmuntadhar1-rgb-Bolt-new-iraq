import React, { createContext, useContext, useState, useEffect } from 'react';

const SUPABASE_URL = '__DIRECTORY_URL__';
const SUPABASE_KEY = '__DIRECTORY_KEY__';

export interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  governorate?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  signUp: (email: string, password: string, meta: Record<string, string>) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function authFetch(path: string, body: object) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
    },
    body: JSON.stringify(body),
  });
  return { status: res.status, data: await res.json() };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('ic_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const signUp = async (email: string, password: string, meta: Record<string, string>) => {
    const { status, data } = await authFetch('/auth/v1/signup', {
      email, password,
      data: meta,
    });
    if (status === 200 || status === 201) {
      const u: AuthUser = { id: data.id ?? data.user?.id, email, ...meta };
      setUser(u);
      localStorage.setItem('ic_user', JSON.stringify(u));
      if (data.access_token) localStorage.setItem('ic_token', data.access_token);
      return { error: null };
    }
    return { error: data.msg ?? data.error_description ?? 'Sign-up failed' };
  };

  const signIn = async (email: string, password: string) => {
    const { status, data } = await authFetch('/auth/v1/token?grant_type=password', {
      email, password,
    });
    if (status === 200) {
      const u: AuthUser = {
        id: data.user?.id,
        email: data.user?.email ?? email,
        full_name: data.user?.user_metadata?.full_name,
        role: data.user?.user_metadata?.role,
        governorate: data.user?.user_metadata?.governorate,
      };
      setUser(u);
      localStorage.setItem('ic_user', JSON.stringify(u));
      localStorage.setItem('ic_token', data.access_token);
      return { error: null };
    }
    return { error: data.error_description ?? 'Invalid email or password' };
  };

  const signOut = async () => {
    const token = localStorage.getItem('ic_token');
    if (token) {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: { 'apikey': SUPABASE_KEY, Authorization: `Bearer ${token}` },
      });
    }
    setUser(null);
    localStorage.removeItem('ic_user');
    localStorage.removeItem('ic_token');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
