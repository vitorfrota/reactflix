import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import defaultAvatarImg from '@/assets/img/defaultAvatar.svg';
import { useProfile } from '@/hooks/profile';

import * as S from './styles';
import { Spinner } from '@/components';

const Profiles = () => {
   const navigate = useNavigate();

   const { loading, profiles, selectProfile } = useProfile();

   const handleSelectProfile = useCallback((profileId: string) => {
      selectProfile(profileId);
      navigate('/explore');
   }, []);

   const canAddMoreProfile = useMemo(() => profiles.length < 4, [profiles]);

   if (loading) {
      return <Spinner size='large' />;
   }

   return (
      <>
         <h1>Quem está assistindo?</h1>
         <S.ProfilesList>
            {profiles.map((profile) => (
               <S.ProfileItem
                  key={profile.id}
                  onClick={() => handleSelectProfile(profile.id)}
               >
                  <img
                     src={profile.avatar}
                     alt={`avatar ${profile.name}`}
                     onError={(e) => (e.currentTarget.src = defaultAvatarImg)}
                  />
                  <p>{profile.name}</p>
               </S.ProfileItem>
            ))}
            {canAddMoreProfile && (
               <S.AddProfileContainer onClick={() => navigate('addProfile')}>
                  <FiPlus />
               </S.AddProfileContainer>
            )}
         </S.ProfilesList>
      </>
   );
};

export default Profiles;
