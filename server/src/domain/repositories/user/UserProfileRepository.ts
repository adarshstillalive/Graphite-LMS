import { IUserProfileUpdationFormData } from '../../../application/useCases/instructor/instructorProfileUseCases.js';
import { IMongoCourse } from '../../../infrastructure/databases/mongoDB/models/CourseModel.js';
import { IMongoUser } from '../../../infrastructure/databases/mongoDB/models/UserModel.js';

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
}

export default UserProfileRepository;
