import { styled } from '@/../stitches.config';

export const Container = styled('li', {
   width: '$full',
   display: 'flex',
   flexDirection: 'column',
   backgroundColor: '$gray600',
   fontWeight: '$normal',
   fontSize: '1.5rem',
   cursor: 'pointer',

   '& svg': {
      width: '$l',
      height: '$l',
   },

   '& .questionContainer': {
      py: '$base',
      px: '$l',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
   },

   '& .answerContainer': {
      py: '$base',
      px: '$l',
      borderTop: '1px solid $background',
   },

   '& + li': {
      marginTop: '$s',
   },

   variants: {
      opened: {
         true: {
            '& svg': {
               transform: 'rotate(45deg)',
            },
         },
      },
   },
});
