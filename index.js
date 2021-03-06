const { ApolloServer, PubSub } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    pubsub,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server at ${url} 🚀..`);
});
