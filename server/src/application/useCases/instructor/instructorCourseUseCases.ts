import CourseRepository from '../../../domain/repositories/instructor/CourseRepository.js';

class InstructorCourseUseCases {
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
}

export default InstructorCourseUseCases;
