import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiPlus } from 'react-icons/fi';

import defaultAvatarImg from '@/assets/img/defaultAvatar.svg';
import { Button } from '@/components';
import { useProfile } from '@/hooks/profile';
import Loading from '@/pages/Loading';

import * as S from './styles';

const Profiles = () => {
   const navigate = useNavigate();
   const [canEdit, setCanEdit] = useState(false);

   const { loading, profiles, selectProfile } = useProfile();

   const handleSelectProfile = useCallback(
      (profileId: string) => {
         selectProfile(profileId);
         const url = canEdit ? './editProfile' : '/explore';
         navigate(url);
      },
      [canEdit]
   );

   const canAddMoreProfile = useMemo(() => profiles.length < 4, [profiles]);

   if (loading) return <Loading />;

   return (
      <>
         <h1>Quem está assistindo?</h1>
         <S.ProfilesList>
            {profiles.map((profile) => (
               <S.ProfileItem
                  key={profile.id}
                  onClick={() => handleSelectProfile(profile.id)}
                  onKeyPress={() => handleSelectProfile(profile.id)}
                  canEdit={canEdit}
                  tabIndex={0}
               >
                  <img
                     src={profile.avatar}
                     alt={`avatar ${profile.name}`}
                     loading='lazy'
                     onError={(e) => (e.currentTarget.src = defaultAvatarImg)}
                  />
                  <p>{profile.name}</p>
                  {canEdit && <FiEdit2 />}
               </S.ProfileItem>
            ))}
            {canAddMoreProfile && (
               <S.AddProfileContainer
                  onClick={() => navigate('addProfile')}
                  onKeyPress={() => navigate('addProfile')}
                  tabIndex={0}
               >
                  <FiPlus />
               </S.AddProfileContainer>
            )}
         </S.ProfilesList>
         {profiles.length > 0 && (
            <Button
               containerStyle={{
                  marginTop: '5rem',
                  textTransform: 'uppercase',
               }}
               onClick={() => setCanEdit((state) => !state)}
               noRadius
               outline={!canEdit}
            >
               {canEdit ? 'feito' : 'gerenciar perfis'}
            </Button>
         )}
      </>
   );
};

export default Profiles;
