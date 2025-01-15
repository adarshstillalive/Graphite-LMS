import {
  InstructorReview,
  Review,
} from '../../../../application/useCases/user/userCourseUseCases.js';
import { ICategory } from '../../../../domain/entities/Category.js';
import CourseRepository from '../../../../domain/repositories/user/CourseRepository.js';
import CategoryModel from '../models/CategoryModel.js';
import CourseModel, {
  IMongoCourse,
  IMongoCourseCommon,
} from '../models/CourseModel.js';
import InstructorModel, {
  IMongoInstructor,
} from '../models/InstructorModel.js';
import InstructorReviewModel from '../models/InstructorReviewModel.js';
import ReviewModel from '../models/ReviewModel.js';

class MongoCourseRepository implements CourseRepository {
  async fetchCategories(): Promise<ICategory[]> {
    try {
      const categories = await CategoryModel.find();
      return categories;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: fetching categories', error);

      throw new Error(error);
    }
  }

  async fetchCourseById(courseId: string): Promise<IMongoCourseCommon> {
    try {
      const course = await CourseModel.findById(courseId)
        .select('-chapters.episodes.content')
        .populate('instructorId')
        .populate('category');
      if (!course) {
        throw new Error('Mongo Error: fetching course');
      }

      return course;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: fetching course', error);

      throw new Error(error);
    }
  }

  async fetchPurchasedCourseById(courseId: string): Promise<IMongoCourse> {
    try {
      const course = await CourseModel.findById(courseId)
        .populate('instructorId')
        .populate('category');
      if (!course) {
        throw new Error('Mongo Error: fetching course');
      }

      return course;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: fetching course', error);

      throw new Error(error);
    }
  }

  async fetchInstructor(instructorId: string): Promise<IMongoInstructor> {
    try {
      const instructorData = await InstructorModel.findOne({
        userId: instructorId,
      })
        .select('-chapters.episodes.content')
        .populate('userId')
        .populate({
          path: 'courses.courseId',
          populate: {
            path: 'category',
            model: 'Category', // Replace with the actual model name for categories
          },
        });

      if (!instructorData) {
        throw new Error('Mongo Error: fetching course');
      }

      return instructorData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: fetching course', error);

      throw new Error(error);
    }
  }

  async addOrUpdateReview(reviewData: Review): Promise<void> {
    try {
      const { userId, courseId, rating, review } = reviewData;
      const reviewStatus = await ReviewModel.updateOne(
        { userId, courseId },
        { $set: { rating, review } },
        { upsert: true },
      );

      if (reviewStatus.upsertedCount <= 0 && reviewStatus.modifiedCount <= 0) {
        throw new Error('Mongo Error: Updating review');
      }

      const course = await CourseModel.findById(courseId);
      if (!course) {
        throw new Error('Course not found');
      }

      if (reviewStatus.upsertedCount > 0 && reviewStatus.upsertedId) {
        // Ensure reviews is initialized
        if (!course.reviews) {
          course.reviews = [];
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newReviewId: any = reviewStatus.upsertedId;
        course.reviews.push(newReviewId);
      }

      // Calculate new average rating
      const allReviews = await ReviewModel.find({ courseId });
      const averageRating =
        allReviews.reduce((sum, rev) => sum + rev.rating, 0) /
        allReviews.length;

      course.rating = averageRating;
      await course.save();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: Updating review', error);
      throw new Error(error);
    }
  }

  async addOrUpdateInstructorReview(
    reviewData: InstructorReview,
  ): Promise<void> {
    try {
      const { userId, instructorId, rating, review } = reviewData;
      const reviewStatus = await InstructorReviewModel.updateOne(
        { userId, instructorId },
        { $set: { rating, review } },
        { upsert: true },
      );

      if (reviewStatus.upsertedCount <= 0 && reviewStatus.modifiedCount <= 0) {
        throw new Error('Mongo Error: Updating review');
      }

      const instructor = await InstructorModel.findById(instructorId);
      if (!instructor) {
        throw new Error('Course not found');
      }

      if (reviewStatus.upsertedCount > 0 && reviewStatus.upsertedId) {
        // Ensure reviews is initialized
        if (!instructor.reviews) {
          instructor.reviews = [];
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newReviewId: any = reviewStatus.upsertedId;
        instructor.reviews.push(newReviewId);
      }

      // Calculate new average rating
      const allReviews = await InstructorReviewModel.find({ instructorId });
      const averageRating =
        allReviews.reduce((sum, rev) => sum + rev.rating, 0) /
        allReviews.length;

      instructor.rating = averageRating;
      await instructor.save();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: Updating review', error);
      throw new Error(error);
    }
  }

  async searchCourses(
    limit: number,
    filter: object = {},
  ): Promise<IMongoCourse[]> {
    const data = await CourseModel.find({
      ...filter,
      isApproved: true,
      isRejected: false,
      isPublished: true,
    })
      .select('-chapters.episodes.content')
      .limit(limit)
      .collation({ locale: 'en', strength: 2 });

    return data;
  }
}

export default MongoCourseRepository;
