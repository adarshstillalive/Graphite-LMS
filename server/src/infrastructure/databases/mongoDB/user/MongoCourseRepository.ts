import { ICategory } from '../../../../domain/entities/Category.js';
import CourseRepository from '../../../../domain/repositories/user/CourseRepository.js';
import CategoryModel from '../models/CategoryModel.js';
import CourseModel, {
  IMongoCourse,
  IMongoCourseCommon,
} from '../models/CourseModel.js';
import InstructorModel, {
  IMongoInstructor,
} from '../models/InstructorModel.js';

class MongoCourseRepository implements CourseRepository {
  async fetchCategories(): Promise<ICategory[]> {
    try {
      const categories = await CategoryModel.find();
      return categories;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: fetching categories', error);

      throw new Error(error);
    }
  }

  async fetchCourseById(courseId: string): Promise<IMongoCourseCommon> {
    try {
      const course = await CourseModel.findById(courseId)
        .select('-chapters.episodes.content')
        .populate('instructorId')
        .populate('category');
      if (!course) {
        throw new Error('Mongo Error: fetching course');
      }

      return course;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: fetching course', error);

      throw new Error(error);
    }
  }

  async fetchPurchasedCourseById(courseId: string): Promise<IMongoCourse> {
    try {
      const course = await CourseModel.findById(courseId)
        .populate('instructorId')
        .populate('category');
      if (!course) {
        throw new Error('Mongo Error: fetching course');
      }

      return course;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: fetching course', error);

      throw new Error(error);
    }
  }

  async fetchInstructor(instructorId: string): Promise<IMongoInstructor> {
    try {
      const instructorData = await InstructorModel.findOne({
        userId: instructorId,
      })
        .select('-chapters.episodes.content')
        .populate('userId')
        .populate({
          path: 'courses.courseId',
          populate: {
            path: 'category',
            model: 'Category', // Replace with the actual model name for categories
          },
        });

      if (!instructorData) {
        throw new Error('Mongo Error: fetching course');
      }

      return instructorData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: fetching course', error);

      throw new Error(error);
    }
  }
}

export default MongoCourseRepository;
