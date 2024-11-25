import InstructorRequest from '../entities/InstructorRequest.js';

interface InstructorRepository {
  sendRequest(request: InstructorRequest): Promise<InstructorRequest>;
}

export default InstructorRepository;
