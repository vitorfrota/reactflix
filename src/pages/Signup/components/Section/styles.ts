import { styled } from '@/../stitches.config';

export const Container = styled('section', {
   width: '$full',
   py: '$xl',
   borderTop: '8px solid $gray700',

   '& .wrapper': {
      wrapper: '1110px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
   },

   '& h1': {
      fontSize: '$xl',
   },

   '& h2': {
      marginTop: '$l',
      fontWeight: '$normal',
   },

   '& img': {
      maxWidth: '450px',
   },

   variants: {
      reverse: {
         true: {
            '& .wrapper': {
               flexDirection: 'row-reverse',

               '@tablet': {
                  flexDirection: 'column',
               },
            },
         },
      },
   },

   '@tablet': {
      '& .wrapper': {
         flexDirection: 'column',
         alignItems: 'center',
         textAlign: 'center',

         '& img': {
            marginBottom: '$xl',
         },
      },
      '& h1': {
         fontSize: '$l',
      },

      '& img': {
         maxWidth: '320px',
      },
   },
});
