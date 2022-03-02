import { styled } from '@/../stitches.config';

export const Container = styled('button', {
   padding: '$base',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   fontSize: '$base',
   fontWeight: '$medium',
   borderRadius: '4px',

   '& svg': {
      mx: '$s',
   },

   variants: {
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
            py: '$s',
         },
      },
   },
});
