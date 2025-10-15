'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Spinner } from '@/shared/components/ui/spinner';
import { useForgotPassword } from '../hooks/use-auth.hooks';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const { mutate: sendResetEmail, isPending, isSuccess, error } = useForgotPassword();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      return;
    }

    sendResetEmail(email);
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Correo Enviado!
            </h2>
            <p className="text-sm text-gray-600">
              Hemos enviado un enlace de recuperación a <strong>{email}</strong>
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-xs text-blue-800">
              <strong> Nota:</strong> Revisa tu bandeja de entrada y spam. El enlace expirará en 1 hora.
            </p>
          </div>

          <Button
            onClick={onBackToLogin}
            variant="outline"
            className="w-full border-2 border-gray-300 hover:bg-gray-50"
          >
            ← Volver al inicio de sesión
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="text-sm text-gray-600">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Correo electrónico
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              disabled={isPending}
              className="w-full bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg">
              <p className="text-sm font-medium text-red-600">{error.message}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isPending || !email}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Spinner className="mr-2 h-5 w-5" />
                Enviando enlace...
              </>
            ) : (
              'Enviar enlace de recuperación'
            )}
          </Button>

          <Button
            type="button"
            onClick={onBackToLogin}
            variant="ghost"
            className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            ← Volver al inicio de sesión
          </Button>
        </form>
      </div>
    </div>
  );
}
