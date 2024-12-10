import { ICategory } from '../../../../domain/entities/Category.js';
import CourseRepository from '../../../../domain/repositories/admin/CourseRepository.js';
import CategoryModel from '../models/CategoryModel.js';
import CourseModel from '../models/CourseModel.js';

class MongoCourseRepository implements CourseRepository {
  async createCategory(categoryData: ICategory): Promise<void> {
    try {
      const category = new CategoryModel(categoryData);
      await category.save();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo: Error in creating category', error);

      throw new Error(error);
    }
  }

  async updateCategory(id: string, categoryData: ICategory): Promise<void> {
    try {
      const update = await CategoryModel.updateOne(
        { _id: id },
        { $set: categoryData },
      );
      if (update.modifiedCount <= 0) {
        throw new Error('Database error: Updation failed');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo: Error in creating category', error);

      throw new Error(error);
    }
  }

  async approveCourse(id: string): Promise<void> {
    try {
      const approve = await CourseModel.updateOne(
        { _id: id },
        { $set: { isApproved: true, isRejected: false, rejectedReason: '' } },
      );
      if (approve.modifiedCount <= 0) {
        throw new Error('Mongo: Error in approving request');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo: Error in approving request', error);

      throw new Error(error);
    }
  }

  async rejectCourse(id: string, reason: string): Promise<void> {
    try {
      const approve = await CourseModel.updateOne(
        { _id: id },
        { $set: { isRejected: true, rejectedReason: reason } },
      );
      if (approve.modifiedCount <= 0) {
        throw new Error('Mongo: Error in rejecting request');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo: Error in rejecting request', error);

      throw new Error(error);
    }
  }
}

export default MongoCourseRepository;
