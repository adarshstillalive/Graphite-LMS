import userAxiosInstance from '@/axios/userAxiosInstance';
import { ProfileSchema } from '@/components/user/profile/ProfileDetails';
import { ApiResponse } from '@/interfaces/Response';

interface ChangePasswordProps {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export const changeProfilePicture = async (
  formData: FormData
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.post(
    '/api/profile/updateProfilePicture',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

export const updateProfileData = async (
  formData: ProfileSchema
): Promise<ApiResponse> => {
  const userFormData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
  };

  const response = await userAxiosInstance.patch('/api/profile', {
    userFormData,
  });
  return response.data;
};

export const changePasswordApi = async (
  credentials: ChangePasswordProps
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.put('/api/profile/changePassword', {
    credentials,
  });
  return response.data;
};

export const addToWishlist = async (courseId: string): Promise<ApiResponse> => {
  const response = await userAxiosInstance.post('/api/profile/wishlist', {
    courseId,
  });
  return response.data;
};

export const removeFromWishlist = async (
  courseId: string
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.delete(
    `/api/profile/wishlist/${courseId}`
  );
  return response.data;
};

export const addToCart = async (courseId: string): Promise<ApiResponse> => {
  const response = await userAxiosInstance.post('/api/profile/cart', {
    courseId,
  });
  return response.data;
};

export const removeFromCart = async (
  courseId: string
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.delete(
    `/api/profile/cart/${courseId}`
  );
  return response.data;
};

export const fetchPurchasedCourses = async (): Promise<ApiResponse> => {
  const response = await userAxiosInstance.get(`/api/profile/courses`);
  return response.data;
};

export const updateCourseProgress = async (
  courseId: string,
  chapterId: string,
  episodeId: string,
  progress: number
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.patch(
    `/api/profile/courses/progress/${courseId}/${chapterId}/${episodeId}/${progress}`
  );
  return response.data;
};

export const fetchWallet = async (): Promise<ApiResponse> => {
  const response = await userAxiosInstance.get('/api/profile/wallet');
  return response.data;
};
