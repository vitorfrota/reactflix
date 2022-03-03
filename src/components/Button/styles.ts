import { styled } from '@/../stitches.config';

export const Container = styled('button', {
   height: '56px',
   padding: '$base',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   fontSize: '$base',
   fontWeight: '$bold',
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
