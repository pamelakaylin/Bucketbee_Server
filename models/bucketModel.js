const mongoose = require('./index');

const { Schema } = mongoose;

const bucketSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' }, //this will be the _id of a User
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  title: String,
  date_created: String,
  notes: String,
  categories: [
    {
      label: String,
      places: [
        {
          latitude: Number,
          longitude: Number,
          name: String,
          rating: Number,
          user_ratings_total: Number,
          weekday_text: Array,
          open_now: Boolean,
          description: String,
          formatted_address: String,
          international_phone_number: String,
          imgArr: Array,
          url: String,
          review: String,
          notes: String,
        },
      ],
    },
  ],
});

const Bucket = mongoose.model('Buckets', bucketSchema);

module.exports = Bucket;
