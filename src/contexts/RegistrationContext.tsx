import { createContext, ReactNode, useCallback, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { auth } from '@/services/firebase';

type Signup = {
   name: string;
   email: string;
   password: string;
};

type CreatingUser = {
   name: string;
   email: string;
   password: string;
};

type RegistrationContextType = {
   createUser: (formData: Signup) => Promise<void>;
   errorMessage: string | null;
   formStore: CreatingUser;
   loading: boolean;
   setUserStoreRegistration: (formData: {}) => void;
};

type RegistrationContextProviderProps = {
   children: ReactNode;
};

export const RegistrationContext = createContext({} as RegistrationContextType);

export function RegistrationContextProvider({
   children,
}: RegistrationContextProviderProps) {
   const [formStore, setFormStore] = useState<CreatingUser>({} as CreatingUser);
   const [errorMessage, setErrorMessage] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);

   const setUserStoreRegistration = useCallback(
      (formData: {}) => {
         setFormStore((state) => {
            return {
               ...state,
               ...formData,
            };
         });
      },
      [formStore]
   );

   const createUser = useCallback(async (formData: Signup) => {
      const { name, email, password } = formData;

      setLoading(true);

      await createUserWithEmailAndPassword(auth, email, password)
         .then(() => {
            if (auth.currentUser) {
               updateProfile(auth.currentUser, {
                  displayName: name,
                  photoURL: '',
               });
            }
            setFormStore({} as CreatingUser);
            alert('Conta criada com sucesso!');
            setErrorMessage(null);
         })
         .catch(() => setErrorMessage('Houve um problema na criação da conta'))
         .finally(() => setLoading(false));
   }, []);

   return (
      <RegistrationContext.Provider
         value={{
            createUser,
            errorMessage,
            formStore,
            loading,
            setUserStoreRegistration,
         }}
      >
         {children}
      </RegistrationContext.Provider>
   );
}
