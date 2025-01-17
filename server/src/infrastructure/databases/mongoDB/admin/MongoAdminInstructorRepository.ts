import InstructorRequest from '../../../../domain/entities/InstructorRequest.js';
import InstructorRequestModel from '../models/InstructorRequest.js';
import AdminInstructorRepository from '../../../../domain/repositories/admin/AdminInstructorRepository.js';
import UserModel from '../models/UserModel.js';
import InstructorModel, {
  IMongoInstructor,
} from '../models/InstructorModel.js';
import mongoose from 'mongoose';

class MongoAdminInstructorRepository implements AdminInstructorRepository {
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

  async approveRequest(id: string, userId: string): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Step 1: Approve the request
      const updatedRequest = await InstructorRequestModel.findByIdAndUpdate(
        id,
        { $set: { isApproved: true, updatedAt: new Date() } },
        { new: true, session },
      );

      if (!updatedRequest) {
        throw new Error(
          'Approval failed: Request not found or already processed.',
        );
      }

      // Step 2: Create a new instructor
      const { expertise, qualifications, additionalInfo } = updatedRequest;
      const instructor = await InstructorModel.create(
        [
          {
            userId,
            expertise,
            qualifications,
            additionalInfo,
            courses: [],
            rating: 0,
            isBlocked: false,
          },
        ],
        { session },
      );

      if (!instructor || instructor.length === 0) {
        throw new Error('Approval failed: Instructor creation failed.');
      }
      const instructorId = instructor[0]._id;

      // Step 3: Update the user as an instructor
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: { isInstructor: true, instructorId } },
        { session },
      );

      if (!updatedUser) {
        throw new Error('Approval failed: User not found.');
      }

      await session.commitTransaction();
      session.endSession();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();
      console.error('Error during approval:', error);
      throw new Error(error.message || 'Approval process failed.');
    }
  }

  async instructorAction(id: string): Promise<IMongoInstructor> {
    try {
      const instructorData =
        await InstructorModel.findById(id).populate('userId');
      if (!instructorData) {
        throw new Error('Database Error');
      }

      instructorData.isBlocked = !instructorData.isBlocked;
      const updatedInstructor = await instructorData.save();
      return updatedInstructor;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Action failed:', error);
      throw new Error(error.message || 'Instructor action failed');
    }
  }

  async fetchTopInstructors(): Promise<IMongoInstructor[]> {
    try {
      const instructorData = await InstructorModel.find()
        .sort({ rating: -1 })
        .limit(10)
        .populate('userId');

      return instructorData;
    } catch (error) {
      console.error('Error fetching top instructors:', error);

      // Preserve the original stack trace for debugging
      throw new Error('Failed to fetch instructors');
    }
  }
}

export default MongoAdminInstructorRepository;
