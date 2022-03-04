import { styled } from '@/../stitches.config';

export const Container = styled('main', {
   minHeight: '100vh',
   backgroundColor: '$gray700',

   '& .content': {
      wrapper: '100%',
      width: '$full',
      margin: '0 auto',
      marginTop: '$xxl',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      '& h1': {
         fontSize: '$xl',
         fontWeight: '$medium',
         textAlign: 'center',
      },
   },

   '@tablet': {
      '& .contentProfiles': {
         '& h1': {
            fontSize: '$l',
         },
      },
   },
});
