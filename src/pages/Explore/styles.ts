import { styled } from '@/../stitches.config';

export const Container = styled('div', {
   wrapper: '100%',
   my: '$xl',

   '& .catalogs': {
      marginTop: '70vh',

      'div + div': {
         marginTop: '$xl',
      },
   },
});
