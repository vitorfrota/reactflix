import { styled } from '@/../stitches.config';

export const Container = styled('div', {
   position: 'relative',
});

export const BadgeContainer = styled('button', {
   display: 'flex',
   flexDirection: 'column',
   backgroundColor: 'transparent',

   '& img': {
      width: '$xl',
      height: '$xl',
      borderRadius: '50%',
   },
});

export const MenuContainer = styled('div', {
   position: 'absolute',
   top: '$xxl',
   right: '0',
   width: '230px',
   maxWidth: '230px',
   padding: '$base',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'flex-start',
   backgroundColor: '$gray700',

   '& li': {
      fontSize: '$base',
      fontWeight: '$medium',
      cursor: 'pointer',

      '& + li': {
         marginTop: '$base',
      },
   },
});
