import InstructorRequest from '../entities/InstructorRequest.js';

interface AdminRepository {
  fetchInstructorRequests(): Promise<InstructorRequest[]>;
}

export default AdminRepository;
