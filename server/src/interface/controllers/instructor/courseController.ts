import { Request, Response } from 'express';
import MongoCourseRepository from '../../../infrastructure/databases/mongoDB/instructor/MongoCourseRepository.js';
import InstructorCourseUseCases from '../../../application/useCases/instructor/instructorCourseUseCases.js';
import { createResponse } from '../../../utils/createResponse.js';
import { UploadedFile } from 'express-fileupload';
import InstructorUploadService from '../../../infrastructure/cloudinary/InstructorUploadService.js';

const courseRepository = new MongoCourseRepository();
const instructorUploadService = new InstructorUploadService();
const instructorCourseUseCases = new InstructorCourseUseCases(
  courseRepository,
  instructorUploadService,
);

const fetchCourses = async (req: Request, res: Response) => {
  try {
    const instructorId = String(req.user?._id);
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

const fetchCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await instructorCourseUseCases.fetchCourse(id);
    res
      .status(200)
      .json(createResponse(true, 'Fetching course successfull', course));
  } catch (error) {
    res
      .status(500)
      .json(
        createResponse(
          false,
          'Controller error: Fetching course failed',
          {},
          error,
        ),
      );
  }
};

const createCourse = async (req: Request, res: Response) => {
  try {
    const { formData } = req.body;
    const instructorId = String(req.user?._id);
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

const editCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const { formData } = req.body;
    await instructorCourseUseCases.editCourse(formData, courseId);
    res.status(201).json(createResponse(true, 'Course created successfully'));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, 'Course creation failed', {}, error));
  }
};

const deleteCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const instructorId = String(req.user?._id);
    if (!instructorId) {
      throw new Error('Server error');
    }

    await instructorCourseUseCases.deleteCourse(courseId, instructorId);

    res.status(200).json(createResponse(true, 'Course deleted successfully'));
  } catch (error) {
    res
      .status(500)
      .json(
        createResponse(
          false,
          'Controller error: Course deleton failed',
          {},
          error,
        ),
      );
  }
};

const uploadCourseThumbnail = async (req: Request, res: Response) => {
  try {
    if (!req.files || !req.files.file) {
      throw new Error('Error fetching image file');
    }
    const file = req.files.file as UploadedFile;
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const imageUrl = await instructorCourseUseCases.uploadCourseThumbnail(
      file,
      userId,
    );
    res.status(200).json(createResponse(true, 'Thumbnail uploaded', imageUrl));
  } catch (error) {
    res
      .status(500)
      .json(
        createResponse(
          false,
          'Controller error: Thumbnail upload failed',
          {},
          error,
        ),
      );
  }
};

const removeCourseThumbnail = async (req: Request, res: Response) => {
  try {
    const { publicId } = req.query;

    if (typeof publicId !== 'string') {
      throw new Error('Invalid publicId');
    }
    await instructorCourseUseCases.removeCourseThumbnail(publicId);
    res.status(200).json(createResponse(true, 'Thumbnail removed'));
  } catch (error) {
    res
      .status(500)
      .json(
        createResponse(
          false,
          'Controller error: Thumbnail removal failed',
          {},
          error,
        ),
      );
  }
};

const publishAction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== 'string') {
      throw new Error('Invalid publicId');
    }
    const course = await instructorCourseUseCases.publishAction(id);
    res.status(200).json(createResponse(true, 'Action successfull', course));
  } catch (error) {
    res
      .status(500)
      .json(
        createResponse(
          false,
          'Controller error: Publish action failed',
          {},
          error,
        ),
      );
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
    const instructorId = String(req.user?._id);
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
  fetchCourseById,
  createCourse,
  editCourse,
  deleteCourse,
  removeCourseThumbnail,
  uploadCourseThumbnail,
  publishAction,
  uploadVideoUrl,
  fetchCategories,
  getvideoSign,
};
