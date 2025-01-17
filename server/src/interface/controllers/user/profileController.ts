import { Request, Response } from 'express';
import { createResponse } from '../../../utils/createResponse.js';
import UserProfileUseCases from '../../../application/useCases/user/userProfileUseCases.js';
import UserUploadService from '../../../infrastructure/cloudinary/userUploadService.js';
import MongoUserProfileRepository from '../../../infrastructure/databases/mongoDB/user/MongoUserProfileRepository.js';
import { UploadedFile } from 'express-fileupload';
import PostgresUserRepository from '../../../infrastructure/databases/postgreSQL/PostgresUserRepository.js';

const userProfileRepository = new MongoUserProfileRepository();
const userAuthRepository = new PostgresUserRepository();
const userUploadService = new UserUploadService();
const userProfileUseCases = new UserProfileUseCases(
  userAuthRepository,
  userProfileRepository,
  userUploadService,
);

const updateProfileData = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Controller error: User fetching failed');
    }
    const { userFormData } = req.body;
    const user = await userProfileUseCases.updateProfileData(
      userId,
      userFormData,
    );
    req.user = user;

    res.status(200).json(createResponse(true, 'User data updation successful'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(400)
      .json(
        createResponse(
          false,
          'Controller Error: Updation failed',
          {},
          error?.message,
        ),
      );
  }
};

const updateUserProfilePicture = async (req: Request, res: Response) => {
  try {
    if (!req.files || !req.files.file) {
      throw new Error('Error fetching image');
    }
    const file = req.files.file as UploadedFile;
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const userData = await userProfileUseCases.updateProfilePicture(
      file,
      userId,
    );
    req.user = userData;
    res.status(200).json(createResponse(true, 'Profile picture updated'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const { credentials } = req.body;

    const userId = String(req.user?._id);
    const email = req.user?.email;
    if (!userId || !email) {
      throw new Error('Server error');
    }
    await userProfileUseCases.changePassword(email, userId, credentials);

    res.status(200).json(createResponse(true, 'Password changed'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;

    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const userData = await userProfileUseCases.addToWishlist(userId, courseId);
    req.user = userData;
    res.status(200).json(createResponse(true, 'Added to wishlist'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;

    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const userData = await userProfileUseCases.removeFromWishlist(
      userId,
      courseId,
    );
    req.user = userData;
    res.status(200).json(createResponse(true, 'Removed from wishlist'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const addToCart = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;

    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const userData = await userProfileUseCases.addToCart(userId, courseId);
    req.user = userData;
    res.status(200).json(createResponse(true, 'Added to cart'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const removeFromCart = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;

    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const userData = await userProfileUseCases.removeFromCart(userId, courseId);
    req.user = userData;
    res.status(200).json(createResponse(true, 'Removed from cart'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const fetchPurchasedCourses = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const courses = await userProfileUseCases.fetchPurchasedCourses(userId);
    res.status(200).json(createResponse(true, 'Courses fetched', courses));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const updateCourseProgress = async (req: Request, res: Response) => {
  try {
    const { courseId, chapterId, episodeId, progress } = req.params;
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const progressData = await userProfileUseCases.updateCourseProgress(
      userId,
      courseId,
      chapterId,
      episodeId,
      Number(progress),
    );
    res
      .status(200)
      .json(createResponse(true, 'Progress updated', progressData));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const fetchWallet = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const wallet = await userProfileUseCases.fetchWallet(userId);
    res
      .status(200)
      .json(createResponse(true, 'Wallet data fetching successfull', wallet));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const fetchProgress = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    const { courseId } = req.params;
    if (!userId) {
      throw new Error('Server error');
    }
    const progress = await userProfileUseCases.fetchProgress(userId, courseId);
    res
      .status(200)
      .json(
        createResponse(true, 'Progress data fetching successfull', progress),
      );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const fetchInitialChatData = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const result = await userProfileUseCases.fetchInitialChatData(userId);
    res
      .status(200)
      .json(createResponse(true, 'Initial data fetching successfull', result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const setInstructorChat = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    if (!userId) {
      throw new Error('Server error');
    }
    const { instructorId } = req.body;
    await userProfileUseCases.setInstructorChat(userId, instructorId);
    res.status(200).json(createResponse(true, 'Chat creation successfull'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

const fetchUserChat = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    const messages = await userProfileUseCases.fetchUserChat(chatId);
    res
      .status(200)
      .json(createResponse(true, 'Message fetching successfull', messages));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json(createResponse(false, error?.message));
  }
};

export default {
  updateProfileData,
  updateUserProfilePicture,
  changePassword,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  fetchPurchasedCourses,
  updateCourseProgress,
  fetchWallet,
  fetchProgress,
  fetchInitialChatData,
  setInstructorChat,
  fetchUserChat,
};
