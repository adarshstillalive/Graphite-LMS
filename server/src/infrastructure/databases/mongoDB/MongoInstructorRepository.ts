import InstructorRequest from '../../../domain/entities/InstructorRequest.js';
import InstructorRepository from '../../../domain/repositories/InstructorRepository.js';
import InstructorRequestModel from './models/InstructorRequest.js';
import Instructor from '../../../domain/entities/Instructor.js';
import InstructorModel from './models/InstructorModel.js';

class MongoInstructorRepository implements InstructorRepository {
  async sendRequest(request: InstructorRequest): Promise<InstructorRequest> {
    try {
      const requestData = new InstructorRequestModel(request);
      await requestData.save();
      return requestData.toObject();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in sending request', error);

      throw new Error(error);
    }
  }

  async fetchRequest(userId: string): Promise<InstructorRequest> {
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
      console.log('Error in fetching requests', error);

      throw new Error(error);
    }
  }

  async fetchInstructor(userId: string): Promise<Instructor> {
    try {
      const instructor = await InstructorModel.findOne({ userId });
      if (!instructor) {
        throw new Error('Instructor not found');
      }
      return instructor;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in fetching instructor', error);

      throw new Error(error);
    }
  }

  async updateProfilePicture(instructorId: string, url: string): Promise<void> {
    try {
      const update = await InstructorModel.updateOne(
        { userId: instructorId },
        { $set: { profilePicture: url } },
      );
      if (update.modifiedCount <= 0) {
        throw new Error('Database error: Profile picture updation failed');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in uploading profile picture', error);

      throw new Error(error);
    }
  }
}

export default MongoInstructorRepository;
