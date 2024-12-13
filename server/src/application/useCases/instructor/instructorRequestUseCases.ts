import mongoose from 'mongoose';
import InstructorRequest from '../../../domain/entities/InstructorRequest.js';
import UserRepository from '../../../domain/repositories/UserRepository.js';
import RequestRepository from '../../../domain/repositories/instructor/RequestRepository.js';

class InstructorRequestUseCases {
  constructor(
    private requestRepository: RequestRepository,
    private userRepository: UserRepository,
  ) {}

  async sendRequest(
    expertise: string[],
    qualifications: string[],
    additionalInfo: string[],
    id: string,
  ) {
    try {
      const userId = new mongoose.Types.ObjectId(id);

      const request = new InstructorRequest(
        userId,
        expertise,
        qualifications,
        additionalInfo,
      );

      const createdRequest = await this.requestRepository.sendRequest(request);
      return createdRequest;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in verifying otp and creating user', error);

      throw new Error(error);
    }
  }

  async getRequest(id: string) {
    try {
      return await this.requestRepository.fetchRequest(id);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in verifying otp and creating user', error);

      throw new Error(error);
    }
  }
}

export default InstructorRequestUseCases;
