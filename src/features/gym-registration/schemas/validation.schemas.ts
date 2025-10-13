import { z } from 'zod';

// validacion de hora en formato HH:MM
const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

// Enum de los días de la semana
const dayOfWeekSchema = z.enum([
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
  'domingo',
]);

// Schema de rango de tiempo en el horario
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

// Schema de los dias de la semana con horarios
const dayScheduleSchema = z.object({
  day: dayOfWeekSchema,
  isOpen: z.boolean(),
  timeRanges: z.array(timeRangeSchema).min(1, 'Debe haber al menos un horario').optional(),
});

// Schema de la información del gimnasio
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



export const membershipInformationSchema = z.object({
  acknowledged: z
    .boolean()
    .refine((value) => value === true, {
      message: 'Debes confirmar para continuar',
    }),
});


export const gymRegistrationSchema = z.object({
  gym: gymInformationSchema,
  membership: membershipInformationSchema,
});


export type GymInformationFormData = z.infer<typeof gymInformationSchema>;
export type MembershipInformationFormData = z.infer<typeof membershipInformationSchema>;
export type GymRegistrationFormData = z.infer<typeof gymRegistrationSchema>;