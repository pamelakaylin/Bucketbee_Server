const mongoose = require('mongoose');
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
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
        console.log(existingUser);
        if (existingUser) throw new Error('Email already exists');
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          const userObj = {
            firstName,
            lastName,
            username,
            email,
            password: hash,
            birthday,
          };
          const newUser = await User.create(userObj);
          return newUser;
        });
      } catch (e) {
        console.log(e);
      }
    },
    async loginUser(_, { input }) {
      try {
        const { email, password } = input;
        const existingUser = await User.find({ email });
        if (existingUser) {
          const hash = existingUser.password;
          bcrypt.compare(password, hash, (err, result) => {
            if (err) console.log(err);
            if (result) {
              return true;
              // eslint-disable-next-line no-else-return
            } else {
              throw new Error('Wrong password, please try again');
            }
          });
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
        const updatedUser = await User.findByIdAndUpdate(
          targetUser,
          { $push: { friends: friend } },
          { new: true },
        );
        return updatedUser;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
