import { Request, Response } from 'express';
import CreateCategory from '../../../application/useCases/admin/course/category.js';
import MongoCourseRepository from '../../../infrastructure/databases/mongoDB/admin/MongoCourseRepository.js';
import { createResponse } from '../../../utils/createResponse.js';
import CategoryModel from '../../../infrastructure/databases/mongoDB/models/CategoryModel.js';
import MongoGenericRepository from '../../../infrastructure/databases/mongoDB/MongoGenericRepository.js';

const courseRepository = new MongoCourseRepository();

const category = new CreateCategory(courseRepository);

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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};
    const model = CategoryModel;
    const categoryRepository = new MongoGenericRepository(model);

    const result = await categoryRepository.getPaginatedCategory(
      page,
      limit,
      filter,
    );

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

export default { addCategory, paginatedCategoryList, editCategory };
