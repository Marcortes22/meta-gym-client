'use client';

import * as React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useCreateRoutine, useAddExerciseToRoutine } from '../hooks/use-routines.hooks';
import { ExercisePicker } from './exercise-picker.component';
import type { NewRoutineInput, Routine, RoutineLevel } from '../types/routine.types';

export function RoutineForm() {
  const [step, setStep] = React.useState(1);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [level, setLevel] = React.useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [selectedExercises, setSelectedExercises] = React.useState<string[]>([]);
  const createRoutine = useCreateRoutine();
  const addToRoutine = useAddExerciseToRoutine();

  async function handleCreateRoutine() {
    const payload: NewRoutineInput = { name, description, level };
    try {
      const created = (await createRoutine.mutateAsync(payload)) as Routine;
      // attach selected exercises
      await Promise.all(
        selectedExercises.map((exerciseId, idx) =>
          addToRoutine.mutateAsync({ routineId: created.id, exerciseId, sets: 3, reps: '8-12', position: idx + 1 })
        )
      );

      setStep(3);
    } catch (err) {
      console.error('Error creando rutina:', err);
    }
  }

  return (
    <div className="space-y-4">
      {step === 1 && (
        <div>
          <h3 className="mb-2 text-xl font-semibold">Información básica</h3>
          <div className="space-y-2">
            <div>
              <label className="block text-sm text-muted-foreground">Nombre de la rutina</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground">Descripción</label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground">Nivel</label>
              <select id="routine-level" aria-label="Nivel de rutina" className="mt-1 w-full rounded-md border px-2 py-1" value={level} onChange={(e) => setLevel(e.target.value as RoutineLevel)}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => {/* cancel */}}>Cancelar</Button>
            <Button onClick={() => setStep(2)} disabled={!name}>Siguiente</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="mb-2 text-xl font-semibold">Ejercicios</h3>
          <ExercisePicker selected={selectedExercises} onChange={setSelectedExercises} />
          <div className="mt-4 flex justify-between">
            <div>
              <Button variant="outline" onClick={() => setStep(1)}>Atrás</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>Cancelar</Button>
              <Button onClick={handleCreateRoutine} disabled={!name || createRoutine.isLoading}>Crear rutina</Button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="mb-2 text-xl font-semibold">Listo</h3>
          <p>La rutina fue creada correctamente. Puedes agregar horarios o editar la rutina desde el listado.</p>
          <div className="mt-4">
            <Button onClick={() => { setStep(1); setName(''); setDescription(''); setSelectedExercises([]); }}>Crear otra rutina</Button>
          </div>
        </div>
      )}
    </div>
  );
}
