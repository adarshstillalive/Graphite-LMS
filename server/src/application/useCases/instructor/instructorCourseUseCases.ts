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
      console.log('Usecase Error: in uploading thumbnail', error);

      throw new Error(error);
    }
  }

  async fetchCourse(courseId: string) {
    try {
      return await this.courseRepository.fetchCourse(courseId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase Error: fetching course', error);

      throw new Error(error);
    }
  }

  async publishAction(courseId: string) {
    try {
      await this.courseRepository.publishAction(courseId);
      return await this.courseRepository.fetchCourse(courseId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase Error: Publish action failed', error);

      throw new Error(error);
    }
  }

  generateThumbnailPublicId(url: string): string {
    const regex = /instructor\/course\/thumbnail\/(.+)\./;
    const match = url.match(regex);

    if (!match) {
      throw new Error('Service Error: Invalid thumbnail URL format');
    }
    return `instructor/course/thumbnail/${match[1]}`;
  }

  generateVideoPublicId(url: string): string {
    const regex = /instructor\/course\/(.+)\./;
    const match = url.match(regex);

    if (!match) {
      throw new Error('Service Error: Invalid video URL format');
    }
    return `instructor/course/${match[1]}`;
  }

  async deleteCourse(courseId: string, instructorId: string) {
    try {
      const course = await this.courseRepository.fetchCourse(courseId);

      const videoUrls: string[] = [];
      const thumbnailUrl = this.generateThumbnailPublicId(course.thumbnail);

      course.chapters?.forEach((chapter) => {
        chapter.episodes.forEach((episode) => {
          if (episode.type === 'video') {
            videoUrls.push(episode.content);
          }
        });
      });

      const publicIds = videoUrls.map((url) => this.generateVideoPublicId(url));
      publicIds.push(thumbnailUrl);
      await this.instructorUploadService.bulkDeleteFromCloudinary(publicIds);

      await this.courseRepository.deleteCourse(courseId);
      await this.courseRepository.removeCourseFromInstructor(
        courseId,
        instructorId,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Usecase Error: Deletion of course failed', error);

      throw new Error(error);
    }
  }
}

export default InstructorCourseUseCases;
