import InstructorRequest from '../../entities/InstructorRequest.js';

interface AdminInstructorRepository {
  fetchInstructorRequests(): Promise<InstructorRequest[]>;
  approveRequest(id: string, userId: string): Promise<void>;
  instructorAction(id: string): Promise<void>;
}

export default AdminInstructorRepository;
