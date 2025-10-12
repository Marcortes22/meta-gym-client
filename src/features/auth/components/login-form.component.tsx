'use client';

import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { LoginCredentials } from '../types/auth.types';

export function LoginForm() {
  const { login, loading, error } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      return;
    }

    try {
      await login(credentials);
    } catch (err) {
      // Error is handled by the auth context
      console.error('Login error:', err);
    }
  };

  const handleChange = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Meta Gym
          </h1>
          <p className="text-gray-600">
            Inicia sesión en tu cuenta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <Input
              id="email"
              type="email"
              value={credentials.email}
              onChange={handleChange('email')}
              placeholder="tu@correo.com"
              required
              disabled={loading}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={handleChange('password')}
              placeholder="••••••••"
              required
              disabled={loading}
              className="w-full"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || !credentials.email || !credentials.password}
            className="w-full"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <a href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
              Registra tu gimnasio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}