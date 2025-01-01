import { SocialAccounts } from '../../infrastructure/databases/mongoDB/models/InstructorModel.js';
import { IUser } from '../../infrastructure/databases/mongoDB/models/UserModel.js';

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
  bio?: string;
  socialAccounts: SocialAccounts[];
  courses?: InstructorCourse[];
  rating?: number;
  reviews?: string[];
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
  bio?: string;
  socialAccounts?: SocialAccounts[];
  courses?: InstructorCourse[];
  rating?: number;
  reviews?: string[];
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}

class Instructor implements IInstructorPopulated {
  constructor(
    public userId: IUser,
    public profilePicture: string,
    public expertise?: string[],
    public qualifications?: string[],
    public additionalInfo?: string[],
    public bio?: string,
    public socialAccounts?: SocialAccounts[],
    public courses?: InstructorCourse[],
    public rating?: number,
    public reviews?: string[],
    public isBlocked?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public _id?: string,
  ) {}
}

export default Instructor;
