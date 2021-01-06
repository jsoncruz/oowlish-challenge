import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-micro';

import resolvers from '@graphql/resolvers';

const schema = loadSchemaSync('./graphql/schema.graphql', {
  loaders: [new GraphQLFileLoader()],
});

const server = new ApolloServer({
  cacheControl: {
    defaultMaxAge: 5,
  },
  schema: addResolversToSchema({
    schema,
    resolvers,
  }),
});

export default server.createHandler({
  path: '/api/graphql',
  disableHealthCheck: false,
});

export const config = {
  api: {
    bodyParser: false,
  },
};
