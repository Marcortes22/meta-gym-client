'use client';

import * as React from 'react';
import { useForm } from '@tanstack/react-form';
import { Button } from '@/shared/components/ui/button';
import type { MembershipInformation, StepFormProps } from '../types/gym-registration.types';
import { membershipInformationSchema } from '../schemas/validation.schemas';
import { createZodValidator } from '../utils/validation.utils';

interface MembershipInformationFormProps extends StepFormProps {
  initialData?: Partial<MembershipInformation>;
  onSubmit: (data: MembershipInformation) => void;
}

function MembershipInformationForm({
  initialData = {},
  onSubmit,
  onNext,
  onPrevious,
  isLastStep = true,
}: MembershipInformationFormProps) {
  const form = useForm({
    defaultValues: {
      acknowledged: initialData.acknowledged || false,
    },
    onSubmit: ({ value }) => {
      onSubmit(value as MembershipInformation);
      if (!isLastStep) {
        onNext();
      }
    },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          ¡Estás a un paso de finalizar!
        </h2>
        <p className="text-gray-400">
          Conoce las funcionalidades que tendrás disponibles en Meta Gym
        </p>
      </div>

      <div className="space-y-6 bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Sistema de Gestión Meta Gym
          </h3>

  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-green-600 rounded-lg p-4 bg-green-600/10">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-400 mb-1">
                    Gestión de Miembros
                  </h4>
                  <p className="text-xs text-gray-300">
                    Registro completo, seguimiento de membresías y control de accesos
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-blue-600 rounded-lg p-4 bg-blue-600/10">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-400 mb-1">
                    Control Financiero
                  </h4>
                  <p className="text-xs text-gray-300">
                    Facturación, pagos, reportes financieros y análisis de ingresos
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-purple-600 rounded-lg p-4 bg-purple-600/10">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-purple-400 mb-1">
                    Horarios y Clases
                  </h4>
                  <p className="text-xs text-gray-300">
                    Programación de clases, reservas y gestión de instructores
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-orange-600 rounded-lg p-4 bg-orange-600/10">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-orange-400 mb-1">
                    Reportes y Analytics
                  </h4>
                  <p className="text-xs text-gray-300">
                    Estadísticas de uso, análisis de rendimiento y métricas clave
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-blue-500 rounded-lg p-4 bg-blue-500/10">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-400 mb-2">
                  Configuración Posterior
                </h4>
                <p className="text-sm text-gray-300 mb-2">
                  Una vez completado el registro, podrás configurar:
                </p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Planes de membresía personalizados con precios</li>
                  <li>• Horarios de operación del gimnasio</li>
                  <li>• Equipos y áreas disponibles</li>
                  <li>• Instructores y personal</li>
                  <li>• Métodos de pago aceptados</li>
                  <li>• Promociones y descuentos</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nota de bienvenida */}
          <div className="bg-gray-700 rounded-lg p-4 border-l-4 border-green-500">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-300">
                  <strong className="text-green-400">¡Casi listo!</strong> Tu gimnasio estará configurado y listo para operar. 
                  Recibirás credenciales de acceso por correo electrónico para comenzar a usar el sistema.
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* Checkbox de confirmación */}
          <form.Field
            name="acknowledged"
            validators={{
              onChange: createZodValidator(membershipInformationSchema.shape.acknowledged),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    className="mt-1 h-4 w-4 text-green-500 bg-gray-900 border-gray-600 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-300">
                    Confirmo que la información proporcionada es correcta y estoy listo para crear mi cuenta de gimnasio en Meta Gym.
                  </span>
                </label>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500 ml-7">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Anterior
            </Button>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-2"
              disabled={!form.state.isValid}
            >
              {isLastStep ? 'Finalizar Registro' : 'Continuar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { MembershipInformationForm };