import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/auth';
import { useProfile } from '@/hooks/profile';

import defaultAvatarImg from '@/assets/img/defaultAvatar.svg';

import * as S from './styles';

const Profile = () => {
   const navigate = useNavigate();

   const { signOut } = useAuth();
   const { currentProfile, profiles, selectProfile } = useProfile();

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

   const handleSelectProfile = useCallback(
      (profileId: string) => {
         selectProfile(profileId);
         setShowMenu(false);
      },
      [profiles]
   );

   const handleToggleMenu = useCallback(() => {
      setShowMenu((state) => !state);
   }, [showMenu]);

   const handleSignout = useCallback(() => {
      navigate('/signin', { replace: true });
      signOut();
   }, []);

   return (
      <S.Container>
         <S.BadgeContainer onClick={handleToggleMenu}>
            <img
               src={currentProfile?.avatar || defaultAvatarImg}
               alt={`avatar profile ${currentProfile.name}`}
            />
         </S.BadgeContainer>
         {showMenu && (
            <S.MenuContainer ref={menuRef}>
               <S.ProfilesList>
                  {profiles
                     .filter((profile) => profile.id !== currentProfile.id)
                     .map((profile) => (
                        <li
                           key={profile.id}
                           onClick={() => handleSelectProfile(profile.id)}
                        >
                           <img
                              src={profile.avatar || defaultAvatarImg}
                              alt={`avatar do perfil ${profile.name}`}
                           />
                           <p>{profile.name}</p>
                        </li>
                     ))}
                  <Link to='/browse'>Gerenciar perfis</Link>
               </S.ProfilesList>
               <ul className='menuList'>
                  <li onClick={() => navigate('/account')} tabIndex={0}>
                     Conta
                  </li>
                  <li onClick={() => navigate('/help')} tabIndex={0}>
                     Ajuda
                  </li>
                  <li onClick={handleSignout} tabIndex={0}>
                     Sair do Reactflix
                  </li>
               </ul>
            </S.MenuContainer>
         )}
      </S.Container>
   );
};
export default Profile;
