import mongoose from 'mongoose';
import InstructorRequest from '../../../domain/entities/InstructorRequest.js';
import InstructorRepository from '../../../domain/repositories/InstructorRepository.js';
import InstructorRequestModel from './models/InstructorRequest.js';

class MongoInstructorRepository implements InstructorRepository {
  async sendRequest(request: InstructorRequest): Promise<InstructorRequest> {
    try {
      const requestData = new InstructorRequestModel(request);
      await requestData.save();
      return requestData.toObject();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in verifying otp and creating user', error);

      throw new Error(error);
    }
  }

  async fetchRequest(
    userId: mongoose.Schema.Types.ObjectId,
  ): Promise<InstructorRequest> {
    try {
      const requestData = await InstructorRequestModel.findOne({
        userId: userId,
      });
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

export default MongoInstructorRepository;
