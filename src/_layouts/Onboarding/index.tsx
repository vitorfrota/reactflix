import { Outlet } from 'react-router-dom';

import { Header } from '@/components';
import { RegistrationContext } from '@/contexts/RegistrationContext';

import * as S from './styles';
import { useContext } from 'react';

const Onboarding = () => {
   return (
      <S.Container>
         <Header containerStyle={{ borderBottom: '1px solid #e6e6e6' }}>
            <S.AuthLink to='/signin'>Entrar</S.AuthLink>
         </Header>

         <div className='content'>
            <Steps />
            <Outlet />
         </div>

         <footer>
            <p>Desenvolvido por Vitor Frota - 2022</p>
         </footer>
      </S.Container>
   );
};

const Steps = () => {
   const { currentStep } = useContext(RegistrationContext);
   return (
      <span className='steps'>
         Passo <strong>{currentStep}</strong> de <strong>3</strong>
      </span>
   );
};

export default Onboarding;
