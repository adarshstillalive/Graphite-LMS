import { IUser } from './User';

interface InstructorCourse {
  courseId: string;
  createdAt?: Date;
}
export interface IInstructor {
  userId: string;
  profilePicture: string;
  expertise?: string[];
  qualifications?: string[];
  additionalInfo?: string[];
  courses?: InstructorCourse[];
  rating?: number;
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}

export interface IInstructorPopulated {
  userId: IUser;
  profilePicture: string;
  expertise?: string[];
  qualifications?: string[];
  additionalInfo?: string[];
  courses?: InstructorCourse[];
  rating?: number;
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}
