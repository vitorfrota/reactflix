import { Link, Outlet, useLocation } from 'react-router-dom';

import { Header as HeaderComponent, Profile } from '@/components';

import * as S from './styles';

const Watching = () => {
   return (
      <S.Container>
         <Header />
         <Outlet />
      </S.Container>
   );
};

const Header = () => {
   const location = useLocation();

   return (
      <HeaderComponent>
         <S.NavigationContainer>
            <ul>
               <li className={(location.pathname = '/explore') && 'active'}>
                  <Link to='/'>Explore</Link>
               </li>
            </ul>
         </S.NavigationContainer>
         <Profile />
      </HeaderComponent>
   );
};

export default Watching;
