import { Request, Response } from 'express';
import CourseModel from '../../../infrastructure/databases/mongoDB/models/CourseModel.js';
import MongoGenericRepository from '../../../infrastructure/databases/mongoDB/MongoGenericRepository.js';
import { createResponse } from '../../../utils/createResponse.js';
import UserCourseUseCases from '../../../application/useCases/user/userCourseUseCases.js';
import MongoCourseRepository from '../../../infrastructure/databases/mongoDB/user/MongoCourseRepository.js';

const courseRepository = new MongoCourseRepository();
const userCourseUseCases = new UserCourseUseCases(courseRepository);

const fetchPaginatedCourse = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};
    const model = CourseModel;
    const courseRepository = new MongoGenericRepository(model);
    const result =
      await courseRepository.getPaginatedCoursesWithPopulatedUserIdForCommonUser(
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
    const course = await userCourseUseCases.fetchCourseById(id);

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

export default {
  fetchPaginatedCourse,
  fetchCategories,
  fetchCourseById,
};