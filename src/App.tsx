import { Suspense } from 'react';

import { AuthContextProvider } from '@/contexts/AuthContext';
import Loading from '@/pages/Loading';
import Routes from './routes';

const App = () => {
   return (
      <AuthContextProvider>
         <Suspense fallback={<Loading />}>
            <Routes />
         </Suspense>
      </AuthContextProvider>
   );
};

export default App;
