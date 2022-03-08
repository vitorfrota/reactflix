import { styled } from '@/../stitches.config';

const boxShadow =
   'inset 300px -10px 20px rgba(7,9,11,1),' +
   'inset 400px -20px 20px rgba(7,9,11,0.65),' +
   'inset 500px -30px 40px rgba(7,9,11,0.55),' +
   'inset 600px -40px 30px rgba(7,9,11,0.45),' +
   'inset 3000px -50px 60px rgba(7,9,11,0.25)';

export const Container = styled('div', {
   width: '$full',
   wrapper: '100%',
});
export const Jumbotron = styled('section', {
   position: 'absolute',
   top: 0,
   left: 0,
   width: '$full',
   height: '70vh',
   paddingTop: '10rem',
   paddingBottom: '$l',
   backgroundSize: 'cover',
   boxShadow: boxShadow,

   '& .backgroundImage': {
      zIndex: '-1',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '$full',
      height: '70vh',
      opacity: '0.75',
   },

   '& .movieContent': {
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

      '& > p': {
         my: '$l',
         width: '$half',
         color: '$gray100',
         textAlign: 'justify',
         fontSize: '1.25rem',
         fontWeight: '$medium',
         lineHeight: '1.75rem',
      },

      '& .groupButtons': {
         marginTop: '$base',
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

export const MetaInformationContainer = styled('div', {
   my: '$base',
   display: 'flex',
   alignItems: 'center',
   color: '$gray200',
   fontSize: '$base',
   fontWeight: '$bold',

   '& *': {
      marginLeft: '$base',
   },

   '& .certification': {
      padding: '2px 4px',
      border: '1px solid $gray200',
   },

   '& .rating': {
      margin: 0,
      color: '$green',
   },
});

export const Menu = styled('ul', {
   position: 'absolute',
   bottom: 0,
   right: '20%',

   display: 'flex',
   alignItems: 'center',

   '& li': {
      paddingBottom: '4px',
      borderBottom: '2px solid transparent',
      fontWeight: '$medium',
      fontSize: '$base',
      textTransform: 'uppercase',
      cursor: 'pointer',

      '&:hover': {
         borderColor: '$primary',
      },

      '& + li': {
         marginLeft: '$xxl',
      },
   },

   '& .active': {
      borderColor: '$primary',
   },
});
