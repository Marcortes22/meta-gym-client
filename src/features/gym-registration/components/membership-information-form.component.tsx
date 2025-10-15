'use client';
import * as React from 'react';
import { useForm } from '@tanstack/react-form';
import { Button } from '@/shared/components/ui/button';
import { Spinner } from '@/shared/components/ui/spinner';
import type { MembershipInformation, StepFormProps } from '../types/gym-registration.types';
import { membershipInformationSchema } from '../schemas/validation.schemas';
import { createZodValidator } from '../utils/validation.utils';
interface MembershipInformationFormProps extends StepFormProps {
  initialData?: Partial<MembershipInformation>;
  onSubmit: (data: MembershipInformation) => void;
  isSubmitting?: boolean;
}
function MembershipInformationForm({
  initialData = {},
  onSubmit,
  onNext,
  onPrevious,
  isLastStep = true,
  isSubmitting = false,
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
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Estás a un paso de finalizar!
        </h2>
        <p className="text-gray-600 text-sm">
          Conoce las funcionalidades que tendrás disponibles en Meta Gym
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Sistema de Gestión Meta Gym
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-green-500 rounded-lg p-5 bg-green-50">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-green-700 mb-1">
                    Gestión de Miembros
                  </h4>
                  <p className="text-xs text-gray-700">
                    Registro completo, seguimiento de membresías y control de accesos
                  </p>
                </div>
              </div>
            </div>


            <div className="border-2 border-blue-500 rounded-lg p-5 bg-blue-50">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-blue-700 mb-1">
                    Reportes y Analytics
                  </h4>
                  <p className="text-xs text-gray-700">
                    Estadísticas de uso y métricas clave
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5 border-l-4 border-green-600 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-800">
                  <strong className="text-green-700 font-bold">¡Casi listo!</strong> Tu gimnasio estará configurado y listo para operar. 
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
          <form.Field
            name="acknowledged"
            validators={{
              onChange: createZodValidator(membershipInformationSchema.shape.acknowledged),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    className="mt-1 h-5 w-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-800 font-medium group-hover:text-gray-900">
                    Confirmo que la información proporcionada es correcta y estoy listo para crear mi cuenta de gimnasio en Meta Gym.
                  </span>
                </label>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm font-medium text-red-600 ml-8">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>
          <div className="flex justify-between pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 py-3 text-base font-semibold"
              disabled={isSubmitting}
            >
              ← Anterior
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-10 py-3 text-base font-semibold shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!form.state.isValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 h-5 w-5" />
                  Creando gimnasio...
                </>
              ) : (
                isLastStep ? '✓ Finalizar Registro' : 'Continuar →'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { MembershipInformationForm };