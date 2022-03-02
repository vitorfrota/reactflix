import { Suspense } from 'react';

import Loading from '@/pages/Loading';
import Routes from './routes';

const App = () => {
   return (
      <Suspense fallback={<Loading />}>
         <Routes />
      </Suspense>
   );
};

export default App;
