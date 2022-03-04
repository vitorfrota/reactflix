import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Header as HeaderComponent, Profile } from '@/components';
import { useProfile } from '@/hooks/profile';
import Loading from '@/pages/Loading';

import * as S from './styles';
import { useEffect } from 'react';

const Watching = () => {
   const navigate = useNavigate();
   const { currentProfile, profiles } = useProfile();

   useEffect(() => {
      if (profiles.length === 0) {
         navigate('/browse');
      }
   }, [profiles]);
   if (!currentProfile.id) return <Loading />;

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
