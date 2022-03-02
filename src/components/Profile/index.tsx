import { useCallback, useEffect, useRef, useState } from 'react';

import { useAuth } from '@/hooks/auth';

import defaultAvatarImg from '@/assets/img/defaultAvatar.svg';
import * as S from './styles';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
   const navigate = useNavigate();
   const { user, signOut } = useAuth();

   const menuRef = useRef<HTMLDivElement>(null);
   const [showMenu, setShowMenu] = useState(false);

   useEffect(() => {
      const handleClickOutside = (event: any) => {
         if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
         }
      };

      if (showMenu) {
         document.addEventListener('click', handleClickOutside, true);
      }
      return () =>
         document.removeEventListener('click', handleClickOutside, true);
   }, [showMenu]);

   const handleToggleMenu = useCallback(() => {
      setShowMenu((state) => !state);
   }, [showMenu]);

   const handleSignout = useCallback(() => {
      navigate('/', { state: {}, replace: true });
      signOut();
   }, []);

   return (
      <S.Container>
         <S.BadgeContainer onClick={handleToggleMenu}>
            <img
               src={user?.avatar}
               alt={`avatar profile ${user?.name}`}
               onError={(e) => (e.currentTarget.src = defaultAvatarImg)}
            />
         </S.BadgeContainer>
         {showMenu && (
            <S.MenuContainer ref={menuRef}>
               <ul>
                  <li onClick={() => navigate('/account')} tabIndex={0}>
                     Conta
                  </li>
                  <li onClick={() => navigate('/help')} tabIndex={0}>
                     Ajuda
                  </li>
                  <li onClick={handleSignout} tabIndex={0}>
                     Sair da minha conta
                  </li>
               </ul>
            </S.MenuContainer>
         )}
      </S.Container>
   );
};
export default Profile;
