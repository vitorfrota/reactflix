import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import { Button, Input } from '@/components';
import { useProfile } from '@/hooks/profile';
import getValidationErrors from '@/utils/getValidationErrors';

import SelectAvatar from '../_components/SelectAvatar';

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
               name: Yup.string()
                  .max(16, 'Máximo de 16 caracteres para nomear')
                  .required('Nome obrigatório'),
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
                  updateAvatar={setSelectedAvatar}
               />
               <Input
                  type='text'
                  name='name'
                  label='Nome'
                  maxLength={16}
                  autoFocus
               />
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

export default AddProfile;
