import { Request, Response } from 'express';
import MongoCourseRepository from '../../../infrastructure/databases/mongoDB/instructor/MongoCourseRepository.js';
import InstructorCourseUseCases from '../../../application/useCases/instructor/instructorCourseUseCases.js';
import { createResponse } from '../../../utils/createResponse.js';

const courseRepository = new MongoCourseRepository();
const instructorCourseUseCases = new InstructorCourseUseCases(courseRepository);
const fetchCategories = async (req: Request, res: Response) => {
  try {
    const categories = await instructorCourseUseCases.fetchCategories();

    res
      .status(200)
      .json(
        createResponse(true, 'Fetching categories successfull', categories),
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        createResponse(
          false,
          'Controller error: Fetching categories',
          {},
          error,
        ),
      );
  }
};

export default {
  fetchCategories,
};
