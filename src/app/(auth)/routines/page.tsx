 'use client';

import * as React from 'react';
import { RoutineForm } from '@/features/routines/components/routine-form.component';
import type { Routine } from '@/features/routines/types/routine.types';
import { useListRoutines } from '@/features/routines/hooks/use-routines.hooks';
import { Button } from '@/shared/components/ui/button';

export default function RoutinesPage() {
  const { data: routines = [], isLoading } = useListRoutines();
  const [showCreate, setShowCreate] = React.useState(true);

  return (
    <div className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Rutinas</h1>
            <p className="text-gray-600 mt-2">Administra las rutinas de entrenamiento para los miembros</p>
          </div>
          <div>
            <Button variant="outline" onClick={() => setShowCreate((s) => !s)}>
              {showCreate ? 'Ocultar creador' : 'Crear rutina'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="space-y-4">
              {isLoading && <div>Cargando rutinas...</div>}
              {!isLoading && routines.length === 0 && (
                <div className="rounded-md border bg-white p-6 text-center text-muted-foreground">No hay rutinas creadas aún.</div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {routines.map((r: Routine) => (
                  <div key={r.id} className="rounded-md border bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{r.name}</h3>
                        <p className="text-sm text-muted-foreground">{r.description}</p>
                        <div className="mt-2 text-sm text-muted-foreground">Nivel: {r.level}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm text-muted-foreground">Ejercicios: {r.routine_exercises?.length ?? '—'}</div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Ver</Button>
                          <Button size="sm">Editar</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="md:col-span-1">
            {showCreate && (
              <div className="sticky top-6 rounded-md border bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold">Crear nueva rutina</h3>
                <RoutineForm />
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
