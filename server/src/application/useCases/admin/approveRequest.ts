import AdminRepository from '../../../domain/repositories/AdminRepository.js';

class ApproveRequest {
  constructor(private adminRepository: AdminRepository) {}

  async execute(id: string, userId: string) {
    try {
      await this.adminRepository.approveRequest(id, userId);
      const request = await this.adminRepository.fetchInstructorRequests();
      return request;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in fetching requests', error);

      throw new Error(error);
    }
  }
}

export default ApproveRequest;
