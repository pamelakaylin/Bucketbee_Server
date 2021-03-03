const bucketQueries = require('./Bucket/bucketQuery');
const bucketMutations = require('./Bucket/bucketMutation');
const userQueries = require('./User/userQuery');
const userMutations = require('./User/userMutation');
const chatQueries = require('./Chat/chatQuery');
const chatMutations = require('./Chat/chatMutation');

module.exports = {
  Query: {
    ...bucketQueries.Query,
    ...userQueries.Query,
    ...chatQueries.Query,
  },
  Mutation: {
    ...bucketMutations.Mutation,
    ...userMutations.Mutation,
    ...chatMutations.Mutation,
  },
};
