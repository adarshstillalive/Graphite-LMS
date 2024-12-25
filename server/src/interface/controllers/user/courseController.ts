import { Request, Response } from 'express';
import CourseModel from '../../../infrastructure/databases/mongoDB/models/CourseModel.js';
import MongoGenericRepository from '../../../infrastructure/databases/mongoDB/MongoGenericRepository.js';
import { createResponse } from '../../../utils/createResponse.js';
import UserCourseUseCases from '../../../application/useCases/user/userCourseUseCases.js';
import MongoCourseRepository from '../../../infrastructure/databases/mongoDB/user/MongoCourseRepository.js';
import { SortOrder } from 'mongoose';

const courseRepository = new MongoCourseRepository();
const userCourseUseCases = new UserCourseUseCases(courseRepository);

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
    const purchasedCourses = req.user?.purchasedCourses;

    const course = await userCourseUseCases.fetchCourseById(
      id,
      purchasedCourses,
    );

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

export default {
  fetchPaginatedCourse,
  fetchPaginatedCourseProductPage,
  fetchCategories,
  fetchCourseById,
  fetchInstructor,
};
