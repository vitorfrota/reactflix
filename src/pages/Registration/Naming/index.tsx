import { useCallback, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Button, Input } from '@/components';
import getValidationErrors from '@/utils/getValidationErrors';
import { RegistrationContext } from '@/contexts/RegistrationContext';

import * as S from './styles';

interface IRegistrationData {
   name: string;
}

const Naming = () => {
   const navigate = useNavigate();
   const { formStore, createUser } = useContext(RegistrationContext);
   const formRef = useRef<FormHandles>(null);

   const handleSubmit = useCallback(
      async (formData: IRegistrationData) => {
         try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
               name: Yup.string().required('Nome obrigatório'),
            });

            await schema.validate(formData, {
               abortEarly: false,
            });

            const userToCreate = {
               ...formStore,
               ...formData,
            };

            await createUser(userToCreate);
            navigate('/signin');
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
         <h1>Como podemos chamar você?</h1>
         <p>Estamos quase concluindo!</p>
         <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
               type='text'
               name='name'
               variant='whiteBordered'
               label='Nome'
               noRadius
            />
            <Button
               type='submit'
               size={'full'}
               variant={'primary'}
               containerStyle={{ marginTop: '16px', fontSize: '1.5rem' }}
               noRadius
            >
               Próximo
            </Button>
         </Form>
      </S.Container>
   );
};

export default Naming;
