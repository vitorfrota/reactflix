import { styled } from '@/../stitches.config';

export const Wrapper = styled('div', {
   width: '$full',
   display: 'flex',
   flexDirection: 'column',
});

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

   '& .complement': {
      position: 'absolute',
      top: '30%',
      right: '16px',
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
               fontSize: '0.875rem',
               fontWeight: '$bold',
            },
         },
      },
      isFocused: {
         true: {
            backgroundColor: '#454545',

            '& label': {
               position: 'absolute',
               top: '6px',
               fontSize: '0.875rem',
               fontWeight: '$bold',
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
         whiteBordered: {
            backgroundColor: '#fff',
            border: '1px solid $gray300',
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
      {
         variant: 'whiteBordered',
         isFocused: true,
         css: {
            backgroundColor: '#fff',
            borderColor: '$blue',

            '& input': {
               color: '$background',
            },
         },
      },
      {
         variant: 'whiteBordered',
         isFilled: true,
         css: {
            backgroundColor: '#fff',
            borderColor: '$green',

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
