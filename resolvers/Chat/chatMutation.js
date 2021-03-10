const mongoose = require('mongoose');
const { withFilter } = require('apollo-server');
const Chat = require('../../models/chatModel');

module.exports = {
  Mutation: {
    async createChat(_, { input }) {
      try {
        const { name, admin, members } = input;
        const newMembers = members.map((m) => mongoose.Types.ObjectId(m));
        if (newMembers.length === 2) {
          const existingChat = await Chat.find({
            members: { $all: [...newMembers] },
          }).populate('members');
          if (existingChat.length) {
            return existingChat[0];
          }
        }
        const chatObj = { name, admin };
        chatObj.members = newMembers;
        const newChat = await Chat.create(chatObj);
        const fullChat = await Chat.findById({ _id: newChat.id }).populate(
          'members',
        );
        return fullChat;
      } catch (e) {
        console.log(e);
      }
    },
    async postMessageToChat(_, { chatId, input }, context) {
      try {
        const { description, author, content, timeslots, photo } = input;
        const authorId = mongoose.Types.ObjectId(author);
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
        ).populate('members');
        const lastMessage = newChat.messages[newChat.messages.length - 1];
        lastMessage.chatId = chatId;
        await context.pubsub.publish('MESSAGE_SENT', {
          messageSent: lastMessage,
        });
        return newChat;
      } catch (e) {
        console.log(e);
      }
    },
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator('MESSAGE_SENT'),
        (payload, variables) => {
          if (!variables.chatId) {
            return payload.messageSent.author.toString() !== variables.author;
          }
          return (
            payload.messageSent.chatId.toString() === variables.chatId &&
            payload.messageSent.author.toString() !== variables.author
          );
        },
      ),
    },
  },
};
