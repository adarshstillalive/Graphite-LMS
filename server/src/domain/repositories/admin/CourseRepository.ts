import { IMongoCourse } from '../../../infrastructure/databases/mongoDB/models/CourseModel.js';
import { ICategory } from '../../entities/Category.js';

interface CourseRepository {
  createCategory(categoryData: ICategory): Promise<void>;
  updateCategory(id: string, categoryData: ICategory): Promise<void>;
  approveCourse(id: string): Promise<void>;
  rejectCourse(id: string, reason: string): Promise<void>;
  fetchCourseById(id: string): Promise<IMongoCourse>;
}

export default CourseRepository;
