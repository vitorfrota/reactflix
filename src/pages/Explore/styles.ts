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

export const LoadingContainer = styled('div', {
   wrapper: '100%',
   height: '100vh',
   display: 'grid',
   placeContent: 'center',
});
