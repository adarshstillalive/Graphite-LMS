import { Request, Response } from 'express';
import CourseModel from '../../../infrastructure/databases/mongoDB/models/CourseModel.js';
import MongoGenericRepository from '../../../infrastructure/databases/mongoDB/MongoGenericRepository.js';
import { createResponse } from '../../../utils/createResponse.js';
import UserCourseUseCases from '../../../application/useCases/user/userCourseUseCases.js';
import MongoCourseRepository from '../../../infrastructure/databases/mongoDB/user/MongoCourseRepository.js';
import { SortOrder } from 'mongoose';
import MongoUserProfileRepository from '../../../infrastructure/databases/mongoDB/user/MongoUserProfileRepository.js';
import ReviewModel from '../../../infrastructure/databases/mongoDB/models/ReviewModel.js';
import InstructorReviewModel from '../../../infrastructure/databases/mongoDB/models/InstructorReviewModel.js';

const courseRepository = new MongoCourseRepository();
const userProfileRepository = new MongoUserProfileRepository();
const userCourseUseCases = new UserCourseUseCases(
  courseRepository,
  userProfileRepository,
);

const fetchPaginatedCourse = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const model = CourseModel;
    const courseRepository = new MongoGenericRepository(model);
    const result =
      await courseRepository.getPaginatedCoursesWithPopulatedUserIdForHomePage(
        page,
        limit,
      );

    res
      .status(200)
      .json(createResponse(true, 'Course fetched successfully', result));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: fetching courses',
          {},
          error?.message,
        ),
      );
  }
};

const fetchPaginatedCourseSortedByRating = async (
  req: Request,
  res: Response,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};
    const model = CourseModel;
    const courseRepository = new MongoGenericRepository(model);
    const result =
      await courseRepository.fetchPaginatedCourseSortedByRatingWithPopulatedUserIdForHomePage(
        page,
        limit,
        filter,
      );

    res
      .status(200)
      .json(createResponse(true, 'Course fetched successfully', result));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: fetching courses',
          {},
          error?.message,
        ),
      );
  }
};

const fetchPaginatedCourseProductPage = async (req: Request, res: Response) => {
  try {
    const { subcategories, level, language } = req.query;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters: any = {};

    if (typeof subcategories === 'string') {
      filters['subcategory'] = { $in: subcategories.split(',') };
    }

    if (typeof level === 'string') {
      filters['level'] = { $in: level.split(',') };
    }

    if (typeof language === 'string') {
      filters['language'] = { $in: language.split(',') };
    }

    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};

    const sort = req.query.sort as string;
    const [[field, order]] = Object.entries(sort);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 2;
    const model = CourseModel;
    const courseRepository = new MongoGenericRepository(model);
    const result =
      await courseRepository.getPaginatedCoursesWithPopulatedUserIdForProductPage(
        page,
        limit,
        { ...filters, ...filter },
        { [field]: Number(order) as SortOrder },
      );

    res
      .status(200)
      .json(createResponse(true, 'Course fetched successfully', result));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: fetching courses',
          {},
          error?.message,
        ),
      );
  }
};

const fetchCategories = async (req: Request, res: Response) => {
  try {
    const categories = await userCourseUseCases.fetchCategories();

    res
      .status(200)
      .json(
        createResponse(true, 'Fetching categories successfull', categories),
      );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: fetching categories',
          {},
          error?.message,
        ),
      );
  }
};

const fetchCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    const course = await userCourseUseCases.fetchCourseById(id, userId);

    res
      .status(200)
      .json(createResponse(true, 'fetching course success', course));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: fetching course',
          {},
          error?.message,
        ),
      );
  }
};

const fetchInstructor = async (req: Request, res: Response) => {
  try {
    const { instructorId } = req.params;
    const instructorData =
      await userCourseUseCases.fetchInstructor(instructorId);

    res
      .status(200)
      .json(
        createResponse(true, 'fetching instructor success', instructorData),
      );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: fetching instructor',
          {},
          error?.message,
        ),
      );
  }
};

const fetchReviewsWithUser = async (req: Request, res: Response) => {
  try {
    const { courseId, userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 2;
    const model = ReviewModel;
    const courseReviewRepository = new MongoGenericRepository(model);

    const result = await courseReviewRepository.getReviewsWithUser(
      userId,
      courseId,
      page,
      limit,
    );

    res
      .status(200)
      .json(createResponse(true, 'Fetching reviews successfull', result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: fetching reviews',
          {},
          error?.message,
        ),
      );
  }
};

const addOrUpdateReview = async (req: Request, res: Response) => {
  try {
    const { review } = req.body;

    await courseRepository.addOrUpdateReview(review);

    res.status(200).json(createResponse(true, 'Review action successfull'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: Review action',
          {},
          error?.message,
        ),
      );
  }
};

const fetchReviews = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 2;
    const model = ReviewModel;
    const courseReviewRepository = new MongoGenericRepository(model);

    const result = await courseReviewRepository.getReviews(
      courseId,
      page,
      limit,
    );

    res
      .status(200)
      .json(createResponse(true, 'Fetching reviews successfull', result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: fetching reviews',
          {},
          error?.message,
        ),
      );
  }
};

const fetchInstructorReviewsWithUser = async (req: Request, res: Response) => {
  try {
    const { instructorId, userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 2;
    const model = InstructorReviewModel;
    const instructorReviewRepository = new MongoGenericRepository(model);

    const result =
      await instructorReviewRepository.getInstructorReviewsWithUser(
        userId,
        instructorId,
        page,
        limit,
      );

    res
      .status(200)
      .json(createResponse(true, 'Fetching reviews successfull', result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: fetching reviews',
          {},
          error?.message,
        ),
      );
  }
};

const addOrUpdateInstructorReview = async (req: Request, res: Response) => {
  try {
    const { review } = req.body;

    await courseRepository.addOrUpdateInstructorReview(review);

    res.status(200).json(createResponse(true, 'Review action successfull'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: Review action',
          {},
          error?.message,
        ),
      );
  }
};

const fetchInstructorReviews = async (req: Request, res: Response) => {
  try {
    const { instructorId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 2;
    const model = InstructorReviewModel;
    const instructorReviewRepository = new MongoGenericRepository(model);

    const result = await instructorReviewRepository.getInstructorReviews(
      instructorId,
      page,
      limit,
    );

    res
      .status(200)
      .json(createResponse(true, 'Fetching reviews successfull', result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: fetching reviews',
          {},
          error?.message,
        ),
      );
  }
};

export default {
  fetchPaginatedCourse,
  fetchPaginatedCourseSortedByRating,
  fetchPaginatedCourseProductPage,
  fetchCategories,
  fetchCourseById,
  fetchInstructor,
  fetchReviewsWithUser,
  addOrUpdateReview,
  fetchReviews,
  fetchInstructorReviewsWithUser,
  addOrUpdateInstructorReview,
  fetchInstructorReviews,
};
