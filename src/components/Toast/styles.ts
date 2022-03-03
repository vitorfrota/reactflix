import { styled } from '@/../stitches.config';

export const Container = styled('div', {
   width: '$full',
   padding: '$base',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '$orange',
   color: '#fff',
   borderRadius: '4px',
   fontWeight: '$bold',

   '& svg': {
      width: '1.5rem',
      height: '1.5rem',
      marginRight: '$s',
   },
});
