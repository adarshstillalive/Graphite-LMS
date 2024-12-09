import { ICategory } from '../../entities/Category.js';
import { ICourse, UploadState } from '../../entities/Course.js';

interface CourseRepository {
  fetchCategories(): Promise<ICategory[]>;
  createCourse(courseData: ICourse): Promise<string>;
  uploadVideoUrl(uploads: UploadState[], courseId: string): Promise<void>;
}

export default CourseRepository;
