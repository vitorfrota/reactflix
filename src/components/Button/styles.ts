import { styled } from '@/../stitches.config';

export const Container = styled('button', {
   width: '$full',
   padding: '$base',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   fontSize: '$base',
   fontWeight: '$bold',
   borderRadius: '4px',

   variants: {
      variant: {
         primary: {
            backgroundColor: '$primary',
            color: '$text',
         },
      },
   },
});
