import InstructorRequest from '../../entities/InstructorRequest.js';

interface RequestRepository {
  sendRequest(request: InstructorRequest): Promise<InstructorRequest>;
  fetchRequest(userId: string): Promise<InstructorRequest>;
}

export default RequestRepository;
