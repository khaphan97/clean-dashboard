const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./types/typeDefs');
const resolvers = require('./resolvers/resolvers');
const route = require('./routes');
const db = require('./config/database.js');
require('dotenv').config();

const port = process.env.PORT;

// Connect database
db.connect();
app.use(express.json());
app.use(cors());

route(app);

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

(async () => {
  await server.start();
  server.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
