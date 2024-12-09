import mongoose from 'mongoose';
import { ICategory } from '../../../../domain/entities/Category.js';
import { ICourse, UploadState } from '../../../../domain/entities/Course.js';
import CourseRepository from '../../../../domain/repositories/instructor/CourseRepository.js';
import CategoryModel from '../models/CategoryModel.js';
import CourseModel from '../models/CourseModel.js';
import InstructorModel from '../models/InstructorModel.js';

class MongoCourseRepository implements CourseRepository {
  async fetchCategories(): Promise<ICategory[]> {
    try {
      const categories = await CategoryModel.find();
      return categories;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo: Error in fetching categories', error);

      throw new Error(error);
    }
  }

  async createCourse(courseData: ICourse): Promise<string> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const newCourse = new CourseModel(courseData);
      await newCourse.save({ session });

      await InstructorModel.updateOne(
        { userId: courseData.instructorId },
        { $push: { courses: newCourse._id } },
        { session },
      );

      await session.commitTransaction();
      session.endSession();

      return String(newCourse._id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();
      console.error('Mongo: Error in creating course', error);
      throw error;
    }
  }

  async uploadVideoUrl(
    uploads: UploadState[],
    courseId: string,
  ): Promise<void> {
    try {
      const course = await CourseModel.findById(courseId);

      if (!course) {
        throw new Error('Course not found');
      }

      uploads.forEach((item) => {
        if (course.chapters) {
          course.chapters.forEach((chapter) => {
            if (item.chapterId === chapter.id) {
              chapter.episodes.forEach((episode) => {
                if (item.episodeId === episode.id && episode.type === 'video') {
                  episode.content = item.videoUrl;
                }
              });
            }
          });
        }
      });

      await course.save();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo: Error in updating video url', error);
      throw new Error(error);
    }
  }
}

export default MongoCourseRepository;
