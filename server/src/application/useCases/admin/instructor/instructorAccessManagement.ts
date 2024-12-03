import AdminInstructorRepository from '../../../../domain/repositories/admin/AdminInstructorRepository.js';

class InstructorAccessManagement {
  constructor(private adminInstructorRepository: AdminInstructorRepository) {}

  async approveRequest(id: string, userId: string) {
    try {
      await this.adminInstructorRepository.approveRequest(id, userId);
      const request =
        await this.adminInstructorRepository.fetchInstructorRequests();
      return request;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in fetching requests', error);

      throw new Error(error);
    }
  }

  async getRequests() {
    try {
      const requests =
        await this.adminInstructorRepository.fetchInstructorRequests();

      return requests;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in fetching requests', error);

      throw new Error(error);
    }
  }

  async handleAccess(id: string) {
    try {
      await this.adminInstructorRepository.instructorAction(id);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in Access control', error);

      throw new Error(error);
    }
  }
}

export default InstructorAccessManagement;
