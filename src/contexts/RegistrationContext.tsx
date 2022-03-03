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
   formStore: CreatingUser;
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

      await createUserWithEmailAndPassword(auth, email, password)
         .then((_) => {
            const { currentUser } = auth;

            if (currentUser) {
               updateProfile(currentUser, {
                  displayName: name,
                  photoURL: '',
               }).catch((_) => {
                  throw new Error('Houve um problema na criação da conta');
               });
            }

            setFormStore({} as CreatingUser);
            alert('Conta criada com sucesso!');
         })
         .catch((_) => {
            throw new Error('Houve um problema na criação da conta');
         });
   }, []);

   return (
      <RegistrationContext.Provider
         value={{
            createUser,
            formStore,
            setUserStoreRegistration,
         }}
      >
         {children}
      </RegistrationContext.Provider>
   );
}
