import { useState, useCallback } from "react";
import { useCreateGym } from "./use-gym-registration.hooks";
import type {
  GymRegistrationData,
  GymInformation,
  MembershipInformation,
  StepId,
  GymInformationFormData,
} from "../types/gym-registration.types";

interface UseGymRegistrationFormOptions {
  onComplete?: (data: GymRegistrationData) => void;
}
interface GymRegistrationFormState {
  gym: Partial<GymInformation>;
  membership: Partial<MembershipInformation>;
}
const initialFormState: GymRegistrationFormState = {
  gym: {
    name: "",
    address: "",
    email: "",
    theme: "blue" as const,
    logo_url: "",
    code: "",
    schedule: [],
  },
  membership: {
    acknowledged: false,
  },
};
export function useGymRegistrationForm({
  onComplete,
}: UseGymRegistrationFormOptions = {}) {
  const [formData, setFormData] =
    useState<GymRegistrationFormState>(initialFormState);
  const [completedSteps, setCompletedSteps] = useState<StepId[]>([]);
  const {
    mutate: createGym,
    isPending,
    error,
  } = useCreateGym({
    onSuccess: (response) => {
      console.log("Gym creado con éxito:", response.data);
      const finalData: GymRegistrationData = {
        gym: formData.gym as GymInformation,
        membership: formData.membership as MembershipInformation,
      };
      onComplete?.(finalData);
    },
    onError: (error) => {
      console.error("Error creando gimnasio:", error.message);
    },
  });

  const handleGymSubmit = useCallback(
    (data: GymInformation) => {
      setFormData((prev) => ({ ...prev, gym: data }));

      if (!completedSteps.includes("gym-info")) {
        setCompletedSteps((prev) => [...prev, "gym-info"]);
      }
    },
    [completedSteps]
  );

  const handleMembershipSubmit = useCallback(
    (data: MembershipInformation) => {
      setFormData((prev) => ({ ...prev, membership: data }));

      if (!completedSteps.includes("membership-info")) {
        setCompletedSteps((prev) => [...prev, "membership-info"]);
      }

      const gymFormData: GymInformationFormData = {
        gym_name: formData.gym.name || "",
        email: formData.gym.email || "",
        address: formData.gym.address || "",
        theme_color: formData.gym.theme || "blue",
        gym_code: formData.gym.code || "",
        logo_url: formData.gym.logo_url,
        schedule: formData.gym.schedule || [],
      };
      createGym(gymFormData);
    },
    [formData.gym, completedSteps, createGym]
  );

  const markStepComplete = useCallback((stepId: StepId) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId) ? prev : [...prev, stepId]
    );
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setCompletedSteps([]);
  }, []);

  return {
    formData,
    completedSteps,
    isPending,
    error,
    handleGymSubmit,
    handleMembershipSubmit,
    markStepComplete,
    resetForm,
  };
}
