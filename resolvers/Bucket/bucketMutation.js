/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const Bucket = require('../../models/bucketModel');

const user = mongoose.Types.ObjectId('60381804843e75adbe8dcba3');

module.exports = {
  Mutation: {
    async createBucket(_, { input, place }) {
      const { title, notes, category } = input;
      const author = user;
      const date_created = new Date().toISOString();
      const members = [author];
      let categories = [];
      if (category) {
        const catID = new mongoose.Types.ObjectId();
        let places = [];
        if (place) places = [place];
        const newCategory = { _id: catID, label: category, places };
        categories = [newCategory];
      }
      const bucketObj = {
        title,
        author,
        members,
        date_created,
        notes,
        categories,
      };

      const newBucket = await Bucket.create(bucketObj);
      return newBucket;
    },

    async addCategory(_, { bucketId, label }) {
      console.log('whatsup');
      const targetBucket = mongoose.Types.ObjectId(bucketId);
      const catID = new mongoose.Types.ObjectId();
      const newCategory = { _id: catID, label, places: [] };
      const updatedBucket = await Bucket.findByIdAndUpdate(
        targetBucket,
        {
          $push: { categories: newCategory },
        },
        { new: true },
      );
      const newCat = updatedBucket.categories.find(
        (cat) => cat.id === String(catID),
      );
      return newCat;
    },

    async addPlace(_, { catId, input }) {
      const targetCat = mongoose.Types.ObjectId(catId);
      const placeID = new mongoose.Types.ObjectId();
      const placeObj = { _id: placeID, ...input };

      const updatedBucket = await Bucket.findOneAndUpdate(
        {
          'categories._id': targetCat,
        },
        { $push: { 'categories.$.places': placeObj } },
        { new: true },
      );

      const newPlace = updatedBucket.categories
        .find((cat) => cat.id === catId)
        .places.find((p) => p.id === String(placeID));
      return newPlace;
    },

    async changeBucketName(_, { bucketId, title }) {
      const targetBucket = mongoose.Types.ObjectId(bucketId);
      try {
        const newBucket = await Bucket.findByIdAndUpdate(
          targetBucket,
          {
            title,
          },
          { new: true },
        );
        return newBucket;
      } catch (e) {
        console.log(e);
      }
    },

    async changeCatName(_, { bucketId, catId, label }) {
      const targetBucket = mongoose.Types.ObjectId(bucketId);
      const targetCat = mongoose.Types.ObjectId(catId);
      try {
        const newCategories = await Bucket.findOneAndUpdate(
          { _id: targetBucket, 'categories._id': targetCat },
          {
            $set: { label },
          },
          { new: true },
        );
        return newCategories.categories.find((cat) => cat.id === catId);
      } catch (e) {
        console.log(e);
      }
    },
    async changePlaceName(_, { bucketId, catId, placeId, name }) {
      const targetBucket = mongoose.Types.ObjectId(bucketId);
      const targetCat = mongoose.Types.ObjectId(catId);
      const targetPlace = mongoose.Types.ObjectId(placeId);
      try {
        const newBucket = await Bucket.findOneAndUpdate(
          {
            _id: targetBucket,
          },
          {
            $set: { 'categories.$[cat].places.$[place].name': name },
          },
          {
            arrayFilters: [
              { 'cat._id': targetCat },
              { 'place._id': targetPlace },
            ],
            new: true,
          },
        );
        return newBucket.categories
          .find((cat) => cat.id === catId)
          .places.find((p) => p.id === placeId);
      } catch (e) {
        console.log(e);
      }
    },

    async editBucketNotes(_, { bucketId, newNote }) {
      const targetBucket = mongoose.Types.ObjectId(bucketId);
      try {
        const newBucket = await Bucket.findByIdAndUpdate(
          targetBucket,
          {
            notes: newNote,
          },
          { new: true },
        );
        return newBucket;
      } catch (e) {
        console.log(e);
      }
    },
    async editPlaceNotes(_, { bucketId, catId, placeId, newNote }) {
      const targetBucket = mongoose.Types.ObjectId(bucketId);
      const targetCat = mongoose.Types.ObjectId(catId);
      const targetPlace = mongoose.Types.ObjectId(placeId);
      try {
        const newBucket = await Bucket.findOneAndUpdate(
          {
            _id: targetBucket,
          },
          {
            $set: { 'categories.$[cat].places.$[place].notes': newNote },
          },
          {
            arrayFilters: [
              { 'cat._id': targetCat },
              { 'place._id': targetPlace },
            ],
            new: true,
          },
        );
        return newBucket.categories
          .find((cat) => cat.id === catId)
          .places.find((p) => p.id === placeId);
      } catch (e) {
        console.log(e);
      }
    },
    deleteBucket(_, { bucketId }) {
      try {
        const targetBucket = mongoose.Types.ObjectId(bucketId);
        Bucket.findByIdAndDelete(targetBucket, (err, res) => {
          if (err || !res) console.log('Error, no deletion');
          else console.log('Successful deletion!');
          return res;
        });
      } catch (e) {
        console.log(e);
      }
    },
    async deleteCategory(_, { bucketId, catId }) {
      try {
        const targetBucket = mongoose.Types.ObjectId(bucketId);
        const targetCat = mongoose.Types.ObjectId(catId);
        const updatedBucket = await Bucket.findByIdAndUpdate(
          targetBucket,
          {
            $pull: {
              categories: {
                _id: targetCat,
              },
            },
          },
          { new: true },
        );
        console.log('Category removed!', catId);
        return updatedBucket;
      } catch (e) {
        console.log(e);
      }
    },
    async deletePlace(_, { bucketId, catId, placeId }) {
      const targetBucket = mongoose.Types.ObjectId(bucketId);
      const targetCat = mongoose.Types.ObjectId(catId);
      const targetPlace = mongoose.Types.ObjectId(placeId);
      try {
        const updatedBucket = await Bucket.findOneAndUpdate(
          {
            _id: targetBucket,
          },
          {
            $pull: { 'categories.$[cat].places': { _id: targetPlace } },
          },
          {
            arrayFilters: [{ 'cat._id': targetCat }],
            new: true,
          },
        );
        return updatedBucket;
      } catch (e) {
        console.log(e);
      }
    },
  },
};

// const res = await Bucket.findOneAndUpdate(
//   {
//     _id: targetBucket,
//   },
//   { $push: {'categories.$[outer].places': newPlace}},
//   { "arrayFilters": [{"outer._id": targetCat}]}
// );
