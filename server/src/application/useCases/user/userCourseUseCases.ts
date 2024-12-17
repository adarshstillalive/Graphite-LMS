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

  async fetchCourseById(courseId: string) {
    try {
      return await this.courseRepository.fetchCourseById(courseId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase Error: Fetching course', error);

      throw new Error(error);
    }
  }
}

export default UserCourseUseCases;
