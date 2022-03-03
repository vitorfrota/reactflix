import { styled, keyframes } from '@/../stitches.config';

export const Container = styled('div', {
   width: '100vw',
   height: '100vh',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
});

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

export const SpinnerContainer = styled('div', {
   width: '70px',
   height: '70px',
   border: '4px solid transparent',
   borderTop: '4px solid $primary',
   borderRadius: '50%',
   animation: `${spin} 300ms linear infinite`,
});
