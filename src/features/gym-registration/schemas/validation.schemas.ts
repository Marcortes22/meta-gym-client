import { z } from 'zod';

// Time validation regex (HH:MM format)
const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

// Day of week enum
const dayOfWeekSchema = z.enum([
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
  'domingo',
]);

// Time range schema
const timeRangeSchema = z.object({
  start: z
    .string()
    .regex(timeRegex, 'Formato de hora inválido (debe ser HH:MM)')
    .refine((val) => {
      const [hours, minutes] = val.split(':').map(Number);
      return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    }, 'Hora inválida'),
  end: z
    .string()
    .regex(timeRegex, 'Formato de hora inválido (debe ser HH:MM)')
    .refine((val) => {
      const [hours, minutes] = val.split(':').map(Number);
      return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    }, 'Hora inválida'),
}).refine(
  (data) => {
    const startMinutes = parseInt(data.start.split(':')[0]) * 60 + parseInt(data.start.split(':')[1]);
    const endMinutes = parseInt(data.end.split(':')[0]) * 60 + parseInt(data.end.split(':')[1]);
    return endMinutes > startMinutes;
  },
  {
    message: 'La hora de fin debe ser posterior a la hora de inicio',
  }
);

// Day schedule schema
const dayScheduleSchema = z.object({
  day: dayOfWeekSchema,
  isOpen: z.boolean(),
  timeRanges: z.array(timeRangeSchema).min(1, 'Debe haber al menos un horario').optional(),
});

// Gym Information Schema
export const gymInformationSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre del gimnasio debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  address: z
    .string()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(255, 'La dirección no puede exceder 255 caracteres'),
  email: z
    .string()
    .email('Formato de email inválido')
    .min(1, 'El email es requerido'),
  theme: z.enum(['blue', 'red', 'orange', 'yellow'], {
    message: 'Selecciona un tema válido',
  }),
  logo_url: z
    .string()
    .url('La URL del logo debe ser válida')
    .optional()
    .or(z.literal('')),
  code: z
    .string()
    .min(3, 'El código debe tener al menos 3 caracteres')
    .max(10, 'El código no puede exceder 10 caracteres')
    .regex(
      /^[A-Z0-9]+$/,
      'El código solo debe contener letras mayúsculas y números'
    ),
  schedule: z.array(dayScheduleSchema).optional(),
});

// Administrator Information Schema
export const administratorInformationSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  last_name: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'),
  email: z
    .string()
    .email('Formato de email inválido')
    .min(1, 'El email es requerido'),
  phone: z
    .string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(15, 'El teléfono no puede exceder 15 dígitos')
    .regex(
      /^[\d\s\-\+\(\)]+$/,
      'El teléfono solo puede contener números, espacios, guiones, paréntesis y signo más'
    ),
});

// Membership Information Schema (for display/confirmation)
export const membershipInformationSchema = z.object({
  acknowledged: z
    .boolean()
    .refine((value) => value === true, {
      message: 'Debes confirmar para continuar',
    }),
});

// Combined Schema for the entire registration flow
export const gymRegistrationSchema = z.object({
  gym: gymInformationSchema,
  administrator: administratorInformationSchema,
  membership: membershipInformationSchema,
});

// Type exports
export type GymInformationFormData = z.infer<typeof gymInformationSchema>;
export type AdministratorInformationFormData = z.infer<typeof administratorInformationSchema>;
export type MembershipInformationFormData = z.infer<typeof membershipInformationSchema>;
export type GymRegistrationFormData = z.infer<typeof gymRegistrationSchema>;