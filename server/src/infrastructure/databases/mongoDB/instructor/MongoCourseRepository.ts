import mongoose from 'mongoose';
import { ICategory } from '../../../../domain/entities/Category.js';
import {
  ICourse,
  IEditCourse,
  UploadState,
} from '../../../../domain/entities/Course.js';
import CourseRepository from '../../../../domain/repositories/instructor/CourseRepository.js';
import CategoryModel from '../models/CategoryModel.js';
import CourseModel, { IMongoCourse } from '../models/CourseModel.js';
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
        {
          $push: {
            courses: {
              courseId: newCourse._id,
              createdAt: new Date(),
            },
          },
        },
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

  async editCourse(courseId: string, courseData: IEditCourse): Promise<void> {
    try {
      const status = await CourseModel.updateOne(
        { _id: courseId },
        { $set: { ...courseData } },
      );
      if (status.matchedCount === 0) {
        throw new Error('Mongo Error: Updating the course');
      }
    } catch (error) {
      console.log(error);

      throw new Error('Mongo Error: Updating the course');
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

  async fetchCourses(userId: string): Promise<IMongoCourse[]> {
    try {
      const courses = await CourseModel.find({ instructorId: userId })
        .populate('instructorId')
        .populate('category');
      if (!courses) {
        throw new Error('Mongo: Error in fetching courses');
      }
      return courses;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo: Error in fetching courses', error);
      throw new Error(error);
    }
  }

  async fetchCourse(courseId: string): Promise<IMongoCourse> {
    try {
      const course = await CourseModel.findById(courseId)
        .populate('instructorId')
        .populate('category');
      if (!course) {
        throw new Error('Mongo: Error in fetching courses');
      }
      return course;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo: Error in fetching course', error);
      throw new Error(error);
    }
  }

  async publishAction(courseId: string): Promise<void> {
    try {
      const course = await CourseModel.findById(courseId);

      if (!course) {
        throw new Error('Course not found for the given ID');
      }

      course.isPublished = !course.isPublished;
      await course.save();
    } catch (error) {
      console.error('Error in publishAction:', error);

      throw new Error('Failed to toggle the publish status of the course');
    }
  }

  async deleteCourse(courseId: string): Promise<void> {
    try {
      const status = await CourseModel.deleteOne({ _id: courseId });

      if (status.deletedCount !== 1) {
        throw new Error('Mongo Error: Course not found for the given ID');
      }
    } catch (error) {
      console.error('Error in deletion action:', error);

      throw new Error('Mongo Error: Failed to delete the course');
    }
  }

  async removeCourseFromInstructor(
    courseId: string,
    instructorId: string,
  ): Promise<void> {
    try {
      const status = await InstructorModel.updateOne(
        { userId: instructorId },
        { $pull: { courses: { courseId: courseId } } },
      );

      if (status.modifiedCount !== 1) {
        throw new Error('Course not found for the given ID');
      }
    } catch (error) {
      console.error('Error in deletion action:', error);

      throw new Error('Mongo Error: Failed to process deletion of course');
    }
  }
}

export default MongoCourseRepository;
