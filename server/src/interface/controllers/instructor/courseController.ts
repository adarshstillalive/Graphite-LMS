import { Request, Response } from 'express';
import MongoCourseRepository from '../../../infrastructure/databases/mongoDB/instructor/MongoCourseRepository.js';
import InstructorCourseUseCases from '../../../application/useCases/instructor/instructorCourseUseCases.js';
import { createResponse } from '../../../utils/createResponse.js';
import { v2 as cloudinaryV2 } from 'cloudinary';

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
  fetchCategories,
  getvideoSign,
};
