const mongoose = require('mongoose');
const User = require('../../models/userModel');

module.exports = {
  Query: {
    async getUserByUsername(_, { username }) {
      try {
        const user = await User.find({ username });
        return user[0];
      } catch (e) {
        console.log(e);
      }
    },
    async getUserById(_, { userId }) {
      try {
        const targetUser = mongoose.Types.ObjectId(userId);
        const user = await User.findById(targetUser).populate('friends');
        return user;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
