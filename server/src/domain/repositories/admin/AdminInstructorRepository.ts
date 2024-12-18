import { IMongoInstructor } from '../../../infrastructure/databases/mongoDB/models/InstructorModel.js';
import InstructorRequest from '../../entities/InstructorRequest.js';

interface AdminInstructorRepository {
  fetchInstructorRequests(): Promise<InstructorRequest[]>;
  approveRequest(id: string, userId: string): Promise<void>;
  instructorAction(id: string): Promise<IMongoInstructor>;
}

export default AdminInstructorRepository;
