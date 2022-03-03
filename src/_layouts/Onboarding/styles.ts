import { styled } from '@/../stitches.config';
import { Link } from 'react-router-dom';

export const Container = styled('main', {
   width: '100vw',
   height: '100vh',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
   backgroundColor: '#fff',

   '& .content': {
      wrapper: '100%',
      width: '$full',
      maxWidth: '600px',
      margin: '0 auto',
      color: '$gray600',

      '& .steps': {
         color: '$gray500',
         fontSize: '0.75rem',
         textTransform: 'uppercase',
      },
   },

   '& footer': {
      py: '$base',
      color: '$gray600',
      textAlign: 'center',
      backgroundColor: '$gray100',
   },
});

export const AuthLink = styled(Link, {
   color: '$gray600',
   fontSize: '1.125rem',
   fontWeight: '$bold',

   '&:hover': {
      textDecoration: 'underline',
   },
});
