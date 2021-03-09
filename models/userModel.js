const mongoose = require('./index');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    birthday: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    location: String,
    vibe: String,
    emojis: String,
    profile_pic: String,
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
