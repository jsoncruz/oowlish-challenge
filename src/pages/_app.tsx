import NextNprogress from 'nextjs-progressbar';

import { ApolloProvider as Apollo } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '@assets/theme';
import client from '~/services/apollo';

function MyApp({ Component, pageProps }) {
  return (
    <Apollo client={client}>
      <ChakraProvider theme={theme} resetCSS>
        <NextNprogress
          color="#e03e1d"
          startPosition={0.2}
          stopDelayMs={200}
          height={5}
          options={{ easing: 'ease', speed: 250 }}
        />
        <Component {...pageProps} />
      </ChakraProvider>
    </Apollo>
  );
}

export default MyApp;
