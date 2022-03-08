import { Outlet } from 'react-router-dom';

import { Header } from '@/components';
import { AvatarContextProvider } from '@/contexts/AvatarContext';

import * as S from './styles';

const Profiling = () => {
   return (
      <S.Container>
         <Header />
         <div className='content'>
            <AvatarContextProvider>
               <Outlet />
            </AvatarContextProvider>
         </div>
      </S.Container>
   );
};

export default Profiling;
