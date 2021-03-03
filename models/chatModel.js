const mongoose = require('./index');

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    description: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    timeslots: Array,
    photo: String,
  },
  { timestamps: true },
);

const chatSchema = new Schema(
  {
    name: String,
    admin: { type: Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: { type: [messageSchema], default: [] },
  },
  { timestamps: true },
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
