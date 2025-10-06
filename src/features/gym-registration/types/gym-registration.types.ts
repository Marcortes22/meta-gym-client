export interface GymInformation {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface AdministratorInformation {
  firstName: string;
  lastName: string;
  secondLastName?: string;
  email: string;
  personalPhone: string;
}

export interface MembershipInformation {
  hasBasicPlan: boolean;
  hasPremiumPlan: boolean;
  hasVipPlan: boolean;
  customPlans?: string[];
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