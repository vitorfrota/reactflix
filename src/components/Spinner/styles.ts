import { styled, keyframes } from '@/../stitches.config';

const spin = keyframes({
   '0%': {
      transform: 'rotate(0deg)',
   },
   '50%': {
      transform: 'rotate(180deg)',
   },
   '100%': {
      transform: 'rotate(360deg)',
   },
});

export const Wrapper = styled('div', {
   display: 'grid',
   placeContent: 'center',
   overflow: 'hidden',
   variants: {
      fullScreen: {
         true: {
            width: '100%',
         },
      },
   },
});

export const Container = styled('div', {
   width: '120px',
   height: '120px',
   border: '4px solid transparent',
   borderTop: '4px solid $primary',
   borderRadius: '50%',
   animation: `${spin} 250ms linear infinite`,

   variants: {
      variant: {
         light: {
            borderTopColor: '#fff',
         },
         dark: {
            borderTopColor: '$background',
         },
      },
      size: {
         full: {
            width: '$full',
            height: '$full',
         },
         small: {
            width: '1.5rem',
            height: '1.5rem',
            borderTopWidth: '2px',
         },
         large: {
            width: '$xxl',
            height: '$xxl',
         },
      },
   },
});
