export interface IMessage {
  chatId: string;
  senderId: string;
  repliedToId?: IMessage;
  text: string;
  image?: string;
  imageUrl?: string;
  isRead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}
