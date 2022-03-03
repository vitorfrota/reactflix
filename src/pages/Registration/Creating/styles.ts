import { styled } from '@/../stitches.config';

export const Container = styled('main', {
   '& p': {
      marginTop: '$s',
      fontSize: '1.125rem',
      color: '$gray600',
   },

   '& form': {
      marginTop: '$s',
   },
});
