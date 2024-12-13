import { IMongoInstructor } from '../../../infrastructure/databases/mongoDB/models/InstructorModel.js';

interface InstructorProfieRepository {
  fetchInstructor(userId: string): Promise<IMongoInstructor>;
  updateProfilePicture(instructorId: string, url: string): Promise<void>;
}

export default InstructorProfieRepository;
