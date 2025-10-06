export interface GymInformation {
  name: string;
  address: string;
  email: string;
  theme: 'light' | 'dark' | 'system';
  logo_url?: string;
  code: string;
  schedule?: Record<string, unknown>;
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