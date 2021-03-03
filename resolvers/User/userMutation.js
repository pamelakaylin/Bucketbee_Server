const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/userModel');

const saltRounds = 10;

module.exports = {
  Mutation: {
    async registerUser(_, { input }) {
      try {
        const {
          firstName,
          lastName,
          username,
          email,
          password,
          birthday,
        } = input;
        const existingUser = await User.find({ email });
        if (existingUser.length) throw new Error('Email already exists');
        const hash = await bcrypt.hash(password, saltRounds);
        const userObj = {
          firstName,
          lastName,
          username,
          email,
          password: hash,
          birthday,
        };
        const newUser = await User.create(userObj);
        console.log(newUser);
        return newUser;
      } catch (e) {
        console.log(e);
      }
    },
    async loginUser(_, { input }) {
      try {
        const { email, password } = input;
        const existingUser = await User.find({ email });
        if (existingUser !== []) {
          const hash = existingUser[0].password;
          const result = await bcrypt.compare(password, hash);
          if (result) {
            return existingUser[0];
            // eslint-disable-next-line no-else-return
          } else {
            throw new Error('Wrong password, please try again');
          }
        } else {
          throw new Error('Email does not exist');
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addFriendToUser(_, { userId, friendId }) {
      try {
        const targetUser = mongoose.Types.ObjectId(userId);
        const friend = mongoose.Types.ObjectId(friendId);
        const existingFriends = await User.findById(userId).populate('friends');
        if (existingFriends.friends.length) {
          throw new Error('Friend already exists');
        }
        const updatedUser = await User.findByIdAndUpdate(
          targetUser,
          { $push: { friends: friend } },
          { new: true },
        ).populate('friends');
        const updatedFriend = await User.findByIdAndUpdate(
          friend,
          { $push: { friends: targetUser } },
          { new: true },
        ).populate('friends');
        console.log(updatedUser, updatedFriend);
        return [updatedUser, updatedFriend];
      } catch (e) {
        console.log(e);
      }
    },
  },
};
