import { styled } from '@/../stitches.config';

export const ProfilesList = styled('ul', {
   width: '$half',
   marginTop: '$xl',
   display: 'flex',
   flexWrap: 'wrap',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '$xxl',

   '@laptop': {
      width: '$full',
   },
});

export const ProfileItem = styled('li', {
   position: 'relative',
   maxWidth: '180px',
   height: '180px',
   textAlign: 'center',
   cursor: 'pointer',

   '& img': {
      width: '$full',
      height: '$full',
      borderRadius: '2px',
   },

   '& svg': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '4px',
      width: '$l',
      height: '$l',
      border: '2px solid #fff',
      borderRadius: '50%',
   },

   '& p': {
      marginTop: '$s',
      color: '$gray200',
      fontWeight: '$medium',
   },

   variants: {
      canEdit: {
         true: {
            '& img': {
               opacity: '0.75',
            },
         },
      },
   },
});

export const AddProfileContainer = styled(ProfileItem, {
   height: '120px',
   width: '120px',
   display: 'grid',
   placeContent: 'center',
   backgroundColor: '$gray700',
   border: '2px solid $gray600',
   borderRadius: '2px',

   '& svg': {
      width: '60px',
      height: '60px',
   },
});
