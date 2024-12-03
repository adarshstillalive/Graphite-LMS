import { ICategory } from '../../entities/Category.js';

interface CourseRepository {
  createCategory(categoryData: ICategory): Promise<void>;
  updateCategory(id: string, categoryData: ICategory): Promise<void>;
}

export default CourseRepository;
