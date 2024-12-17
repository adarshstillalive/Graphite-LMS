import { IUserProfileUpdationFormData } from '../../../application/useCases/instructor/instructorProfileUseCases.js';
import { IMongoUser } from '../../../infrastructure/databases/mongoDB/models/UserModel.js';

interface UserProfileRepository {
  fetchUserById(userId: string): Promise<IMongoUser>;
  updateProfilePicture(userId: string, url: string): Promise<void>;
  updateProfileData(
    instructorId: string,
    userFormData: IUserProfileUpdationFormData,
  ): Promise<void>;
  updatePassword(userId: string, newPassword: string): Promise<void>;
}

export default UserProfileRepository;
