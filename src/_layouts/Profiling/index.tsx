import { Outlet } from 'react-router-dom';

import { Header } from '@/components';

import * as S from './styles';

const Profiling = () => {
   return (
      <S.Container>
         <Header />
         <div className='content'>
            <Outlet />
         </div>
      </S.Container>
   );
};

export default Profiling;
