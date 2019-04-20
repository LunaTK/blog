const express = require('express');
const next = require('next');
require('dotenv').config();
const {
  ApolloServer,
  gql
} = require('apollo-server-express');
global.fetch = require('node-fetch');
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
    post: [Post]
  }
  type Post {
    title: String
    content: String
    date: String
    comments: [Comment]
  }
  type Comment {
    author: String
    content: String
  }
`;

const resolvers = {
  Query: {
    post: () =>
      mongo.db('blog').collection('post').find().toArray(),
  },
  Post: {
    title: (post) => post.title,
    content: (post) => post.content,
    date: (post) => post.date,
    comments: (post) => post.comments
  },
  Comment: {
    author: (comment) => comment.author,
    content: (comment) => comment.content
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

    server.get('/post/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = {
        title: req.params.id
      }
      app.render(req, res, actualPage, queryParams)
    })

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