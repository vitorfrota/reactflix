import { styled } from '@/../stitches.config';

const boxShadow =
   'inset 0 1000px 20px rgba(7,9,11,0.5),' +
   'inset 0 -10px 40px rgba(7,9,11,0.9),' +
   'inset 0 -20px 30px rgba(7,9,11,0.85),' +
   'inset 0 -30px 60px rgba(7,9,11,0.8)';

export const Container = styled('section', {
   position: 'absolute',
   top: 0,
   left: 0,
   width: '$full',
   height: '70vh',
   paddingTop: '10rem',
   paddingBottom: '$l',
   backgroundSize: 'cover',
   boxShadow: boxShadow,

   transition: 'all 500ms ease-in-out',

   '& .movieContent': {
      height: '35vh',
      wrapper: '1600px',
      px: 0,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',

      '& h1': {
         fontSize: '$xl',
      },

      '& p': {
         width: '$half',
         color: '$gray100',
         textAlign: 'justify',
         fontSize: '1.25rem',
         fontWeight: '$medium',
         lineHeight: '1.75rem',
      },

      '& .groupButtons': {
         display: 'flex',
         gap: '$base',
      },
   },

   '@tablet': {
      '& .movieContent': {
         px: '$xl',

         '& p': {
            width: '600px',
            fontSize: '$base',
         },
      },
   },
});
