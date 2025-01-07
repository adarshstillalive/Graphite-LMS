import MessageModel, { IMongoMessage } from './models/MessageModel.js';

class MongoChatRepository {
  async saveMessageToDb(
    chatId: string,
    senderId: string,
    message: string,
  ): Promise<IMongoMessage> {
    try {
      const createdMessage = await MessageModel.create({
        chatId,
        senderId,
        text: message,
      });
      return createdMessage;
    } catch (error) {
      throw new Error('Saving message to db failed');

      console.log(error);
    }
  }
}

export default MongoChatRepository;
