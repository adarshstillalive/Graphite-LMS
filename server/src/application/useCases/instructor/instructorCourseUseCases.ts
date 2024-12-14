import { UploadedFile } from 'express-fileupload';
import Course, {
  IChapter,
  ICourse,
  IEpisode,
  UploadState,
} from '../../../domain/entities/Course.js';
import CourseRepository from '../../../domain/repositories/instructor/CourseRepository.js';
import { v2 as cloudinaryV2 } from 'cloudinary';
import InstructorUploadService from '../../../infrastructure/cloudinary/InstructorUploadService.js';

class InstructorCourseUseCases {
  constructor(
    private courseRepository: CourseRepository,
    private instructorUploadService: InstructorUploadService,
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

  async createCourse(formData: ICourse, instructorId: string) {
    try {
      const {
        title,
        subtitle,
        category,
        subcategory,
        language,
        level,
        description,
        price,
        welcomeMessage,
        courseCompletionMessage,
        thumbnail,
        chapters,
      } = formData;
      if (!chapters) {
        throw new Error('Invalid form data');
      }
      const alteredChapters = chapters.map((chapter: IChapter) => ({
        ...chapter,
        episodes: chapter.episodes.map((episode: IEpisode) => ({
          ...episode,
          content:
            episode.type === 'video'
              ? null
              : typeof episode.content === 'object' &&
                  episode.content &&
                  'content' in episode.content
                ? episode.content.content
                : null,
        })),
      }));

      const courseData = new Course(
        instructorId,
        title,
        subtitle,
        category,
        subcategory,
        language,
        level,
        description,
        price,
        price,
        thumbnail,
        false,
        false,
        0,
        welcomeMessage,
        courseCompletionMessage,
        alteredChapters,
      );
      return await this.courseRepository.createCourse(courseData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase Error: Creating course', error);

      throw new Error(error);
    }
  }

  async updateVideoUrl(uploads: UploadState[], courseId: string) {
    try {
      await this.courseRepository.uploadVideoUrl(uploads, courseId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase Error: updating video url', error);

      throw new Error(error);
    }
  }

  async fetchCourses(userId: string) {
    try {
      return await this.courseRepository.fetchCourses(userId);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase Error: fetching courses', error);

      throw new Error(error);
    }
  }

  async getVideoSign(userId: string) {
    try {
      const folder = `/instructor/course/${userId}`;
      const timestamp = Math.round(new Date().getTime() / 1000);
      const signature = cloudinaryV2.utils.api_sign_request(
        {
          timestamp: timestamp,
          folder: folder,
        },
        `${process.env.CLOUDINARY_API_SECRET}`,
      );

      const data = {
        uploadURL: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
        uploadParams: {
          signature,
          apiKey: `${process.env.CLOUDINARY_API_KEY}`,
          timestamp,
          folder,
        },
      };

      return data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase Error: Creating signature failed', error);

      throw new Error(error);
    }
  }

  async uploadCourseThumbnail(file: UploadedFile, instructorId: string) {
    try {
      if (!file.mimetype.startsWith('image/')) {
        throw new Error('Usecase Error: Invaild file type');
      }

      const folderPath = 'instructor/course/thumbnail';
      const result = await this.instructorUploadService.uploadfile(
        file,
        instructorId,
        folderPath,
      );
      const imageUrl = result.secure_url;
      return imageUrl;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in uploading thumbnail', error);

      throw new Error(error);
    }
  }

  async removeCourseThumbnail(publicId: string) {
    try {
      await this.instructorUploadService.removefile(publicId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase: Error in uploading thumbnail', error);

      throw new Error(error);
    }
  }
}

export default InstructorCourseUseCases;
