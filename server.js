const express = require('express');
const next = require('next');
require('dotenv').config();
const {
  ApolloServer,
  gql
} = require('apollo-server-express');
const MongoClient = require('mongodb').MongoClient;
const mongo = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true
});

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev
});
const handle = app.getRequestHandler();

const typeDefs = gql `
  type Query {
    article: [Article]
  }
  type Article {
    title: String
    content: String
  }
`;

const resolvers = {
  Query: {
    article: () =>
      mongo.db('blog').collection('article').find().toArray(),
  },
  Article: {
    title: (article) => article.title,
    content: (article) => article.content
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});


app
  .prepare()
  .then(() => {
    const server = express();
    mongo.connect(err => {
      if (err) console.log(err)
    });
    apolloServer.applyMiddleware({
      app: server
    });
    const port = process.env.PORT || 3000;
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(` > Ready on http: //localhost:3000${apolloServer.graphqlPath}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });