const mongoose = require('mongoose');
const Bucket = require('../../models/bucketModel');

module.exports = {
  Query: {
    async getBuckets(_, { userId }) {
      const targetUser = mongoose.Types.ObjectId(userId);
      try {
        const allBuckets = await Bucket.find({ author: targetUser });
        return allBuckets;
      } catch (error) {
        console.log(error);
      }
    },

    async getBucketById(_, { bucketId }) {
      const targetBucket = mongoose.Types.ObjectId(bucketId);
      try {
        const bucket = await Bucket.findById(targetBucket);
        return bucket;
      } catch (e) {
        console.log(e);
      }
    },
  },
  Bucket: {
    categories(bucket) {
      return bucket.categories;
    },
  },
  Category: {
    places(category) {
      return category.places;
    },
  },
};
