import {
  InstructorReview,
  Review,
} from '../../../application/useCases/user/userCourseUseCases.js';
import {
  IMongoCourse,
  IMongoCourseCommon,
} from '../../../infrastructure/databases/mongoDB/models/CourseModel.js';
import { IMongoInstructor } from '../../../infrastructure/databases/mongoDB/models/InstructorModel.js';
import { ICategory } from '../../entities/Category.js';

interface CourseRepository {
  fetchCategories(): Promise<ICategory[]>;
  fetchCourseById(courseId: string): Promise<IMongoCourseCommon>;
  fetchPurchasedCourseById(courseId: string): Promise<IMongoCourse>;
  fetchInstructor(instructorId: string): Promise<IMongoInstructor>;
  addOrUpdateReview(review: Review): Promise<void>;
  addOrUpdateInstructorReview(review: InstructorReview): Promise<void>;
  searchCourses(limit: number, filter: object): Promise<IMongoCourse[]>;
}

export default CourseRepository;
