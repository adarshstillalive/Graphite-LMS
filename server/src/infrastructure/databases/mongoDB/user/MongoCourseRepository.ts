import { ICategory } from '../../../../domain/entities/Category.js';
import CourseRepository from '../../../../domain/repositories/user/CourseRepository.js';
import CategoryModel from '../models/CategoryModel.js';
import CourseModel, { IMongoCourseCommon } from '../models/CourseModel.js';

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
}

export default MongoCourseRepository;
