import {
  IUserProfileUpdationFormData,
  IInstructorProfileUpdationFormData,
} from '../../../../application/useCases/instructor/instructorProfileUseCases.js';
import InstructorProfieRepository from '../../../../domain/repositories/instructor/InstructorProfileRepository.js';
import InstructorModel, {
  IMongoInstructor,
} from '../models/InstructorModel.js';
import UserModel from '../models/UserModel.js';

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
      console.log('Mongo error: Uploading profile picture', error);

      throw new Error(error);
    }
  }

  async updateProfileData(
    instructorId: string,
    userFormData: IUserProfileUpdationFormData,
    instructorFormData: IInstructorProfileUpdationFormData,
  ): Promise<void> {
    try {
      const updateUser = await UserModel.updateOne(
        { _id: instructorId },
        { $set: userFormData },
      );
      const updateInstructor = await InstructorModel.updateOne(
        { userId: instructorId },
        { $set: instructorFormData },
      );
      if (
        updateUser.matchedCount === 0 &&
        updateInstructor.matchedCount === 0
      ) {
        throw new Error('Mongo Error: Updating profile');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: Updating profile', error);

      throw new Error(error);
    }
  }
}

export default MongoInstructorProfileRepository;
