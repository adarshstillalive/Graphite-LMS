import AdminUserRepository from '../../../../domain/repositories/admin/AdminUserRepository.js';

class UserAccessManagement {
  constructor(private adminUserRepository: AdminUserRepository) {}

  async handleAccess(id: string) {
    try {
      return await this.adminUserRepository.userAction(id);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in Access control', error);

      throw new Error(error);
    }
  }
}

export default UserAccessManagement;
