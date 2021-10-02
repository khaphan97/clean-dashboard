import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';
import connectDB from './server';
import content from './models/content';

dotenv.config();

const port = process.env.PORT || 3000;
const url = process.env.DB_URL;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    content,
  }),
});

connectDB(url).then(res => {
  console.log('Database Connected');
  server.listen(port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
