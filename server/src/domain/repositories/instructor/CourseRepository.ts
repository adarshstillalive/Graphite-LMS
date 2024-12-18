import { IMongoCourse } from '../../../infrastructure/databases/mongoDB/models/CourseModel.js';
import { ICategory } from '../../entities/Category.js';
import { ICourse, IEditCourse, UploadState } from '../../entities/Course.js';

interface CourseRepository {
  fetchCategories(): Promise<ICategory[]>;
  createCourse(courseData: ICourse): Promise<string>;
  editCourse(courseId: string, courseData: IEditCourse): Promise<void>;
  uploadVideoUrl(uploads: UploadState[], courseId: string): Promise<void>;
  fetchCourses(userId: string): Promise<IMongoCourse[]>;
  fetchCourse(courseId: string): Promise<IMongoCourse>;
  publishAction(courseId: string): Promise<void>;
  deleteCourse(courseId: string): Promise<void>;
  removeCourseFromInstructor(
    courseId: string,
    instructorId: string,
  ): Promise<void>;
}

export default CourseRepository;
