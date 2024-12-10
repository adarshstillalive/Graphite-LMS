import { Request, Response } from 'express';
import CreateCategory from '../../../application/useCases/admin/course/category.js';
import MongoCourseRepository from '../../../infrastructure/databases/mongoDB/admin/MongoCourseRepository.js';
import { createResponse } from '../../../utils/createResponse.js';
import CategoryModel from '../../../infrastructure/databases/mongoDB/models/CategoryModel.js';
import MongoGenericRepository from '../../../infrastructure/databases/mongoDB/MongoGenericRepository.js';
import CourseModel from '../../../infrastructure/databases/mongoDB/models/CourseModel.js';
import CourseUseCase from '../../../application/useCases/admin/course/courseUseCase.js';
import { SortOrder } from 'mongoose';

const courseRepository = new MongoCourseRepository();

const category = new CreateCategory(courseRepository);
const courseUseCase = new CourseUseCase(courseRepository);

const paginatedAllCourses = async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort as string;
    const [[field, order]] = Object.entries(sort);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};

    const model = CourseModel;
    const courseRequestRepository = new MongoGenericRepository(model);

    const result =
      await courseRequestRepository.getPaginatedCoursesWithPopulatedUserId(
        page,
        limit,
        filter,
        { [field]: Number(order) as SortOrder },
      );

    res
      .status(200)
      .json(createResponse(true, 'Fetching request successfull', result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller: Error in fetching courses',
          {},
          error?.message,
        ),
      );
  }
};

const addCategory = async (req: Request, res: Response) => {
  try {
    const { categoryData } = req.body;

    await category.create(categoryData);
    res.status(201).json(createResponse(true, 'Category added'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const paginatedCategoryList = async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort as string;
    const [[field, order]] = Object.entries(sort);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};
    const model = CategoryModel;
    const categoryRepository = new MongoGenericRepository(model);

    const result = await categoryRepository.getPaginated(page, limit, filter, {
      [field]: Number(order) as SortOrder,
    });

    res
      .status(200)
      .json(createResponse(true, 'Page generation success', result));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(createResponse(false, 'Error fetching paginated data', error));
  }
};

const editCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { categoryData } = req.body;

    await category.update(id, categoryData);
    res.status(200).json(createResponse(true, 'Category updated'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const paginatedCourseRequests = async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort as string;
    const [[field, order]] = Object.entries(sort);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};

    const model = CourseModel;
    const courseRequestRepository = new MongoGenericRepository(model);

    const result =
      await courseRequestRepository.getPaginatedRequestWithPopulatedUserId(
        page,
        limit,
        filter,
        { [field]: Number(order) as SortOrder },
      );

    res
      .status(200)
      .json(createResponse(true, 'Fetching request successfull', result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(500)
      .json(
        createResponse(false, 'Fetching request failed', {}, error?.message),
      );
  }
};

const paginatedRejectedCourseRequests = async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort as string;
    const [[field, order]] = Object.entries(sort);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};

    const model = CourseModel;
    const courseRequestRepository = new MongoGenericRepository(model);

    const result =
      await courseRequestRepository.getPaginatedRejectedRequestWithPopulatedUserId(
        page,
        limit,
        filter,
        { [field]: Number(order) as SortOrder },
      );

    res
      .status(200)
      .json(createResponse(true, 'Fetching request successfull', result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(500)
      .json(
        createResponse(false, 'Fetching request failed', {}, error?.message),
      );
  }
};

const approveCourseRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await courseUseCase.approveCourse(id);

    res.status(200).json(createResponse(true, 'Approved the course'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(false, 'Approving request failed', {}, error?.message),
      );
  }
};

const rejectCourseRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    await courseUseCase.rejectCourse(id, reason);

    res.status(200).json(createResponse(true, 'Approved the course'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(false, 'Approving request failed', {}, error?.message),
      );
  }
};

export default {
  paginatedAllCourses,
  addCategory,
  paginatedCategoryList,
  editCategory,
  paginatedCourseRequests,
  paginatedRejectedCourseRequests,
  approveCourseRequest,
  rejectCourseRequest,
};
