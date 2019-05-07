const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const {
  graphqlMongodbProjection
} = require('graphql-mongodb-projection');
if (dev) {
  require('dotenv').config();
}
const {
  ApolloServer,
  gql
} = require('apollo-server-express');
const MongoClient = require('mongodb').MongoClient;
const mongo = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true
});

const app = next({
  dev
});
const handle = app.getRequestHandler();

const typeDefs = gql `
  type Query {
    posts(skip: Int = 0, limit:Int = 10): [Post]

    post(id: Int!): Post
  }
  input PostI {
    _id: Int # null means new post
    title: String!
    content: String!
  }
  type Mutation {
    upsertPost(post: PostI!): UpsertResult
  }
  type Post {
    title: String
    content: String
    date: String
    comments: [Comment]
    _id: Int
  }
  type Comment {
    author: String
    content: String
  }
  type UpsertResult {
    modifiedCount: Int
    upsertedCount: Int
    _id: Int
  }
`;

const resolvers = {
  Query: {
    posts: (root, args, ctx, info) => {
      const {
        skip,
        limit
      } = args;
      return mongo.db('blog').collection('post')
        .find({}, graphqlMongodbProjection(info))
        .skip(skip)
        .limit(limit)
        .toArray();
    },

    post: (root, args) => {
      return mongo.db('blog').collection('post')
        .findOne({
          _id: args.id
        })
    }
  },
  Mutation: {
    upsertPost: async (_, {
      post
    }) => {
      async function getRecentId() {
        const recent = await mongo.db('blog').collection('post').find().sort([
          ['_id', -1]
        ]).limit(1).toArray();
        return recent[0]._id;
      }
      if (!post._id) {
        post._id = await getRecentId() + 1;
      }
      return mongo.db('blog').collection('post').updateOne({
        _id: post._id
      }, {
        $set: post
      }, {
        upsert: true
      }).then(({
          modifiedCount,
          upsertedCount
        }) =>
        ({
          modifiedCount,
          upsertedCount,
          _id: post._id
        })
      );
    }
  },
  Post: {},
  Comment: {}
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
        id: req.params.id
      }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/editor/:id', (req, res) => {
      const actualPage = '/editor'
      const queryParams = {
        id: req.params.id
      }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http: //localhost:3000${apolloServer.graphqlPath}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });