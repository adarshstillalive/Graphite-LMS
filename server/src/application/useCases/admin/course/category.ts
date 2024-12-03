import { ICategory } from '../../../../domain/entities/Category.js';
import CategoryRepository from '../../../../domain/repositories/CourseRepository.js';

class Category {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(categoryData: ICategory) {
    try {
      await this.categoryRepository.createCategory(categoryData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in creating category', error);

      throw new Error(error);
    }
  }
}

export default Category;
