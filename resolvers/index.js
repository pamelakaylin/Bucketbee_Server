const bucketQueries = require('./Bucket/bucketQuery');
const bucketMutations = require('./Bucket/bucketMutation');

module.exports = {
  Query: {
    ...bucketQueries.Query,
  },
  Mutation: {
    ...bucketMutations.Mutation,
  },
};
