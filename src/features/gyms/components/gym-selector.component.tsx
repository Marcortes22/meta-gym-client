'use client';

import * as React from 'react';
import { useListGyms } from '../hooks/use-gyms.hooks';
import { useCurrentGym } from '@/lib/current-gym';
import { Button } from '@/shared/components/ui/button';

export function GymSelector() {
  const { data: gyms = [], isLoading } = useListGyms();
  const { gymId, setGymId } = useCurrentGym();

  interface GymItem { id: string; name: string }

  function handleSelect(id: string | number) {
    // useCurrentGym.save will persist to localStorage and update state
    setGymId(id);
  }

  if (isLoading) return <div>Cargando gimnasios...</div>;

  return (
    <div className="space-y-2">
      <label className="block text-sm text-muted-foreground">Selecciona el gimnasio</label>
      <div className="flex gap-2">
        <select
          aria-label="Seleccionar gimnasio"
          value={gymId ?? ''}
          onChange={(e) => handleSelect(e.target.value)}
          className="rounded-md border px-2 py-1"
        >
          <option value="">-- Seleccionar --</option>
          {(gyms as GymItem[]).map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <Button variant="outline" onClick={() => { setGymId(null); }}>Borrar</Button>
      </div>
    </div>
  );
}
