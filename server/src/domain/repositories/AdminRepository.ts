import InstructorRequest from '../entities/InstructorRequest.js';

interface AdminRepository {
  fetchInstructorRequests(): Promise<InstructorRequest[]>;
  approveRequest(id: string, userId: string): Promise<InstructorRequest[]>;
}

export default AdminRepository;
