import { styled } from '@/../stitches.config';

export const Container = styled('main', {});

export const HeaderContainer = styled('header', {
   width: '$full',
   py: '$base',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   borderBottom: '1px solid $gray700',

   '& .userProfile': {
      '& img': {
         width: '$xl',
         height: '$xl',
         borderRadius: '50%',
      },
   },
});

export const NavigationContainer = styled('nav', {
   width: '$full',
   mx: '$xxl',

   '& ul': {
      width: '$full',
      display: 'flex',
      alignItems: 'center',

      '& li': {
         fontWeight: '$medium',
         paddingBottom: '4px',
         borderBottom: '2px solid transparent',
         cursor: 'pointer',
         transition: 'all 200ms ease-in-out',

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
   },
});
