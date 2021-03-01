const { gql } = require('apollo-server');

const typeDefs = gql`
  type Bucket {
    id: ID!
    author: User
    members: [User]
    title: String
    notes: String
    date_created: String
    categories: [Category]
  }
  type Category {
    id: ID
    label: String
    places: [Place]
  }
  type Place {
    id: ID
    latitude: Float
    longitude: Float
    name: String
    rating: Float
    user_ratings_total: Int
    weekday_text: [String]
    open_now: Boolean
    description: String
    formatted_address: String
    international_phone_number: String
    imgArr: [String]
    url: String
    review: String
    notes: String
  }
  type User {
    id: ID!
  }
  input BucketInput {
    title: String
    notes: String
    category: String
  }
  input PlaceInput {
    latitude: Float
    longitude: Float
    name: String
    rating: Float
    user_ratings_total: Int
    weekday_text: [String]
    open_now: Boolean
    description: String
    formatted_address: String
    international_phone_number: String
    imgArr: [String]
    url: String
    review: String
    notes: String
  }
  type Query {
    getBuckets(userId: ID!): [Bucket]
    getBucketById(bucketId: ID!): Bucket
  }
  type Mutation {
    createBucket(input: BucketInput!, place: PlaceInput): Bucket
    addCategory(bucketId: ID!, label: String): Category
    addPlace(catId: ID!, input: PlaceInput!): Place
    changeBucketName(bucketId: ID!, title: String): Bucket
    changeCatName(bucketId: ID!, catId: ID!, label: String): Category
    changePlaceName(
      bucketId: ID!
      catId: ID!
      placeId: ID!
      name: String
    ): Place
    editBucketNotes(bucketId: ID!, newNote: String): Bucket
    editPlaceNotes(
      bucketId: ID!
      catId: ID!
      placeId: ID!
      newNote: String
    ): Place
    deleteBucket(bucketId: ID!): Bucket
    deleteCategory(bucketId: ID!, catId: ID!): Bucket
    deletePlace(bucketId: ID!, catId: ID!, placeId: ID!): Bucket
  }
`;

module.exports = typeDefs;
