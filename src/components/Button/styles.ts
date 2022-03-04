import { styled } from '@/../stitches.config';

export const Container = styled('button', {
   height: '56px',
   padding: '$base',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   fontSize: '$base',
   fontWeight: '$bold',
   border: '2px solid transparent',
   borderRadius: '4px',

   '& svg': {
      mx: '$s',
   },

   variants: {
      loading: {
         true: {
            opacity: '0.75',
            cursor: 'not-allowed',
         },
      },
      outline: {
         true: {
            backgroundColor: 'transparent',
            borderColor: '$gray400',
            color: '$gray400',
         },
      },
      noRadius: {
         true: {
            borderRadius: '0',
         },
      },
      variant: {
         primary: {
            backgroundColor: '$primary',
            color: '$text',
         },
      },
      size: {
         full: {
            width: '$full',
         },
         small: {
            height: 'auto',
            py: '$s',
         },
      },
   },
});
