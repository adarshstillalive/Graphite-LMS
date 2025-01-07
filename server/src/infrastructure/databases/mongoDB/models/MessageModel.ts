import mongoose, { Schema } from 'mongoose';

export interface IMongoMessage {
  chatId: mongoose.Schema.Types.ObjectId;
  senderId: mongoose.Schema.Types.ObjectId;
  repliedToId: mongoose.Schema.Types.ObjectId;
  text: string;
  image?: string;
  imageUrl?: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  _id?: mongoose.Schema.Types.ObjectId;
}

const messageSchema: Schema<IMongoMessage> = new Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Chat',
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    repliedToId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const MessageModel = mongoose.model<IMongoMessage>('Message', messageSchema);

export default MessageModel;
