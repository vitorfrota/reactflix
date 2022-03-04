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

   '& .menuList': {
      paddingTop: '$base',

      '& li': {
         fontSize: '$base',
         fontWeight: '$medium',
         cursor: 'pointer',

         '& + li': {
            marginTop: '$base',
         },
      },
   },
});

export const ProfilesList = styled('ul', {
   width: '$full',
   paddingBottom: '$base',
   display: 'flex',
   flexDirection: 'column',
   gap: '$base',
   borderBottom: '1px solid $gray600',
   '& li': {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',

      '& img': {
         width: '$l',
         height: '$l',
         borderRadius: '50%',
      },

      '& p': {
         marginLeft: '8px',
         fontSize: '0.875rem',
         color: '$gray200',
      },

      '&:hover': {
         opacity: '0.75',
      },
   },
});
