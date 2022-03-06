import { styled } from '@/../stitches.config';

const linearGradientDark = (side: 'left' | 'right') => {
   return (
      `linear-gradient(to ${side},` +
      'rgba(7,9,11, 1),' +
      'rgba(7,9,11, 0.75),' +
      'rgba(7,9,11, 0.5),' +
      'rgba(7,9,11, 0.25),' +
      'transparent)'
   );
};

export const Container = styled('section', {
   $$width: '360px',
   $$height: 'calc($$width / 1.77)',
   $$duration: '200ms',

   position: 'relative',
   width: '100%',
   px: '$base',

   '& h2': {
      marginBottom: '$base',
      fontSize: '1.5rem',
   },

   '& button': {
      zIndex: 2,
      position: 'absolute',
      top: '55%',
      background: 'transparent',

      '& svg': {
         width: '$l',
         height: '$l',
         color: '$primary',
      },
   },
});
export const CatalogContainer = styled('ul', {
   position: 'relative',
   width: '$full',

   overflowX: 'scroll',
   whiteSpace: 'nowrap',
   scrollBehavior: 'smooth',

   '-ms-overflow-style': 'none',
   'scrollbar-width': 'none',
   '&::-webkit-scrollbar': {
      display: 'none',
   },

   '&:before': {
      content: '',
      zIndex: '2',
      position: 'absolute',
      top: 0,
      left: '-1rem',
      height: '$$height',
      width: '40px',
      background: linearGradientDark('right'),
   },

   '&:after': {
      content: '',
      position: 'absolute',
      top: 0,
      right: 0,
      height: '$$height',
      width: '120px',
      background: linearGradientDark('left'),
   },
   variants: {
      titleHovered: {
         true: {
            '& li': {
               opacity: '0.3',

               '&:hover': {
                  opacity: '1',
               },
            },
         },
      },
   },
});

export const Title = styled('li', {
   position: 'relative',
   width: '$$width',
   height: '$$height',
   padding: '$base',
   display: 'inline-block',
   backgroundSize: 'cover',
   border: '2px solid $background',
   borderRadius: '2px',
   boxShadow: 'inset 0 -40px 40px rgba(7,9,11, 0.75)',
   cursor: 'pointer',

   transition: 'all $$duration ease-in-out',

   '& > p': {
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
