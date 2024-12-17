import { IMongoCourseCommon } from '../../../infrastructure/databases/mongoDB/models/CourseModel.js';
import { ICategory } from '../../entities/Category.js';

interface CourseRepository {
  fetchCategories(): Promise<ICategory[]>;
  fetchCourseById(courseId: string): Promise<IMongoCourseCommon>;
}

export default CourseRepository;
