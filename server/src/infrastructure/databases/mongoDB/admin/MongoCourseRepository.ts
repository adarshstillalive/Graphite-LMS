import { ICategory } from '../../../../domain/entities/Category.js';
import CourseRepository from '../../../../domain/repositories/admin/CourseRepository.js';
import CategoryModel from '../models/CategoryModel.js';

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
}

export default MongoCourseRepository;
