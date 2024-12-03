import { ICategory } from '../../../../domain/entities/Category.js';
import CourseRepository from '../../../../domain/repositories/admin/CourseRepository.js';

class Category {
  constructor(private categoryRepository: CourseRepository) {}

  async create(categoryData: ICategory) {
    try {
      await this.categoryRepository.createCategory(categoryData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in creating category', error);

      throw new Error(error);
    }
  }

  async update(id: string, categoryData: ICategory) {
    try {
      await this.categoryRepository.updateCategory(id, categoryData);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in updating category', error);

      throw new Error(error);
    }
  }
}

export default Category;
