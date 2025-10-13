'use client';

import { useCurrentUser, useLogout } from '@/features/auth/hooks/use-auth.hooks';
import { Button } from '@/shared/components/ui/button';

export default function Dashboard() {
  const { data: user, isLoading } = useCurrentUser();
  const { mutate: logout } = useLogout();

  if (isLoading) {
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
                ¡Bienvenido, {user?.gym_name || user?.email}!
              </h1>
              <p className="text-gray-600">
                Panel de administración de Meta Gym
              </p>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Cerrar sesión
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Información del Usuario
            </h3>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>ID:</strong> {user?.id}</p>
              <p><strong>Rol:</strong> {user?.role || 'admin'}</p>
              {user?.gym_name && (
                <p><strong>Gimnasio:</strong> {user.gym_name}</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Registro de Gimnasio
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Prueba el flujo de registro de un nuevo gimnasio
            </p>
            <a
              href="/register"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              Registrar Gimnasio
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Estado del Sistema
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Autenticación: Activa</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Base de datos: Conectada</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Email: Configurado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}