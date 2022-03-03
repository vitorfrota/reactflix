import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Button, Header, Input } from '@/components';
import { useAuth } from '@/hooks/auth';
import getValidationErrors from '@/utils/getValidationErrors';

import googleLogoImg from '@/assets/img/googleImg.png';
import loginBgImg from '@/assets/img/mainBackground.jpg';

import * as S from './styles';

const containerStyles = {
   background: `url(${loginBgImg}) no-repeat 100%`,
   backgroundSize: 'cover',
};

interface ISigninData {
   email: string;
   password: string;
}

const Signin = () => {
   const { signInWithEmail, signInWithGoogle } = useAuth();
   const formRef = useRef<FormHandles>(null);

   const handleSubmit = useCallback(
      async (formData: ISigninData) => {
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

            await signInWithEmail(formData);
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

   const handleConnectWithGoogle = useCallback(() => {
      signInWithGoogle();
   }, []);

   return (
      <S.Container style={containerStyles}>
         <Header fixed />
         <S.FormContainer>
            <h1>Entrar</h1>
            <Form ref={formRef} onSubmit={handleSubmit}>
               <Input type='email' name='email' label='E-mail' required />
               <Input
                  type='password'
                  name='password'
                  label='Senha'
                  containerStyle={{ marginTop: '16px' }}
               />
               <Button
                  type='submit'
                  variant={'primary'}
                  containerStyle={{ marginTop: '48px' }}
                  size={'full'}
               >
                  Entrar
               </Button>
            </Form>
            <div className='extra'>
               <div>
                  <input
                     type='checkbox'
                     name='rememberLogin'
                     id='rememberLogin'
                  />
                  <label htmlFor='rembemberLogin'>Lembre-se de mim</label>
               </div>
               <p>Precisa de ajuda?</p>
            </div>
            <S.ButtonConnectWithGoogle onClick={handleConnectWithGoogle}>
               <img src={googleLogoImg} alt='google logo' />
               Conectar com Google
            </S.ButtonConnectWithGoogle>
            <div className='signupNow'>
               Novo por aqui?
               <Link to='/signup/registration'> Assine agora</Link>
            </div>
            <span>
               Esta página é protegida pelo Senhor reCAPTCHA para garantir que
               você não é um robô.
            </span>
         </S.FormContainer>
         <footer>
            <p>Desenvolvido por Vitor Frota - 2022</p>
         </footer>
      </S.Container>
   );
};

export default Signin;
