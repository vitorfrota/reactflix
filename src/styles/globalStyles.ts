import { globalCss } from '../../stitches.config';

export default globalCss({
   '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
   },

   html: {
      fontSize: '16px',
      fontFamily: 'Open Sans, sans-serif',
      backgroundColor: '$background',
      color: '$text',
   },

   ul: {
      listStyle: 'none',
   },

   a: {
      color: 'inherit',
      textDecoration: 'none',
      cursor: 'pointer',
   },

   button: {
      border: 0,
      cursor: 'pointer',
   },

   input: {
      border: 0,
      outline: 0,
   },

   fieldset: {
      border: 0,
   },

   '.wrapper': {
      width: '$full',
      maxWidth: '1600px',
      margin: '0 auto',
      px: '1rem',
   },

   '@tablet': {
      html: {
         fontSize: '93.75%',
      },
   },
   '@mobile': {
      html: {
         fontSize: '86.25%',
      },
   },
});
