import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiChevronRight } from 'react-icons/fi';

import { Button, Header, Input } from '@/components';
import { Faq } from '@/containers';
import { ISectionSignUp, sections } from '@/constants/sectionsLanding';
import { RegistrationContext } from '@/contexts/RegistrationContext';

import Section from './components/Section';

import * as S from './styles';
const Signup = () => {
   const navigate = useNavigate();

   return (
      <S.Container>
         <S.HeroContainer>
            <Header>
               <Button
                  size={'small'}
                  variant={'primary'}
                  onClick={() => navigate('/signin')}
               >
                  Entrar
               </Button>
            </Header>
            <div className='content'>
               <h1>Filmes, séries e muito mais. Sem limites.</h1>
               <h2>Assista onde quiser. Cancele quando quiser.</h2>
               <FormSignup />
            </div>
         </S.HeroContainer>
         {sections.map((section: ISectionSignUp) => (
            <Section reverse={section.reverse}>
               <div className='wrapper'>
                  <img src={section.image} alt={`${section.title}`} />
                  <div>
                     <h1>{section.title}</h1>
                     <h2>{section.description}</h2>
                  </div>
               </div>
            </Section>
         ))}
         <Section>
            <div className='wrapper' style={{ flexDirection: 'column' }}>
               <h1>Perguntas frequentes</h1>
               <div style={{ margin: '2rem 0', width: '100%' }}>
                  <Faq />
               </div>
               <FormSignup />
            </div>
         </Section>
         <Section>
            <div className='wrapper' style={{ justifyContent: 'center' }}>
               <p style={{ color: '#737373' }}>
                  Desenvolvido por Vitor Frota - 2022
               </p>
            </div>
         </Section>
      </S.Container>
   );
};

const FormSignup = () => {
   const { setUserStoreRegistration } = useContext(RegistrationContext);

   const navigate = useNavigate();

   const handleNextStepToCreateAccount = useCallback((formData: {}) => {
      setUserStoreRegistration(formData);
      navigate('signup/registration');
   }, []);

   return (
      <S.FormContainer>
         <p>
            Pronto para assistir? Informe seu email para criar ou reiniciar sua
            assinatura.
         </p>
         <Form onSubmit={handleNextStepToCreateAccount}>
            <Input
               type='email'
               name='email'
               label='E-mail'
               containerStyle={{ flex: 2 }}
               variant={'white'}
               noRadius
            />
            <Button
               type='submit'
               containerStyle={{
                  marginLeft: '4px',
                  flex: 1,
                  fontSize: '1.5rem',
               }}
               variant={'primary'}
               noRadius
            >
               Vamos lá
               <FiChevronRight />
            </Button>
         </Form>
      </S.FormContainer>
   );
};

export default Signup;
