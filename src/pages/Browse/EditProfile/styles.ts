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
