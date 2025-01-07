import { IUserProfileUpdationFormData } from '../../../application/useCases/instructor/instructorProfileUseCases.js';
import { InitialChatData } from '../../../application/useCases/user/userProfileUseCases.js';
import { IMongoCourse } from '../../../infrastructure/databases/mongoDB/models/CourseModel.js';
import { IMongoCourseProgress } from '../../../infrastructure/databases/mongoDB/models/CourseProgress.js';
import { IMongoMessage } from '../../../infrastructure/databases/mongoDB/models/MessageModel.js';
import { IMongoUser } from '../../../infrastructure/databases/mongoDB/models/UserModel.js';
import { IMongoWallet } from '../../../infrastructure/databases/mongoDB/models/Wallet.js';

interface UserProfileRepository {
  fetchUserById(userId: string): Promise<IMongoUser>;
  updateProfilePicture(userId: string, url: string): Promise<void>;
  updateProfileData(
    instructorId: string,
    userFormData: IUserProfileUpdationFormData,
  ): Promise<void>;
  updatePassword(userId: string, newPassword: string): Promise<void>;
  addToWishlist(userId: string, courseId: string): Promise<void>;
  removeFromWishlist(userId: string, courseId: string): Promise<void>;
  addToCart(userId: string, courseId: string): Promise<void>;
  removeFromCart(userId: string, courseId: string): Promise<void>;
  fetchPurchasedCourses(userId: string): Promise<IMongoCourse[]>;
  updateCourseProgress(
    userId: string,
    courseId: string,
    chapterId: string,
    episodeId: string,
    progress: number,
  ): Promise<void>;
  fetchWallet(userId: string): Promise<IMongoWallet>;
  debitWallet(userId: string, amount: number): Promise<void>;
  fetchProgress(
    userId: string,
    courseId: string,
  ): Promise<IMongoCourseProgress>;
  fetchInitialChatData(userId: string): Promise<InitialChatData>;
  setInstructorChat(userId: string, instructorId: string): Promise<void>;
  fetchUserChat(chatId: string): Promise<IMongoMessage[]>;
}

export default UserProfileRepository;
