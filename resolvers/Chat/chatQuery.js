const mongoose = require('mongoose');
const Chat = require('../../models/chatModel');

module.exports = {
  Query: {
    async getChats(_, { userId }) {
      try {
        const targetUser = mongoose.Types.ObjectId(userId);
        const allChats = await Chat.find({ members: targetUser });
        return allChats;
      } catch (e) {
        console.log(e);
      }
    },
    async getChatById(_, { chatId }) {
      try {
        const targetChat = mongoose.Types.ObjectId(chatId);
        const chat = await Chat.findById(targetChat);
        return chat;
      } catch (e) {
        console.log(e);
      }
    },
  },
  Chat: {
    async members(chat) {
      const members = await Chat.find({ id: chat.id }).populate('members');
      return members;
    },
    messages(chat) {
      return chat.messages;
    },
  },
};
