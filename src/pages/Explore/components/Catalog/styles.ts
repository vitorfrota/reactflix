import { styled } from '@/../stitches.config';

const duration = '200ms';
const itemWidth = 360;
const itemHeight = itemWidth / (16 / 9);

export const Container = styled('div', {
   position: 'relative',
   width: '100%',

   '& h2': {
      marginBottom: '$base',
      fontSize: '1.5rem',
   },

   '& button': {
      zIndex: '4',
      position: 'absolute',
      top: '50%',
      backgroundColor: 'transparent',
      border: 0,

      '& svg': {
         width: '$xxl',
         height: '$xxl',
         color: '#fff',
      },
   },
});

export const CatalogContainer = styled('ul', {
   width: '$full',

   transition: `all ${duration} linear`,
   overflowX: 'scroll',
   whiteSpace: 'nowrap',
   scrollBehavior: 'smooth',

   '&::-webkit-scrollbar': {
      display: 'none',
   },

   '-ms-overflow-style': 'none',
   'scrollbar-width': 'none',

   '&:hover': {
      '& li': {
         opacity: '0.3',

         '&:hover': {
            opacity: 1,
         },
      },
   },

   '&:before': {
      content: '',
      position: 'absolute',
      zIndex: 2,
      left: '0',
      width: '60px',
      height: `${itemHeight}px`,
      background: 'linear-gradient(to right, rgba(7,9,11, 1), transparent)',
   },

   '&:after': {
      content: '',
      position: 'absolute',
      right: '0',
      width: '60px',
      height: `${itemHeight}px`,
      background: 'linear-gradient(to left, rgba(7,9,11, 1), transparent)',
   },
});

export const ItemCatalog = styled('li', {
   position: 'relative',
   width: `${itemWidth}px`,
   height: `${itemHeight}px`,
   padding: '$base',
   display: 'inline-block',
   backgroundSize: 'cover',
   border: '2px solid $background',
   borderRadius: '2px',
   boxShadow: 'inset 0 -80px 40px rgba(0,0,0,0.5)',
   cursor: 'pointer',

   transition: `all ${duration} linear`,

   '& > div': {
      position: 'absolute',
      bottom: '$base',
      left: '$base',
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      fontWeight: '$bold',
   },

   '& + li': {
      marginLeft: '$s',
   },

   '&:hover': {
      borderColor: '#fff',
   },
});
