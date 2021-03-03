const mongoose = require('mongoose');
const Chat = require('../../models/chatModel');

module.exports = {
  Mutation: {
    async createChat(_, { input }) {
      try {
        const { name, admin, members } = input;
        const newMembers = members.map((m) => mongoose.Types.ObjectId(m));
        const chatObj = { name, admin };
        chatObj.members = newMembers;
        const newChat = await Chat.create(chatObj);
        return newChat;
      } catch (e) {
        console.log(e);
      }
    },
    async postMessageToChat(_, { chatId, input }) {
      try {
        const { description, author, content, timeslots, photo } = input;
        const authorId = mongoose.Types.ObjectId(author);
        console.log(authorId);
        const msgObj = {
          description,
          author: authorId,
          content,
          timeslots,
          photo,
        };
        const targetChat = mongoose.Types.ObjectId(chatId);
        const newChat = await Chat.findByIdAndUpdate(
          targetChat,
          {
            $push: { messages: msgObj },
          },
          {
            new: true,
          },
        );
        console.log(newChat);
        return newChat;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
