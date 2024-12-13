import {
  IInstructorProfileUpdationFormData,
  IUserProfileUpdationFormData,
} from '../../../application/useCases/instructor/instructorProfileUseCases.js';
import { IMongoInstructor } from '../../../infrastructure/databases/mongoDB/models/InstructorModel.js';

interface InstructorProfieRepository {
  fetchInstructor(userId: string): Promise<IMongoInstructor>;
  updateProfilePicture(instructorId: string, url: string): Promise<void>;
  updateProfileData(
    instructorId: string,
    userFormData: IUserProfileUpdationFormData,
    instructorFormData: IInstructorProfileUpdationFormData,
  ): Promise<void>;
}

export default InstructorProfieRepository;
