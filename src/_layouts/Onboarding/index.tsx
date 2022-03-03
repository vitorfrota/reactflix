import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '@/components';

import * as S from './styles';

const Onboarding = () => {
   const location = useLocation();

   const currentStep = useMemo(() => {
      const { pathname } = location;
      switch (pathname) {
         case '/signup/registration':
            return 1;
         case '/signup/naming':
            return 2;
         default:
            return 0;
      }
   }, [location]);

   return (
      <S.Container>
         <Header containerStyle={{ borderBottom: '1px solid #e6e6e6' }}>
            <S.AuthLink to='/signin'>
               {currentStep > 1 ? 'Sair' : 'Entrar'}
            </S.AuthLink>
         </Header>
         <div className='content'>
            <span className='steps'>
               Passo <strong>{currentStep}</strong> de <strong>2</strong>
            </span>
            <Outlet />
         </div>
         <footer>
            <p>Desenvolvido por Vitor Frota - 2022</p>
         </footer>
      </S.Container>
   );
};

export default Onboarding;
