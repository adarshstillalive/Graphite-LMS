import InstructorRequest from '../../../domain/entities/InstructorRequest.js';
import InstructorRequestModel from './models/InstructorRequest.js';
import AdminRepository from '../../../domain/repositories/AdminRepository.js';
import UserModel from './models/UserModel.js';

class MongoAdminRepository implements AdminRepository {
  async fetchInstructorRequests(): Promise<InstructorRequest[]> {
    try {
      const requestData =
        await InstructorRequestModel.find().populate('userId');

      if (!requestData) {
        throw new Error('No request available');
      }
      return requestData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in verifying otp and creating user', error);

      throw new Error(error);
    }
  }

  async approveRequest(
    id: string,
    userId: string,
  ): Promise<InstructorRequest[]> {
    try {
      const updated = await InstructorRequestModel.updateOne(
        { _id: id },
        { $set: { isApproved: true, updatedAt: Date.now() } },
      );

      if (updated.modifiedCount <= 0) {
        throw new Error('Database error: approval failed');
      }
      const updateUsertoInstructor = await UserModel.updateOne(
        { _id: userId },
        { $set: { isInstructor: true } },
      );

      if (updateUsertoInstructor.modifiedCount <= 0) {
        throw new Error('Database error: user approval failed');
      }
      const requestData =
        await InstructorRequestModel.find().populate('userId');

      if (!requestData) {
        throw new Error('No request available');
      }
      return requestData;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in verifying otp and creating user', error);

      throw new Error(error);
    }
  }
}

export default MongoAdminRepository;
