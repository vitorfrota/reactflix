import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { FiEdit2 as FiEdit } from 'react-icons/fi';

import * as Yup from 'yup';

import defaultAvatarImg from '@/assets/img/defaultAvatar.svg';
import { Button, Input } from '@/components';
import { useProfile } from '@/hooks/profile';
import getValidationErrors from '@/utils/getValidationErrors';

import * as S from './styles';

interface ICreateProfileData {
   avatar: string;
   name: string;
}

const AddProfile = () => {
   const navigate = useNavigate();

   const [selectedAvatar, setSelectedAvatar] = useState('');
   const formRef = useRef<FormHandles>(null);

   const { createProfile } = useProfile();

   const handleSubmit = useCallback(
      async (formData: ICreateProfileData) => {
         try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
               name: Yup.string().required('Nome obrigatório'),
            });

            await schema.validate(formData, {
               abortEarly: false,
            });

            await createProfile({
               ...formData,
               avatar: selectedAvatar,
            });
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

   return (
      <S.Container>
         <h1 style={{ textAlign: 'left' }}>Adicionar perfil</h1>
         <p>Adicione um novo perfil para outra pessoa usar o Reactflix.</p>
         <S.Form ref={formRef} onSubmit={handleSubmit}>
            <fieldset className='row'>
               <SelectAvatar
                  selectedAvatar={selectedAvatar}
                  cb={setSelectedAvatar}
               />
               <Input type='text' name='name' label='Nome' />
            </fieldset>
            <div className='row'>
               <Button type='submit' variant='primary' noRadius>
                  Continuar
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

export default AddProfile;
