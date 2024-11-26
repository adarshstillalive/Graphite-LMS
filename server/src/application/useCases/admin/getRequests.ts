import AdminRepository from '../../../domain/repositories/AdminRepository.js';

class GetRequests {
  constructor(private adminRepository: AdminRepository) {}

  async execute() {
    try {
      const requests = await this.adminRepository.fetchInstructorRequests();

      return requests;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in fetching requests', error);

      throw new Error(error);
    }
  }
}

export default GetRequests;
