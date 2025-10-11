'use client';

import * as React from 'react';
import { useForm } from '@tanstack/react-form';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import type { GymInformation, StepFormProps } from '../types/gym-registration.types';
import { gymInformationSchema } from '../schemas/validation.schemas';
import { createZodValidator } from '../utils/validation.utils';
import { SchedulePicker } from './schedule-picker.component';

interface GymInformationFormProps extends StepFormProps {
  initialData?: Partial<GymInformation>;
  onSubmit: (data: GymInformation) => void;
}

function GymInformationForm({
  initialData = {},
  onSubmit,
  onNext,
}: GymInformationFormProps) {
  const form = useForm({
    defaultValues: {
      name: initialData.name || '',
      address: initialData.address || '',
      email: initialData.email || '',
      theme: initialData.theme || 'blue' as const,
      logo_url: initialData.logo_url || '',
      code: initialData.code || '',
      schedule: initialData.schedule || [],
    },
    onSubmit: ({ value }) => {
      onSubmit(value as GymInformation);
      onNext();
    },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Información del Gimnasio
        </h2>
        <p className="text-gray-400">
          Cuéntanos sobre tu gimnasio para crear tu perfil personalizado
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
        {/* Nombre del Gimnasio */}
        <form.Field
          name="name"
          validators={{
            onChange: createZodValidator(gymInformationSchema.shape.name),
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-white flex items-center gap-1">
                Nombre del Gimnasio
                <span className="text-red-500">*</span>
              </label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Ej: Fitness Pro Costa Rica"
                className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
              />
              <p className="text-xs text-gray-400">
                Este será el nombre que vean tus miembros
              </p>
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-red-500">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Correo del Gimnasio */}
        <form.Field
          name="email"
          validators={{
            onChange: createZodValidator(gymInformationSchema.shape.email),
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-white flex items-center gap-1">
                Correo del Gimnasio
                <span className="text-red-500">*</span>
              </label>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="info@tugym.com"
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

        {/* Tema y Código del Gimnasio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field
            name="theme"
            validators={{
              onChange: createZodValidator(gymInformationSchema.shape.theme),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={`gym-${field.name}`} className="text-sm font-medium text-white flex items-center gap-1">
                  Color del Tema
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id={`gym-${field.name}`}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as 'blue' | 'red' | 'orange' | 'yellow')}
                  onBlur={field.handleBlur}
                  title="Selecciona el color del tema"
                  aria-label="Color del Tema"
                  className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option value="blue">🔵 Azul</option>
                  <option value="red">🔴 Rojo</option>
                  <option value="orange">🟠 Naranja</option>
                  <option value="yellow">🟡 Amarillo</option>
                </select>
                <p className="text-xs text-gray-400">
                  Elige el color principal para tu gimnasio
                </p>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="code"
            validators={{
              onChange: createZodValidator(gymInformationSchema.shape.code),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-medium text-white flex items-center gap-1">
                  Código del Gimnasio
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Ej: GYM001, FIT-CR"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                <p className="text-xs text-gray-400">
                  Código único para identificar tu gimnasio (solo mayúsculas y números)
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

        {/* Logo URL */}
        <form.Field
          name="logo_url"
          validators={{
            onChange: createZodValidator(gymInformationSchema.shape.logo_url),
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                URL del Logo <span className="text-gray-500">(Opcional)</span>
              </label>
              <Input
                id={field.name}
                name={field.name}
                type="url"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="https://ejemplo.com/logo.png"
                className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
              />
              <p className="text-xs text-gray-400">
                Puedes subir tu logo más tarde desde el panel de administración
              </p>
            </div>
          )}
        </form.Field>

        {/* Dirección */}
        <form.Field
          name="address"
          validators={{
            onChange: createZodValidator(gymInformationSchema.shape.address),
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-white flex items-center gap-1">
                Dirección del Gimnasio
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Calle principal, Barrio, Ciudad, Provincia"
                rows={3}
                className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-red-500">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Horario del Gimnasio */}
        <form.Field name="schedule">
          {(field) => (
            <div className="space-y-2">
              <SchedulePicker
                value={field.state.value || []}
                onChange={(schedule) => field.handleChange(schedule)}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-red-500">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Botón de continuar */}
        <div className="flex justify-end pt-4">
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

export { GymInformationForm };