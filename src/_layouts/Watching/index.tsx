import { Link, Outlet, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Header as HeaderComponent, Profile } from '@/components';
import { useProfile } from '@/hooks/profile';
import Loading from '@/pages/Loading';

import * as S from './styles';

const queryClient = new QueryClient();

const Watching = () => {
   const { currentProfile } = useProfile();

   if (!currentProfile.id) return <Loading />;

   return (
      <S.Container>
         <Header />
         <QueryClientProvider client={queryClient}>
            <Outlet />
         </QueryClientProvider>
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
                  <Link to='/explore'>Explore</Link>
               </li>
            </ul>
         </S.NavigationContainer>
         <Profile />
      </HeaderComponent>
   );
};

export default Watching;
