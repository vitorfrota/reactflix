import { styled } from '@/../stitches.config';

export const Container = styled('div', {
   position: 'relative',
   width: '$full',
   height: '56px',
   backgroundColor: '$gray600',
   borderRadius: '4px',
   borderBottom: '2px solid transparent',

   transition: 'all 150ms linear',

   '& label': {
      position: 'absolute',
      top: '30%',
      left: '$base',
      fontSize: '$base',
      fontWeight: '$medium',
      color: '$gray300',
   },

   '& input': {
      width: '$full',
      height: '$full',
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
               top: '6px',
               fontSize: '0.75rem',
            },
         },
      },
      isFocused: {
         true: {
            backgroundColor: '#454545',

            '& label': {
               position: 'absolute',
               top: '6px',
               fontSize: '0.75rem',
            },
         },
      },
      noRadius: {
         true: {
            borderRadius: 0,
         },
      },
      variant: {
         white: {
            backgroundColor: '#fff',

            '& input': {
               color: '$background',
            },
         },
      },
   },
   compoundVariants: [
      {
         variant: 'white',
         isFocused: true,
         css: {
            backgroundColor: '#fff',

            '& input': {
               color: '$background',
            },
         },
      },
   ],
});

export const Error = styled('span', {
   marginTop: '4px',
   color: '$orange',
   fontSize: '0.875rem',
});
