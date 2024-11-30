import Instructor from '../entities/Instructor.js';
import InstructorRequest from '../entities/InstructorRequest.js';

interface InstructorRepository {
  sendRequest(request: InstructorRequest): Promise<InstructorRequest>;
  fetchRequest(userId: string): Promise<InstructorRequest>;
  fetchInstructor(userId: string): Promise<Instructor>;
  updateProfilePicture(instructorId: string, url: string): Promise<void>;
}

export default InstructorRepository;
