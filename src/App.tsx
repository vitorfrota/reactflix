import { Suspense } from 'react';

import { AuthContextProvider } from '@/contexts/AuthContext';
import { RegistrationContextProvider } from '@/contexts/RegistrationContext';
import Loading from '@/pages/Loading';
import Routes from './routes';

const App = () => {
   return (
      <AuthContextProvider>
         <RegistrationContextProvider>
            <Suspense fallback={<Loading />}>
               <Routes />
            </Suspense>
         </RegistrationContextProvider>
      </AuthContextProvider>
   );
};

export default App;
