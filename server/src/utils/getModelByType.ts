/* eslint-disable @typescript-eslint/no-explicit-any */
import InstructorModel from '../infrastructure/databases/mongoDB/models/InstructorModel.js';
import UserModel from '../infrastructure/databases/mongoDB/models/UserModel.js';
import { Model } from 'mongoose';

const getModelByType = (type: string): Model<any> | null => {
  const types: Record<string, Model<any>> = {
    user: UserModel,
    instructor: InstructorModel,
  };

  return types[type] || null;
};

export default getModelByType;
