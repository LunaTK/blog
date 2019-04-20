const express = require('express');
const next = require('next');
const {
  ApolloServer,
  gql
} = require('apollo-server-express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev
});
const handle = app.getRequestHandler();

const typeDefs = gql `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});


app
  .prepare()
  .then(() => {
    const server = express();
    apolloServer.applyMiddleware({
      app: server
    });
    const port = process.env.PORT || 8080;
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });