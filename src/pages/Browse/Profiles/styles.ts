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
   maxWidth: '180px',
   height: '180px',
   textAlign: 'center',
   cursor: 'pointer',

   '& img': {
      width: '$full',
      height: '$full',
      borderRadius: '2px',
   },

   '& p': {
      marginTop: '$s',
      color: '$gray200',
      fontWeight: '$medium',
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
