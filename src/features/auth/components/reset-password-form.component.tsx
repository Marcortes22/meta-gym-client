'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Spinner } from '@/shared/components/ui/spinner';
import { useResetPassword } from '../hooks/use-auth.hooks';

export function ResetPasswordForm() {
  const router = useRouter();
  const { mutate: resetPassword, isPending, isSuccess, error } = useResetPassword();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push('/?reset=success');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setValidationError('');

    if (password.length < 6) {
      setValidationError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setValidationError('Las contraseñas no coinciden');
      return;
    }

    resetPassword({ password });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Contraseña Actualizada!
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Tu contraseña ha sido restablecida exitosamente
              </p>
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Spinner className="h-4 w-4" />
                <span className="text-sm font-medium">Redirigiendo al inicio de sesión...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Restablecer Contraseña
            </h2>
            <p className="text-sm text-gray-600">
              Ingresa tu nueva contraseña
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Nueva contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isPending}
                className="w-full bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <p className="text-xs text-gray-600 mt-1">
                Mínimo 6 caracteres
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                Confirmar contraseña
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isPending}
                className="w-full bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {(error || validationError) && (
              <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-600">
                  {validationError || error?.message}
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending || !password || !confirmPassword}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Spinner className="mr-2 h-5 w-5" />
                  Restableciendo...
                </>
              ) : (
                'Restablecer contraseña'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
