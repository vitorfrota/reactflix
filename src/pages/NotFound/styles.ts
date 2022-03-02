import { styled } from '@/../stitches.config';

export const Container = styled('div', {
   width: '100vw',
   height: '100vh',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
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
