import { IInstructorPopulated } from './Instructor';
import { IUser } from './User';

export interface IChat {
  _id: string;
  userId: IUser;
  instructorId: IInstructorPopulated;
  createdAt: Date;
  updatedAt: Date;
  lastMessageSentAt: Date;
}
