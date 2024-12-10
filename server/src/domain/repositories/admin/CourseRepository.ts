import { ICategory } from '../../entities/Category.js';

interface CourseRepository {
  createCategory(categoryData: ICategory): Promise<void>;
  updateCategory(id: string, categoryData: ICategory): Promise<void>;
  approveCourse(id: string): Promise<void>;
  rejectCourse(id: string, reason: string): Promise<void>;
}

export default CourseRepository;
