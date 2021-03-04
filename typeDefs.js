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
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    birthday: String
    friends: [User]
    createdAt: String
    updatedAt: String
  }
  type Chat {
    id: ID
    name: String
    admin: ID
    members: [User]
    messages: [Message]
    createdAt: String
    updatedAt: String
  }
  type Message {
    id: ID
    description: String
    author: ID
    content: String
    timeslots: [String]
    photo: String
    createdAt: String
    updatedAt: String
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
  input UserInput {
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    birthday: String
  }
  input ChatInput {
    name: String
    admin: ID
    members: [ID]
  }
  input MessageInput {
    description: String!
    author: ID!
    content: String
    timeslots: [String]
    photo: String
  }
  type Query {
    getBuckets(userId: ID!): [Bucket]
    getBucketById(bucketId: ID!): Bucket
    getChats(userId: ID!): [Chat]
    getChatById(chatId: ID!): Chat
    getUserById(userId: ID!): User
    getUserByEmail(email: String): User
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
    registerUser(input: UserInput!): User
    loginUser(input: UserInput!): User
    addFriendToUser(userId: ID!, friendId: ID!): [User]
    removeFriendFromUser(userId: ID!, friendId: ID!): [User]
    createChat(input: ChatInput): Chat
    postMessageToChat(chatId: ID!, input: MessageInput): Chat
  }
`;

module.exports = typeDefs;
