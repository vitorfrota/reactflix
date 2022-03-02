import { styled } from '@/../stitches.config';

import backgroundImg from '@/assets/img/mainBackground.jpg';

export const Container = styled('main', {
   width: '$full',
   background: '#000',

   '& .faqListContainer': {
      width: '$full',
      my: '$xxl',
   },
});

export const HeroContainer = styled('section', {
   width: '$full',
   height: '75vh',
   display: 'flex',
   flexDirection: 'column',
   background: `url(${backgroundImg}) 100% no-repeat`,
   backgroundSize: 'cover',

   '& .content': {
      width: '35vw',
      margin: '0 auto',
      py: '$xxl',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
   },

   '& h1': {
      fontSize: '$xl',
   },

   '& h2': {
      marginTop: '$base',
      marginBottom: '$l',
      fontWeight: '$medium',
   },

   '@laptop': {
      '& .content': {
         width: '$half',
         px: '$l',
      },
   },
   '@tablet': {
      height: '$half',

      '& .content': {
         width: '$full',
         padding: '$l',
      },
   },
});

export const FormContainer = styled('div', {
   '& p': {
      fontSize: '1.25rem',
      fontWeight: '$medium',
   },
   '& form': {
      width: '$full',
      height: '60px',
      marginTop: '$l',
      display: 'flex',
      alignItems: 'center',

      '& *': {
         height: '$full',
      },
   },
});
