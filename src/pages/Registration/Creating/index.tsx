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
   email: string;
   password: string;
}

const Creating = () => {
   const navigate = useNavigate();
   const { formData, handleSetUserInformation } =
      useContext(RegistrationContext);
   const formRef = useRef<FormHandles>(null);

   const handleSubmit = useCallback(
      async (formData: IRegistrationData) => {
         try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
               email: Yup.string()
                  .required('E-mail obrigatório')
                  .email('Digite um e-mail válido'),
               password: Yup.string()
                  .min(4, 'A senha deve ter entre 4 e 60 caracteres')
                  .required('A senha deve ter entre 4 e 60 caracteres'),
            });

            await schema.validate(formData, {
               abortEarly: false,
            });

            handleSetUserInformation(formData);
            navigate('../naming');
         } catch (error) {
            if (error instanceof Yup.ValidationError) {
               const errors = getValidationErrors(error);
               formRef.current?.setErrors(errors);

               return;
            }

            alert('E-mail ou senha incorretos');
         }
      },
      [formRef.current]
   );
   return (
      <S.Container>
         <h1>Crie uma senha para iniciar sua assinatura.</h1>
         <p>Faltam só mais alguns passos!</p>
         <p>Nós também detestamos formulários.</p>
         <Form ref={formRef} initialData={formData} onSubmit={handleSubmit}>
            <Input
               type='email'
               name='email'
               variant='whiteBordered'
               label='Email'
               noRadius
            />
            <Input
               type='password'
               name='password'
               variant='whiteBordered'
               label='Adicione uma senha'
               containerStyle={{ marginTop: '8px' }}
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

export default Creating;
