import mongoose from 'mongoose';

interface InstructorCourse {
  courseId: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
}
export interface IInstructor {
  userId: mongoose.Types.ObjectId;
  profilePicture: string;
  expertise?: string[];
  qualifications?: string[];
  additionalInfo?: string[];
  courses?: InstructorCourse[];
  rating?: number;
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: mongoose.Schema.Types.ObjectId;
}

class Instructor implements IInstructor {
  constructor(
    public userId: mongoose.Types.ObjectId,
    public profilePicture: string,
    public expertise?: string[],
    public qualifications?: string[],
    public additionalInfo?: string[],
    public courses?: InstructorCourse[],
    public rating?: number,
    public isBlocked?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public _id?: mongoose.Schema.Types.ObjectId,
  ) {}
}

export default Instructor;
