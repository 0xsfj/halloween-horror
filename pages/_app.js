import '../styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  // fonts: {
  //   heading: 'Syne',
  //   body: 'Syne',
  // },
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#FAE9D1',
    whiteAlpha: {
      900: '#FAE9D1',
    },
    gray: {
      50: 'green',
      700: 'purple',
      800: '#000',
      900: 'orange',
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

// const theme = extendTheme({ colors, config })

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
