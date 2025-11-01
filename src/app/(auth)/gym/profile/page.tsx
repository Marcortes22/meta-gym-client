"use client";

import GymProfileForm from '@/features/gyms/components/gym-profile-form.component';
import { useCurrentGym } from '@/lib/current-gym';

export default function GymProfilePage() {
  const { gymId } = useCurrentGym();

  return (
    <div className="flex-1 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Perfil del gimnasio</h1>
          <p className="text-sm text-muted-foreground mt-2">Gestiona los datos públicos y de contacto del gimnasio</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {!gymId ? (
            <div className="text-center text-gray-500">No se ha detectado un gimnasio actual. Asegúrate de tener asignado un gym_id en tu perfil.</div>
          ) : (
            <GymProfileForm />
          )}
        </div>
      </div>
    </div>
  );
}
