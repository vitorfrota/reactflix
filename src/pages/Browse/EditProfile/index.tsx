import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { FiEdit2 as FiEdit } from 'react-icons/fi';
import * as Yup from 'yup';

import defaultAvatarImg from '@/assets/img/defaultAvatar.svg';
import { Button, Input } from '@/components';
import { useProfile } from '@/hooks/profile';
import Loading from '@/pages/Loading';
import getValidationErrors from '@/utils/getValidationErrors';

import * as S from './styles';

interface ICreateProfileData {
   avatar: string;
   name: string;
}

const EditProfile = () => {
   const navigate = useNavigate();

   const { updateProfile, currentProfile, deleteProfile } = useProfile();

   const [selectedAvatar, setSelectedAvatar] = useState('');
   const formRef = useRef<FormHandles>(null);

   useEffect(() => {
      if (!currentProfile.id) navigate(-1);
      setSelectedAvatar(currentProfile.avatar);
   }, [currentProfile]);

   const handleSubmit = useCallback(
      async (formData: ICreateProfileData) => {
         try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
               name: Yup.string()
                  .max(16, 'Máximo de 16 caracteres para nomear')
                  .required('Nome obrigatório'),
            });

            await schema.validate(formData, {
               abortEarly: false,
            });

            await updateProfile(currentProfile.id, {
               ...formData,
               avatar: selectedAvatar,
            }).then(() => navigate(-1));
         } catch (error) {
            if (error instanceof Yup.ValidationError) {
               const errors = getValidationErrors(error);
               formRef.current?.setErrors(errors);
               return;
            }
         }
      },
      [formRef.current]
   );

   const handleDeleteProfile = useCallback(
      (profileId: string) => {
         deleteProfile(profileId).then(() => navigate(-1));
      },
      [currentProfile]
   );

   if (!currentProfile.id) return <Loading />;

   return (
      <S.Container>
         <h1 style={{ textAlign: 'left' }}>Editar perfil</h1>
         <S.Form
            ref={formRef}
            initialData={currentProfile}
            onSubmit={handleSubmit}
         >
            <fieldset className='row'>
               <SelectAvatar
                  selectedAvatar={selectedAvatar}
                  cb={setSelectedAvatar}
               />
               <Input type='text' name='name' label='Nome' maxLength={16} />
            </fieldset>
            <div className='row'>
               <Button type='submit' noRadius>
                  Salvar
               </Button>
               <Button
                  type='button'
                  onClick={() => navigate(-1)}
                  containerStyle={{ marginLeft: '1rem' }}
                  noRadius
                  outline
               >
                  Cancelar
               </Button>
               <Button
                  type='button'
                  onClick={() => handleDeleteProfile(currentProfile.id)}
                  containerStyle={{ marginLeft: '1rem' }}
                  noRadius
                  outline
               >
                  Deletar perfil
               </Button>
            </div>
         </S.Form>
      </S.Container>
   );
};

interface ISelectAvatarProps {
   selectedAvatar: string;
   cb: (avatarPath: string) => void;
}

const SelectAvatar = ({ selectedAvatar, cb }: ISelectAvatarProps) => {
   const [showList, setShowList] = useState(false);
   const { avatars } = useProfile();

   const listRef = useRef<HTMLUListElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: any) => {
         if (listRef.current && !listRef.current.contains(event.target)) {
            setShowList(false);
         }
      };

      if (showList) {
         document.addEventListener('click', handleClickOutside, true);
      }
      return () =>
         document.removeEventListener('click', handleClickOutside, true);
   }, [showList]);

   const avatarPreview = useMemo(
      () => (selectedAvatar ? selectedAvatar : defaultAvatarImg),
      [selectedAvatar]
   );

   const handleSelectAvatar = useCallback(
      (avatarPath: string) => {
         cb(avatarPath);
         setShowList((state) => !state);
      },
      [showList]
   );

   return (
      <S.SelectAvatarContainer>
         <S.ButtonSelectAvatar
            style={{ backgroundImage: `url(${avatarPreview})` }}
            onClick={() => setShowList((state) => !state)}
         >
            <FiEdit />
         </S.ButtonSelectAvatar>
         {showList && (
            <S.AvatarsList ref={listRef}>
               {avatars.map((avatar) => (
                  <li
                     key={avatar.id}
                     onClick={() => handleSelectAvatar(avatar.path)}
                  >
                     <img src={avatar.path} alt='' />
                  </li>
               ))}
            </S.AvatarsList>
         )}
      </S.SelectAvatarContainer>
   );
};

export default EditProfile;
