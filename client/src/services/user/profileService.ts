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
