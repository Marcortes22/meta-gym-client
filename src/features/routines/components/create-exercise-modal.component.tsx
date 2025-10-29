'use client';

import * as React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useCreateExercise } from '@/features/routines/hooks/use-routines.hooks';
import { useCurrentGym } from '@/lib/current-gym';
import type { Exercise } from '@/features/routines/types/routine.types';

interface Props {
  onCreated?: (exercise: Exercise) => void;
}

export function CreateExerciseModal({ onCreated }: Props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [mainMuscle, setMainMuscle] = React.useState('');
  const mutation = useCreateExercise();
  const { gymId } = useCurrentGym();
  const [submitting, setSubmitting] = React.useState(false);

  async function handleCreate() {
    try {
      setSubmitting(true);
      const created = await mutation.mutateAsync({ name, main_muscle: mainMuscle });
      setName('');
      setMainMuscle('');
      setOpen(false);
      onCreated?.(created);
    } catch (err) {
      console.error('Error creando ejercicio', err);
    }
    finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Crear ejercicio
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-md bg-background p-4 shadow-lg">
            <h3 className="mb-2 text-lg font-semibold">Crear ejercicio</h3>
            <div className="mb-2">
              <label className="block text-sm text-muted-foreground">Nombre</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-muted-foreground">Músculo principal</label>
              <Input value={mainMuscle} onChange={(e) => setMainMuscle(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <div className="flex items-center gap-2">
                {!gymId && <div className="text-sm text-rose-600">Selecciona un gimnasio antes de crear ejercicios</div>}
                <Button onClick={handleCreate} disabled={submitting || !name || !gymId}>Crear</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
