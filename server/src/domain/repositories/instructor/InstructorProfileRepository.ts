import {
  IInstructorProfileUpdationFormData,
  IUserProfileUpdationFormData,
} from '../../../application/useCases/instructor/instructorProfileUseCases.js';
import { IMongoChat } from '../../../infrastructure/databases/mongoDB/models/ChatModel.js';
import { IMongoInstructor } from '../../../infrastructure/databases/mongoDB/models/InstructorModel.js';

interface InstructorProfieRepository {
  fetchInstructor(userId: string): Promise<IMongoInstructor>;
  updateProfilePicture(instructorId: string, url: string): Promise<void>;
  updateProfileData(
    instructorId: string,
    userFormData: IUserProfileUpdationFormData,
    instructorFormData: IInstructorProfileUpdationFormData,
  ): Promise<void>;
  fetchInitialChatData(instructorId: string): Promise<IMongoChat[]>;
}

export default InstructorProfieRepository;
