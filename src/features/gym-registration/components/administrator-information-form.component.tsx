'use client';

import * as React from 'react';
import { useForm } from '@tanstack/react-form';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import type { AdministratorInformation, StepFormProps } from '../types/gym-registration.types';

interface AdministratorInformationFormProps extends StepFormProps {
  initialData?: Partial<AdministratorInformation>;
  onSubmit: (data: AdministratorInformation) => void;
}

function AdministratorInformationForm({
  initialData = {},
  onSubmit,
  onNext,
  onPrevious,
}: AdministratorInformationFormProps) {
  const form = useForm({
    defaultValues: {
      firstName: initialData.firstName || '',
      lastName: initialData.lastName || '',
      secondLastName: initialData.secondLastName || '',
      email: initialData.email || '',
      personalPhone: initialData.personalPhone || '',
    },
    onSubmit: ({ value }) => {
      onSubmit(value as AdministratorInformation);
      onNext();
    },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Información del Administrador
        </h2>
        <p className="text-gray-400">
          Datos del administrador principal que gestionará el gimnasio
        </p>
      </div>

      <form
        className="space-y-6 bg-gray-800 rounded-lg p-6 border border-gray-700"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Nombre y Primer Apellido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field
            name="firstName"
            validators={{
              onChange: ({ value }) =>
                !value || value.length < 2
                  ? 'El nombre debe tener al menos 2 caracteres'
                  : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-medium text-white flex items-center gap-1">
                  Nombre
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Juan Carlos"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="lastName"
            validators={{
              onChange: ({ value }) =>
                !value || value.length < 2
                  ? 'El primer apellido debe tener al menos 2 caracteres'
                  : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-medium text-white flex items-center gap-1">
                  Primer Apellido
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Rodríguez"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>

        {/* Segundo Apellido y Correo Electrónico */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name="secondLastName">
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Segundo Apellido{' '}
                  <span className="text-gray-500">(Opcional)</span>
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Mora"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
              </div>
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !value
                  ? 'El correo electrónico es requerido'
                  : !emailRegex.test(value)
                  ? 'Ingrese un correo electrónico válido'
                  : undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-medium text-white flex items-center gap-1">
                  Correo Electrónico
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="admin@tugym.com"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                <p className="text-xs text-gray-400">
                  Este correo se usará para acceder al sistema
                </p>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>

        {/* Teléfono Personal */}
        <form.Field
          name="personalPhone"
          validators={{
            onChange: ({ value }) => {
              const phoneRegex = /^\+?[\d\s-()]{8,}$/;
              return !value
                ? 'El teléfono personal es requerido'
                : !phoneRegex.test(value)
                ? 'Ingrese un número de teléfono válido'
                : undefined;
            },
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-white flex items-center gap-1">
                Teléfono Personal
                <span className="text-red-500">*</span>
              </label>
              <Input
                id={field.name}
                name={field.name}
                type="tel"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="+506 8888-8888"
                className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-red-500">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Información Importante */}
        <div className="border border-orange-500 rounded-lg p-4 bg-orange-500/10">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-orange-400 mb-2">
                Información Importante
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Este será el administrador principal del sistema</li>
                <li>• Tendrá acceso completo a todas las funcionalidades</li>
                <li>• Podrá crear otros usuarios administradores</li>
                <li>• Recibirá notificaciones importantes del sistema</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accesos del administrador */}
        <div className="border border-green-600 rounded-lg p-4 bg-green-600/10">
          <h4 className="text-sm font-medium text-green-400 mb-3">
            Accesos que tendrá este administrador:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Gestión completa de miembros
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Control de pagos y facturación
            </div>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between pt-4">
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
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2"
            disabled={!form.state.isValid}
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}

export { AdministratorInformationForm };