import { styled } from '@/../stitches.config';

export const Container = styled('div', {
   wrapper: '100%',
   px: '0',

   '& .catalogs': {
      marginTop: '70vh',

      'section + section': {
         marginTop: '$l',
      },
   },
});

export const LoadingContainer = styled('div', {
   wrapper: '100%',
   height: '100vh',
   display: 'grid',
   placeContent: 'center',
});
