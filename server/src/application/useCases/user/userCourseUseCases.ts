import { ObjectId } from 'mongoose';
import CourseRepository from '../../../domain/repositories/user/CourseRepository.js';

class UserCourseUseCases {
  constructor(private courseRepository: CourseRepository) {}

  async fetchCategories() {
    try {
      return await this.courseRepository.fetchCategories();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase Error: Fetching categories', error);

      throw new Error(error);
    }
  }

  async fetchCourseById(
    courseId: string,
    purchasedCourses: Array<string | ObjectId> | undefined,
  ) {
    try {
      const isPurchased = purchasedCourses?.some(
        (course) => String(course) === courseId,
      );

      if (isPurchased) {
        return await this.courseRepository.fetchPurchasedCourseById(courseId);
      }

      return await this.courseRepository.fetchCourseById(courseId);
    } catch (error) {
      console.error('Usecase Error: Fetching course', error);
      throw new Error('Error fetching course: ' + (error || 'Unknown error'));
    }
  }

  async fetchInstructor(instructorId: string) {
    try {
      return await this.courseRepository.fetchInstructor(instructorId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase Error: Fetching instructor data', error);

      throw new Error(error);
    }
  }
}

export default UserCourseUseCases;
