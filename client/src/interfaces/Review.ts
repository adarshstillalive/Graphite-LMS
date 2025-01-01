import { IUser } from './User';

export interface IReview {
  _id?: string;
  userId: string;
  courseId: string;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IReviewPopulated {
  _id?: string;
  userId: IUser;
  courseId: string;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}
