import { useAuth } from '@/hooks/auth';
import {
   createContext,
   ReactNode,
   useCallback,
   useEffect,
   useState,
} from 'react';

type RegistrationContextType = {
   currentStep: number;
   formData: {};
   handleSetUserInformation: (formData: {}) => void;
};

type CreatingUser = {
   name: string;
   email: string;
   password: string;
};

type RegistrationContextProviderProps = {
   children: ReactNode;
};

export const RegistrationContext = createContext({} as RegistrationContextType);

export function RegistrationContextProvider({
   children,
}: RegistrationContextProviderProps) {
   const { createUser } = useAuth();
   const [currentStep, setCurrentStep] = useState(1);
   const [formData, setFormData] = useState<CreatingUser>({} as CreatingUser);

   useEffect(() => {
      if (currentStep > 3) {
         createUser(formData);
      }
   }, [currentStep]);

   const handleSetUserInformation = useCallback(
      (formData: {}) => {
         setFormData((state) => {
            return {
               ...state,
               ...formData,
            };
         });

         setCurrentStep((state) => state + 1);
      },
      [currentStep, formData]
   );

   return (
      <RegistrationContext.Provider
         value={{
            currentStep,
            formData,
            handleSetUserInformation,
         }}
      >
         {children}
      </RegistrationContext.Provider>
   );
}
