'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { listGyms } from '@/features/gyms/queries/gyms.queries';
import { supabase } from '@/lib/supabase/client';

const STORAGE_KEY = 'mg:currentGymId';

export function setCurrentGymId(id: string | number | null) {
  try {
    if (id == null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, String(id));
  } catch {
    /* ignore */
  }
}

export function getCurrentGymId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * useCurrentGym - prefer gym id from authenticated user token (user_metadata.gym_id)
 * Falls back to localStorage if auth is not available.
 */
export function useCurrentGym() {
  const { user } = useAuth();
  const [gymId, setGymIdState] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  });

  // When auth user changes, prefer gym_id from server profile (public.users).
  useEffect(() => {
    // If we have an authenticated user, prefer reading the canonical gym_id
    // from `public.users` (server-side profile) to avoid mismatches and type
    // issues (bigint vs string). Fall back to token metadata or localStorage.
    (async () => {
      try {
        if (user && typeof user.id === 'string') {
          const { data: profile, error } = await supabase
            .from('users')
            .select('gym_id')
            .eq('id', user.id)
            .single();

          if (!error && profile && profile.gym_id != null) {
            const resolved = String(profile.gym_id);
            setGymIdState(resolved);
            try { localStorage.setItem(STORAGE_KEY, resolved); } catch {}
            return;
          }
        }

        // Prefer gym id from the authenticated user metadata as a fallback
        const u = user as unknown as Record<string, unknown> | null;
        let idFromAuth: string | null = null;
        if (u) {
          const meta = (u['user_metadata'] as Record<string, unknown> | undefined) ?? undefined;
          const candidate = u['gym_id'] ?? meta?.['gym_id'] ?? meta?.['gymId'];
          if (typeof candidate === 'string' || typeof candidate === 'number') {
            idFromAuth = String(candidate);
          } else if (typeof u['gym_name'] === 'string') {
            idFromAuth = String(u['gym_name']);
          }
        }

        if (idFromAuth) {
          setGymIdState(idFromAuth);
          try { localStorage.setItem(STORAGE_KEY, idFromAuth); } catch {}
          return;
        }

        // If auth provides only a gym_name, try to resolve to the numeric gym id
        const gymName = typeof u?.['gym_name'] === 'string' ? String(u?.['gym_name']) : null;
        if (gymName) {
          try {
            const gyms = await listGyms();
            const found = (gyms || []).find(g => String(g.name).toLowerCase() === gymName.toLowerCase());
            if (found && found.id != null) {
              const resolved = String(found.id);
              setGymIdState(resolved);
              try { localStorage.setItem(STORAGE_KEY, resolved); } catch {}
            }
          } catch (err) {
            // ignore resolution errors, keep fallback localStorage
            console.warn('Could not resolve gym id from gym_name', gymName, err);
          }
        }
      } catch (err) {
        // swallow any unexpected error and keep whatever is stored locally
        console.warn('useCurrentGym: error resolving gym id', err);
      }
    })();
  }, [user]);

  function save(id: string | number | null) {
    setCurrentGymId(id);
    setGymIdState(id == null ? null : String(id));
  }

  return { gymId, setGymId: save } as const;
}
