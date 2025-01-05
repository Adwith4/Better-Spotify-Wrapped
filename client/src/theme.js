import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    spotify: {
      black: '#191414',
      green: '#1DB954',
      gray: '#535353',
      white: '#FFFFFF',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'spotify.black',
        color: 'spotify.white',
      },
    },
  },
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
});

export default customTheme;
