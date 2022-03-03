import { styled } from '@/../stitches.config';

export const Container = styled('header', {
   width: '$full',
   wrapper: '100%',
   py: '$base',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',

   variants: {
      fixed: {
         true: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
         },
      },
   },
});
