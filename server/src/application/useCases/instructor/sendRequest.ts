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
    email: string,
  ) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error('Database error');
      }

      if (!user._id) {
        throw new Error('Database error');
      }

      const userId = mongoose.Types.ObjectId.createFromHexString(
        typeof user._id === 'string' ? user._id : user._id.toString(),
      );

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
