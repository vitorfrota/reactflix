import { Link, Outlet, useLocation } from 'react-router-dom';

import defaultAvatarImg from '@/assets/img/defaultAvatar.svg';
import logoHeaderImg from '@/assets/img/logo1x.png';

import * as S from './styles';
import { useAuth } from '@/hooks/auth';
import { Profile } from '@/components';

const Logged = () => {
   return (
      <S.Container>
         <div className='wrapper'>
            <Header />
            <Outlet />
         </div>
      </S.Container>
   );
};

const Header = () => {
   const location = useLocation();

   return (
      <S.HeaderContainer>
         <img src={logoHeaderImg} alt='logo reactflix' />
         <S.NavigationContainer>
            <ul>
               <li className={(location.pathname = '/explore') && 'active'}>
                  <Link to='/'>Explore</Link>
               </li>
               <li>Categories</li>
            </ul>
         </S.NavigationContainer>
         <Profile />
      </S.HeaderContainer>
   );
};

export default Logged;
