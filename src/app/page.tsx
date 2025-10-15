'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/features/auth/components/login-form.component';
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form.component';

export default function Home() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('reset') === 'success') {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {showSuccessMessage && (
          <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-lg p-4 shadow-lg animate-in slide-in-from-top-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-green-900 mb-1">
                  ¡Contraseña restablecida exitosamente!
                </h3>
                <p className="text-xs text-green-800">
                  Ahora puedes iniciar sesión con tu nueva contraseña
                </p>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="flex-shrink-0 text-green-600 hover:text-green-800"
                aria-label="Cerrar mensaje"
                title="Cerrar"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {showForgotPassword ? (
          <ForgotPasswordForm onBackToLogin={() => setShowForgotPassword(false)} />
        ) : (
          <LoginForm onForgotPassword={() => setShowForgotPassword(true)} />
        )}
      </div>
    </div>
  );
}
