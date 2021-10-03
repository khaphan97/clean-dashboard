import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import resolvers from './resolvers';
import typeDefs from './schema';
import content from '../models/content';

export async function startApolloServer(httpServer, app, port) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      content,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
  });

  httpServer.listen(port, () => console.log(`🚀 Server ready at http://localhost:${port}`));
}
