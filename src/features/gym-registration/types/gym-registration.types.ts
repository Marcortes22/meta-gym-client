export type DayOfWeek = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

export interface TimeRange {
  start: string; // Formato HH:MM
  end: string;   // Formato HH:MM
}

export interface DaySchedule {
  day: DayOfWeek;
  isOpen: boolean;
  timeRanges: TimeRange[];
}

export interface GymInformation {
  name: string;
  address: string;
  email: string;
  theme: 'blue' | 'red' | 'orange' | 'yellow'; // Matches Supabase enum
  logo_url?: string;
  code: string;
  schedule?: DaySchedule[];
}

/**
 * Form data structure for gym information
 * Maps to Supabase schema with different field names
 */
export interface GymInformationFormData {
  gym_name: string;
  email: string;
  address: string;
  theme_color: 'blue' | 'red' | 'orange' | 'yellow';
  gym_code: string;
  logo_url?: string;
  schedule: DaySchedule[];
}

export interface AdministratorInformation {
  name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface MembershipInformation {
  acknowledged: boolean;
}

export interface GymRegistrationData {
  gym: GymInformation;
  administrator: AdministratorInformation;
  membership: MembershipInformation;
}

export interface StepFormProps {
  onNext: () => void;
  onPrevious?: () => void;
  canProceed?: boolean;
  isLastStep?: boolean;
  isFirstStep?: boolean;
}

export type StepId = 'gym-info' | 'admin-info' | 'membership-info';

export interface StepperStep {
  id: StepId;
  title: string;
  description: string;
  number: number;
}