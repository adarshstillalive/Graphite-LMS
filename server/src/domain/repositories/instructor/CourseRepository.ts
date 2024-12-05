import { ICategory } from '../../entities/Category.js';

interface CourseRepository {
  fetchCategories(): Promise<ICategory[]>;
}

export default CourseRepository;
