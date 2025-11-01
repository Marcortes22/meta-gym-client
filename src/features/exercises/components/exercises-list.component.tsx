"use client";

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import ExerciseForm from './exercise-form.component';
import { useListExercises, useDeleteExercise } from '../hooks/use-exercises.hooks';

export default function ExercisesList() {
  const { data, isLoading } = useListExercises();
  const deleteMut = useDeleteExercise();
  const [editingId, setEditingId] = useState<string | null>(null);

  if (isLoading) return <div>Cargando ejercicios…</div>;

  async function handleDelete(id: string) {
    const confirmed = window.confirm('¿Eliminar este ejercicio? Esta acción no se puede deshacer.');
    if (!confirmed) return;
    try {
      await deleteMut.mutateAsync(id);
    } catch (err) {
      console.error(err);
      alert('No se pudo eliminar el ejercicio');
    }
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-medium">Ejercicios</h2>
        <p className="text-sm text-muted-foreground">Lista de ejercicios del gimnasio actual</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded border">
          <ExerciseForm onSaved={() => { /* refetch handled by hooks */ }} />
        </div>

        <div className="bg-white rounded border">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Músculo</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {(data || []).map((ex: { id: string; name: string; main_muscle?: string | null }) => (
                <tr key={ex.id} className="border-t">
                  <td className="px-4 py-2 align-top">
                    {editingId === ex.id ? (
                      <ExerciseForm initial={{ id: ex.id, name: ex.name, main_muscle: ex.main_muscle }} onSaved={() => setEditingId(null)} onCancel={() => setEditingId(null)} />
                    ) : (
                      <div className="font-medium">{ex.name}</div>
                    )}
                  </td>
                  <td className="px-4 py-2 align-top">{ex.main_muscle ?? '—'}</td>
                  <td className="px-4 py-2 align-top">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingId(ex.id)}>Editar</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(ex.id)}>Eliminar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
