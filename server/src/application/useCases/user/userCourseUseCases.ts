import CourseRepository from '../../../domain/repositories/user/CourseRepository.js';
import UserProfileRepository from '../../../domain/repositories/user/UserProfileRepository.js';

export interface Review {
  userId: string;
  courseId: string;
  rating: number;
  review: string;
}

export interface InstructorReview {
  userId: string;
  instructorId: string;
  rating: number;
  review: string;
}

class UserCourseUseCases {
  constructor(
    private courseRepository: CourseRepository,
    private userProfileRepository: UserProfileRepository,
  ) {}

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userId: any | undefined = undefined,
  ) {
    try {
      const courseData = await this.courseRepository.fetchCourseById(courseId);
      if (userId) {
        const userData = await this.userProfileRepository.fetchUserById(
          String(userId),
        );

        if (userData && userData.purchasedCourses) {
          const isPurchased = userData.purchasedCourses.some(
            // @ts-expect-error Not populated
            (course) => String(course._id) === courseId,
          );
          const isCreated =
            // @ts-expect-error Not populated
            String(courseData.instructorId._id) === String(userData._id);

          if (isPurchased || isCreated) {
            return await this.courseRepository.fetchPurchasedCourseById(
              courseId,
            );
          }
        }
      }
      return courseData;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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

  async addOrUpdateReview(reviewData: Review) {
    try {
      await this.courseRepository.addOrUpdateReview(reviewData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase Error: Fetching reviews', error);

      throw new Error(error);
    }
  }

  async addOrUpdateInstructorReview(reviewData: InstructorReview) {
    try {
      await this.courseRepository.addOrUpdateInstructorReview(reviewData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase Error: Fetching instructor reviews', error);

      throw new Error(error);
    }
  }
}

export default UserCourseUseCases;
