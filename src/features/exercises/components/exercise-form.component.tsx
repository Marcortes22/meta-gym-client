"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { useCreateExercise, useUpdateExercise } from '../hooks/use-exercises.hooks';

type Exercise = { id?: string; name: string; main_muscle?: string | null };

type Props = {
  initial?: Exercise | null;
  onSaved?: (ex: Exercise) => void;
  onCancel?: () => void;
};

export default function ExerciseForm({ initial = null, onSaved, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [mainMuscle, setMainMuscle] = useState(initial?.main_muscle ?? '');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setName(initial?.name ?? '');
    setMainMuscle(initial?.main_muscle ?? '');
  }, [initial]);

  const createMut = useCreateExercise();
  const updateMut = useUpdateExercise();

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setSubmitting(true);
    try {
      if (initial?.id) {
        const res = await updateMut.mutateAsync({ id: initial.id, payload: { name: name.trim(), main_muscle: mainMuscle.trim() } });
        onSaved?.(res);
      } else {
        const res = await createMut.mutateAsync({ name: name.trim(), main_muscle: mainMuscle.trim() });
        onSaved?.(res);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 md:grid-cols-3 items-end">
      <div className="col-span-2">
        <label className="text-sm text-muted-foreground">Nombre</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del ejercicio" />
      </div>

      <div>
        <label className="text-sm text-muted-foreground">Músculo principal</label>
        <Input value={mainMuscle} onChange={(e) => setMainMuscle(e.target.value)} placeholder="P. ej. Pecho" />
      </div>

      <div className="col-span-1 md:col-span-3 flex gap-2 justify-end mt-2">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} type="button">Cancelar</Button>
        )}
        <Button type="submit" disabled={submitting || name.trim() === ''}>
          {initial?.id ? 'Guardar' : 'Crear'}
        </Button>
      </div>
    </form>
  );
}
