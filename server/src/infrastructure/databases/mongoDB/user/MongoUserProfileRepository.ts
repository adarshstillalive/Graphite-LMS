import { IUserProfileUpdationFormData } from '../../../../application/useCases/instructor/instructorProfileUseCases.js';
import UserProfileRepository from '../../../../domain/repositories/user/UserProfileRepository.js';
import CourseModel, { IMongoCourse } from '../models/CourseModel.js';
import CourseProgressModel, {
  IMongoCourseProgress,
} from '../models/CourseProgress.js';
import UserModel, { IMongoUser } from '../models/UserModel.js';
import WalletModel, { IMongoWallet } from '../models/Wallet.js';

class MongoUserProfileRepository implements UserProfileRepository {
  async fetchUserById(userId: string): Promise<IMongoUser> {
    try {
      const user = await UserModel.findById(userId)
        .populate('wishlist')
        .populate('cart')
        .populate('purchasedCourses');
      if (!user) {
        throw new Error('user not found');
      }
      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in fetching instructor', error);

      throw new Error(error);
    }
  }

  async updateProfilePicture(userId: string, url: string): Promise<void> {
    try {
      const update = await UserModel.updateOne(
        { _id: userId },
        { $set: { profilePicture: url } },
      );
      if (update.modifiedCount <= 0) {
        throw new Error('Database error: Profile picture updation failed');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo error: Uploading profile picture', error);

      throw new Error(error);
    }
  }

  async updateProfileData(
    userId: string,
    userFormData: IUserProfileUpdationFormData,
  ): Promise<void> {
    try {
      const updateUser = await UserModel.updateOne(
        { _id: userId },
        { $set: userFormData },
      );
      if (updateUser.matchedCount === 0) {
        throw new Error('Mongo Error: Updating profile');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: Updating profile', error);

      throw new Error(error);
    }
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    try {
      console.log(newPassword);

      const updateData = await UserModel.updateOne(
        { _id: userId },
        { $set: { password: newPassword } },
      );
      if (updateData.modifiedCount <= 0) {
        throw new Error('Database error');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in updating user Password', error);

      throw new Error(error);
    }
  }

  async addToWishlist(userId: string, courseId: string): Promise<void> {
    try {
      const status = await UserModel.updateOne(
        { _id: userId },
        { $push: { wishlist: courseId } },
      );
      if (status.modifiedCount <= 0) {
        throw new Error('Mongo Error: Adding to wishlist');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: Adding to wishlist', error);

      throw new Error(error);
    }
  }

  async removeFromWishlist(userId: string, courseId: string): Promise<void> {
    try {
      const status = await UserModel.updateOne(
        { _id: userId },
        { $pull: { wishlist: courseId } },
      );
      if (status.modifiedCount <= 0) {
        throw new Error('Mongo Error: Removal from wishlist');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: Removal from wishlist', error);

      throw new Error(error);
    }
  }

  async addToCart(userId: string, courseId: string): Promise<void> {
    try {
      const status = await UserModel.updateOne(
        { _id: userId },
        { $push: { cart: courseId } },
      );
      if (status.modifiedCount <= 0) {
        throw new Error('Mongo Error: Adding to cart');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: Adding to cart', error);

      throw new Error(error);
    }
  }

  async removeFromCart(userId: string, courseId: string): Promise<void> {
    try {
      const status = await UserModel.updateOne(
        { _id: userId },
        { $pull: { cart: courseId } },
      );
      if (status.modifiedCount <= 0) {
        throw new Error('Mongo Error: Removal from cart');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: Removal from cart', error);

      throw new Error(error);
    }
  }

  async fetchPurchasedCourses(userId: string): Promise<IMongoCourse[]> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error('Mongo Error: Fetching courses');
      }
      const { purchasedCourses } = user;
      const courses = await CourseModel.find({
        _id: { $in: purchasedCourses },
      })
        .populate('category')
        .populate('instructorId');
      return courses;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Mongo Error: Fetching courses', error);

      throw new Error(error);
    }
  }

  async updateCourseProgress(
    userId: string,
    courseId: string,
    chapterId: string,
    episodeId: string,
    progress: number,
  ): Promise<void> {
    try {
      const progressData = await CourseProgressModel.findOne({
        userId,
        courseId,
      });

      if (!progressData) {
        throw new Error('Progress data not found in the database.');
      }

      // Update the specific episode's progress
      const result = await CourseProgressModel.updateOne(
        {
          userId,
          courseId,
          'chapters.chapterId': chapterId,
          'chapters.episodes.episodeId': episodeId,
        },
        {
          $set: {
            'chapters.$[chapter].episodes.$[episode].progress': progress,
          },
        },
        {
          arrayFilters: [
            { 'chapter.chapterId': chapterId },
            { 'episode.episodeId': episodeId },
          ],
        },
      );

      if (result.modifiedCount === 0) {
        throw new Error('Failed to update the episode progress.');
      }

      // Recalculate total progress
      let totalProgress = 0;
      let totalEpisodes = 0;

      // Fetch the updated data to ensure the calculation is based on the latest values
      const updatedProgressData = await CourseProgressModel.findOne({
        userId,
        courseId,
      });

      if (!updatedProgressData) {
        throw new Error('Failed to fetch updated progress data.');
      }

      for (const chapter of updatedProgressData.chapters) {
        for (const episode of chapter.episodes) {
          totalProgress += episode.progress || 0;
          totalEpisodes += 1;
        }
      }

      // Calculate the average progress as a percentage
      updatedProgressData.totalProgress =
        totalEpisodes > 0 ? totalProgress / totalEpisodes : 0;

      await updatedProgressData.save();
    } catch (error) {
      console.error('Error updating progress:', error);
      throw new Error('Failed to update course progress.');
    }
  }

  async fetchWallet(userId: string): Promise<IMongoWallet> {
    try {
      const result = await WalletModel.findOne({ userId });
      if (!result) {
        throw new Error('Mongo error: Fetching wallet');
      }
      return result;
    } catch (error) {
      console.error('Error Fetching wallet', error);
      throw new Error('Mongo error: Fetching wallet');
    }
  }

  async debitWallet(userId: string, amount: number): Promise<void> {
    try {
      const wallet = await WalletModel.findOne({ userId });
      if (!wallet) {
        throw new Error('Wallet not found for the user');
      }

      if (wallet.balance < amount) {
        throw new Error('Insufficient funds');
      }

      const transaction = {
        type: 'Debit',
        amount,
        date: new Date(),
      };

      const result = await WalletModel.updateOne(
        { userId },
        {
          $inc: { balance: -amount },
          $push: { transaction },
        },
      );

      if (result.modifiedCount === 0) {
        throw new Error('Failed to debit wallet');
      }
    } catch (error) {
      console.error('Error debiting wallet:', error);
      throw new Error('Error processing wallet debit');
    }
  }

  async fetchProgress(
    userId: string,
    courseId: string,
  ): Promise<IMongoCourseProgress> {
    try {
      const result = await CourseProgressModel.findOne({ userId, courseId });
      if (!result) {
        throw new Error('Mongo error: Fetching progress');
      }
      return result;
    } catch (error) {
      console.error('Error Fetching progress', error);
      throw new Error('Mongo error: Fetching progress');
    }
  }
}

export default MongoUserProfileRepository;
