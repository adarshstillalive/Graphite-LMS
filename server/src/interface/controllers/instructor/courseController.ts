import { Request, Response } from 'express';
import MongoCourseRepository from '../../../infrastructure/databases/mongoDB/instructor/MongoCourseRepository.js';
import InstructorCourseUseCases from '../../../application/useCases/instructor/instructorCourseUseCases.js';
import { createResponse } from '../../../utils/createResponse.js';

const courseRepository = new MongoCourseRepository();
const instructorCourseUseCases = new InstructorCourseUseCases(courseRepository);

const fetchCourses = async (req: Request, res: Response) => {
  try {
    const instructorId = req.user?._id;
    if (!instructorId) {
      throw new Error('Server error');
    }
    const courses = await instructorCourseUseCases.fetchCourses(instructorId);
    res
      .status(200)
      .json(createResponse(true, 'Fetching courses successfull', courses));
  } catch (error) {
    res.status(500).json(createResponse(false, 'Controller error', {}, error));
  }
};

const createCourse = async (req: Request, res: Response) => {
  try {
    const { formData } = req.body;
    const instructorId = req.user?._id;
    if (!instructorId) {
      throw new Error('Server error');
    }
    const courseId = await instructorCourseUseCases.createCourse(
      formData,
      instructorId,
    );
    res
      .status(201)
      .json(createResponse(true, 'Course created successfully', { courseId }));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, 'Course creation failed', {}, error));
  }
};

const uploadVideoUrl = async (req: Request, res: Response) => {
  try {
    const { uploads, courseId } = req.body;
    await instructorCourseUseCases.updateVideoUrl(uploads, courseId);
    res.status(200).json(createResponse(true, 'Url updation success'));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, 'Video url updation failed', {}, error));
  }
};

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

const getvideoSign = async (req: Request, res: Response) => {
  try {
    const instructorId = req.user?._id;
    if (!instructorId) {
      throw new Error('Server error');
    }

    const data = await instructorCourseUseCases.getVideoSign(instructorId);

    res
      .status(200)
      .json(createResponse(true, 'Signature generation successfull', data));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        createResponse(
          false,
          'Controller error: Generating video sign',
          {},
          error,
        ),
      );
  }
};

export default {
  fetchCourses,
  createCourse,
  uploadVideoUrl,
  fetchCategories,
  getvideoSign,
};
