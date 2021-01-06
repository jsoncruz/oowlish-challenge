import { ApolloClient, InMemoryCache } from '@apollo/client';

const endpoint = 'http://localhost:3000/api/graphql';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: endpoint,
  cache,
  ssrMode: true,
  queryDeduplication: false,
  credentials: 'same-origin',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default client;
