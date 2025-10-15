'use client';

import * as React from 'react';
import { GymRegistrationStepper } from '../../../features/gym-registration/components/gym-registration-stepper.component';
import type { GymRegistrationData } from '../../../features/gym-registration/types/gym-registration.types';
import { Button } from '@/shared/components/ui/button';

export default function GymRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);

  const handleRegistrationComplete = async (data: GymRegistrationData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Datos de registro del gimnasio:', data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsCompleted(true);
    } catch (error) {
      console.error('Error al registrar el gimnasio:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center space-y-6 bg-white rounded-2xl shadow-xl p-12 border border-gray-200 max-w-md">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full"></div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Procesando tu registro...
            </h2>
            <p className="text-gray-600">
              Estamos configurando tu gimnasio, por favor espera.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-lg mx-auto text-center space-y-8 bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
          {/* Success Icon */}
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce-slow">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-green-400 rounded-full mx-auto animate-ping opacity-20"></div>
          </div>
          
          {/* Title and Description */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              ¡Registro Completado!
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Tu gimnasio ha sido registrado exitosamente. Revisa tu correo para las credenciales de acceso.
            </p>
          </div>


          <div className="space-y-3 text-sm bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-800 font-medium">Perfil del gimnasio creado</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-800 font-medium">Usuario administrador creado</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-800 font-medium">Email de bienvenida enviado</span>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-base font-semibold shadow-lg transition-all duration-200"
            >
              Iniciar Sesión
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 py-3 text-base font-semibold"
            >
              Registrar Otro Gimnasio
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Registro de Gimnasio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Configura tu gimnasio en Meta Gym siguiendo estos sencillos pasos. 
            Te guiaremos a través del proceso para personalizar tu experiencia.
          </p>
        </div>
        <GymRegistrationStepper
          onComplete={handleRegistrationComplete}
          className="max-w-4xl mx-auto"
        />
      </div>
    </div>
  );
}