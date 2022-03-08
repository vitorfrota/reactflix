import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Button, Input } from '@/components';
import { useProfile } from '@/hooks/profile';
import Loading from '@/pages/Loading';
import getValidationErrors from '@/utils/getValidationErrors';

import SelectAvatar from '../_components/SelectAvatar';

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
                  updateAvatar={setSelectedAvatar}
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

export default EditProfile;
