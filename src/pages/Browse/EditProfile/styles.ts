import { styled } from '@/../stitches.config';
import { Form as UnForm } from '@unform/web';

export const Container = styled('section', {
   width: '$half',
   margin: '0 auto',
   textAlign: 'left',

   '& p': {
      marginTop: '$base',
      color: '$gray300',
      fontSize: '1.5rem',
   },

   '@tablet': {
      width: '$full',
   },
});

export const Form = styled(UnForm, {
   '& .row': {
      display: 'flex',
      alignItems: 'center',
   },

   '& fieldset': {
      my: '$base',
      py: '$base',
      borderTop: '1px solid $gray600',
      borderBottom: '1px solid $gray600',
   },

   '& img': {
      maxWidth: '160px',
      marginRight: '$base',
   },

   '& button': {
      textTransform: 'uppercase',
   },
});

export const SelectAvatarContainer = styled('div', {
   position: 'relative',
});

export const ButtonSelectAvatar = styled('div', {
   height: '140px',
   width: '140px',
   marginRight: '$base',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundSize: 'cover',
   cursor: 'pointer',

   '& input, svg': {
      display: 'none',
   },

   '& svg': {
      color: '#fff',
   },

   '&:hover': {
      opacity: '0.75',

      '& svg': {
         display: 'block',
      },
   },
});

export const AvatarsList = styled('ul', {
   position: 'absolute',
   top: '100%',
   width: '500px',
   padding: '$s',
   display: 'grid',
   gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
   gap: '$base',
   backgroundColor: '$gray700',
   border: '1px solid $gray600',

   '& li': {
      '&:hover': {
         cursor: 'pointer',
         opacity: '0.75',
      },
   },
});
