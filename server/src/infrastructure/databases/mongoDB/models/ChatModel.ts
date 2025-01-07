import mongoose, { Schema } from 'mongoose';

export interface IMongoChat {
  _id?: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  instructorId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  lastMessageSentAt: Date;
}

const chatSchema: Schema<IMongoChat> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Instructor',
    },
    lastMessageSentAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const ChatModel = mongoose.model<IMongoChat>('Chat', chatSchema);

export default ChatModel;
