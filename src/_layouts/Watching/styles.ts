import { styled } from '@/../stitches.config';

export const Container = styled('main', {
   width: '$full',
   wrapper: '100%',

   '& > header': {
      zIndex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
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

export const CategoriesContainer = styled('div', {
   position: 'absolute',
   top: '64px',
   left: 0,
   right: 0,
   width: '$full',
   padding: '$base',

   backgroundColor: '$gray700',
});
