import { styled } from '@/../stitches.config';

export const Container = styled('main', {
   width: '100vw',
   minHeight: '100vh',
   paddingTop: '$base',
   display: 'grid',
   placeContent: 'center',

   '& footer': {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '$full',
      py: '$base',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      backgroundColor: 'rgba(0,0,0, 0.5)',
      color: '#757575',
   },
});

export const FormContainer = styled('div', {
   width: '500px',
   minHeight: '660px',
   margin: '0 auto',
   padding: '$xxl',
   display: 'flex',
   flexDirection: 'column',

   backgroundColor: 'rgba(0,0,0, 0.5)',
   borderRadius: '4px',

   '& h1': {
      marginBottom: '$l',
   },

   '& .extra': {
      width: '$full',
      marginTop: '$base',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      fontSize: '0.875rem',
      color: '$gray200',

      '& label': {
         marginLeft: '4px',
      },
   },

   '& .signupNow': {
      marginTop: '$xl',
      color: '$gray400',

      '& a': {
         color: '$text',
      },
   },

   '& > span': {
      marginTop: '$base',
      color: '$gray300',
      fontSize: '0.875rem',
   },
});

export const ButtonConnectWithGoogle = styled('button', {
   width: '$full',
   marginTop: '$xl',
   display: 'flex',
   alignItems: 'center',
   backgroundColor: 'transparent',
   color: '$gray400',
   border: 0,
   outline: 0,

   '& img': {
      width: '$base',
      height: '$base',
      marginRight: '$s',
   },
});
