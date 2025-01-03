import { ICategory } from '../../../../domain/entities/Category.js';
import CourseRepository from '../../../../domain/repositories/admin/CourseRepository.js';
import CategoryModel from '../models/CategoryModel.js';
import CourseModel, { IMongoCourse } from '../models/CourseModel.js';
import OrderModel from '../models/OrderModel.js';

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

  async fetchCourseById(id: string): Promise<IMongoCourse> {
    try {
      const course = await CourseModel.findById(id)
        .populate('instructorId')
        .populate('category');
      if (!course) {
        throw new Error('Mongo: Error in fetching course');
      }

      return course;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo: Error in fetching course', error);

      throw new Error(error);
    }
  }

  async fetchTopCourses(): Promise<IMongoCourse[]> {
    try {
      const topCourses = await OrderModel.aggregate([
        {
          $unwind: '$courses',
        },
        {
          $group: {
            _id: '$courses.courseId',
            totalSales: { $sum: 1 },
            totalRevenue: { $sum: '$courses.price' },
          },
        },
        {
          $sort: { totalSales: -1 },
        },
        {
          $limit: 10,
        },
        {
          $lookup: {
            from: 'courses',
            localField: '_id',
            foreignField: '_id',
            as: 'courseDetails',
          },
        },
        {
          $unwind: '$courseDetails',
        },
        {
          $project: {
            courseId: '$_id',
            totalSales: 1,
            totalRevenue: 1,
            'courseDetails.title': 1,
            'courseDetails.price': 1,
            'courseDetails.thumbnail': 1,
            'courseDetails.rating': 1,
          },
        },
      ]);

      return topCourses;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo: Error in fetching courses', error);

      throw new Error(error);
    }
  }
}

export default MongoCourseRepository;
