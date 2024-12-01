import mongoose from 'mongoose';
import InstructorRequest from '../../../domain/entities/InstructorRequest.js';
import InstructorRepository from '../../../domain/repositories/InstructorRepository.js';
import UserRepository from '../../../domain/repositories/UserRepository.js';

class SendRequest {
  constructor(
    private instructorRepository: InstructorRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
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

      const createdRequest =
        await this.instructorRepository.sendRequest(request);
      return createdRequest;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in verifying otp and creating user', error);

      throw new Error(error);
    }
  }
}

export default SendRequest;
