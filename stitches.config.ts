import { createStitches } from '@stitches/react';

export const {
   styled,
   css,
   globalCss,
   keyframes,
   getCssText,
   theme,
   createTheme,
   config,
} = createStitches({
   theme: {
      colors: {
         primary: '#E50914',
         text: '#F2F2F2',
         complementary: '#4E4D54',
         background: '#07090B',
         gray700: '#16151A',
      },
      fontSizes: {
         s: '0.5rem',
         base: '1rem',
         m: '1.5rem',
         l: '2rem',
         xl: '3rem',
         xxl: '4rem',
      },
      fontWeights: {
         light: '300',
         regular: '400',
         medium: '500',
         bold: '700',
      },
      sizes: {
         full: '100%',
         half: '50%',
         s: '0.5rem',
         base: '1rem',
         m: '1.5rem',
         l: '2rem',
         xl: '3rem',
         xxl: '4rem',
      },
      space: {
         s: '0.5rem',
         base: '1rem',
         m: '1.5rem',
         l: '2rem',
         xl: '3rem',
         xxl: '4rem',
      },
   },
   media: {
      mobile: '(max-width: 767px)',
      tablet: '(max-width: 1024px)',
   },
   utils: {
      mx: (value: string) => ({ marginLeft: value, marginRight: value }),
      my: (value: string) => ({ marginTop: value, marginBottom: value }),
      px: (value: string) => ({ paddingLeft: value, paddingRight: value }),
      py: (value: string) => ({ paddingTop: value, paddingBottom: value }),
   },
});
