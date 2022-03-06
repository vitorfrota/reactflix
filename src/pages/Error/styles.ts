import { styled } from '@/../stitches.config';

import errorImg from '@/assets/img/error.jpg';

export const Container = styled('div', {
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100vh',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   background: `url(${errorImg}) no-repeat 100%`,
   backgroundSize: 'cover',
   color: '$text',
   textAlign: 'center',

   '& h1': {
      fontSize: '3.5rem',
      color: 'inherit',
      textShadow: '0 1px 2px rgb(0 0 0 / 57%)',
   },

   '& p': {
      margin: '1rem 0 2rem 0',
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      textShadow: '0 1px 2px rgb(0 0 0 / 57%)',
   },

   '& a': {
      padding: '0.75rem 1.5rem',
      backgroundColor: '$text',
      color: '$background',
      fontWeight: '$bold',
      borderRadius: '4px',
   },
});
