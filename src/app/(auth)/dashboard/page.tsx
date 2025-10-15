'use client';

import { useCurrentUser, useLogout } from '@/features/auth/hooks/use-auth.hooks';
import { Button } from '@/shared/components/ui/button';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { data: user, isLoading } = useCurrentUser();
  const { mutate: logout } = useLogout();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Bienvenido, {user?.user_metadata?.gym_name || user?.email}!
              </h1>
              <p className="text-gray-600">
                Panel de administración de Meta Gym
              </p>
            </div>
            <Button
              onClick={() => logout()}
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}