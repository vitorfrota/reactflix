import { styled } from '@/../stitches.config';

export const Container = styled('div', {
   position: 'relative',
   width: '$full',
   paddingBottom: '0.25rem',
   backgroundColor: '$gray600',
   borderRadius: '4px',
   borderBottom: '2px solid transparent',

   transition: 'all 150ms linear',

   '& label': {
      position: 'absolute',
      top: '$base',
      left: '$base',
      fontSize: '$base',
      color: '$gray300',
   },

   '& input': {
      width: '$full',
      height: '50px',
      paddingTop: '$base',
      px: '$base',
      background: 'none',
      color: '$text',
      fontSize: '1rem',
   },

   variants: {
      hasError: {
         true: {
            borderColor: '$orange',
         },
      },
      isFilled: {
         true: {
            '& label': {
               position: 'absolute',
               top: '8px',
               fontSize: '0.75rem',
            },
         },
      },
      isFocused: {
         true: {
            backgroundColor: '#454545',

            '& label': {
               position: 'absolute',
               top: '8px',
               fontSize: '0.75rem',
            },
         },
      },
   },
});

export const Error = styled('span', {
   marginTop: '4px',
   color: '$orange',
   fontSize: '0.875rem',
});
