'use client';

import * as React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useListExercises } from '@/features/routines/hooks/use-routines.hooks';
import { CreateExerciseModal } from './create-exercise-modal.component';
import type { Exercise } from '../types/routine.types';

interface Props {
  selected: string[];
  onChange: (ids: string[]) => void;
}

export function ExercisePicker({ selected, onChange }: Props) {
  const { data: exercises, isLoading } = useListExercises();
  const [filter, setFilter] = React.useState('');

  const items = (exercises || []).filter((e: Exercise) => e.name.toLowerCase().includes(filter.toLowerCase()));

  function toggle(id: string) {
    if (selected.includes(id)) onChange(selected.filter((s) => s !== id));
    else onChange([...selected, id]);
  }

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <Input placeholder="Buscar ejercicio..." value={filter} onChange={(e) => setFilter(e.target.value)} />
        <CreateExerciseModal onCreated={(ex) => onChange([...selected, ex.id])} />
      </div>

      <div className="grid max-h-64 grid-cols-1 gap-2 overflow-auto md:grid-cols-2">
        {isLoading && <div>Cargando ejercicios...</div>}
        {items.map((ex: Exercise) => (
          <div key={ex.id} className="flex items-center justify-between gap-2 rounded-md border p-2">
            <div>
              <div className="font-medium">{ex.name}</div>
              <div className="text-sm text-muted-foreground">{ex.main_muscle}</div>
            </div>
            <div>
              <Button size="sm" variant={selected.includes(ex.id) ? 'secondary' : 'outline'} onClick={() => toggle(ex.id)}>
                {selected.includes(ex.id) ? 'Seleccionado' : 'Agregar'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
