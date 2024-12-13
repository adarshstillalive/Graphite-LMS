import InstructorProfieRepository from '../../../../domain/repositories/instructor/InstructorProfileRepository.js';
import InstructorModel, {
  IMongoInstructor,
} from '../models/InstructorModel.js';

class MongoInstructorProfileRepository implements InstructorProfieRepository {
  async fetchInstructor(userId: string): Promise<IMongoInstructor> {
    try {
      const instructor = await InstructorModel.findOne({ userId }).populate(
        'userId',
      );
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

export default MongoInstructorProfileRepository;
