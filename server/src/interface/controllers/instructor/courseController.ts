import { Request, Response } from 'express';
import MongoCourseRepository from '../../../infrastructure/databases/mongoDB/instructor/MongoCourseRepository.js';
import InstructorCourseUseCases from '../../../application/useCases/instructor/instructorCourseUseCases.js';
import { createResponse } from '../../../utils/createResponse.js';
import { v2 as cloudinaryV2 } from 'cloudinary';

const courseRepository = new MongoCourseRepository();
const instructorCourseUseCases = new InstructorCourseUseCases(courseRepository);

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
    const folder = `/instructor/course/${req.user?._id}`;
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinaryV2.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: folder,
      },
      `${process.env.CLOUDINARY_API_SECRET}`,
    );

    const data = {
      uploadURL: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
      uploadParams: {
        signature,
        apiKey: `${process.env.CLOUDINARY_API_KEY}`,
        timestamp,
        folder,
      },
    };
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
  createCourse,
  uploadVideoUrl,
  fetchCategories,
  getvideoSign,
};
