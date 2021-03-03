const mongoose = require('mongoose');
const Chat = require('../../models/chatModel');

module.exports = {
  Mutation: {
    async createChat(_, { input }) {
      try {
        const { name, admin, members } = input;
        const chatObj = { name, admin, members };
        const newChat = await Chat.create(chatObj);
        return newChat;
      } catch (e) {
        console.log(e);
      }
    },
    async postMessageToChat(_, { chatId, input }) {
      try {
        const { description, author, content, timeslots, photo } = input;
        const msgObj = { description, author, content, timeslots, photo };
        const targetChat = mongoose.Types.ObjectId(chatId);
        const newChat = Chat.findByIdAndUpdate(targetChat, {
          $push: { messages: msgObj },
        });
        return newChat;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
