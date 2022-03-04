import { ReactNode } from 'react';
import { AuthContextProvider } from './AuthContext';
import { ProfileContextProvider } from './ProfilesContext';
import { RegistrationContextProvider } from './RegistrationContext';

interface AppProviderProps {
   children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
   return (
      <AuthContextProvider>
         <RegistrationContextProvider>
            <ProfileContextProvider>{children}</ProfileContextProvider>
         </RegistrationContextProvider>
      </AuthContextProvider>
   );
};

export default AppProvider;
