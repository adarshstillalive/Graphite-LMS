import { IUser } from './User';

export interface IInstructorReview {
  _id?: string;
  userId: string;
  instructorId: string;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IInstructorReviewPopulated {
  _id?: string;
  userId: IUser;
  instructorId: string;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}
