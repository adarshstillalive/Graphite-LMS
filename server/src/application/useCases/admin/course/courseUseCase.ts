import CourseRepository from '../../../../domain/repositories/admin/CourseRepository.js';

class CourseUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async approveCourse(id: string) {
    try {
      await this.courseRepository.approveCourse(id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase:Error in approving request', error);

      throw new Error(error);
    }
  }

  async rejectCourse(id: string, reason: string) {
    try {
      await this.courseRepository.rejectCourse(id, reason);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase:Error in approving request', error);

      throw new Error(error);
    }
  }
}

export default CourseUseCase;
