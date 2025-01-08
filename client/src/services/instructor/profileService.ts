import instructorAxiosInstance from '@/axios/instructorAxiosInstance';
import { ProfileSchema } from '@/components/instructor/profile/ProfileDetails';
import { ApiResponse } from '@/interfaces/Response';

export const changeProfilePicture = async (
  formData: FormData
): Promise<ApiResponse> => {
  const response = await instructorAxiosInstance.post(
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
    firstName: formData.userId.firstName,
    lastName: formData.userId.lastName,
  };
  const instructorFormData = {
    bio: formData.bio,
    expertise: formData.expertise,
    education: formData.qualifications,
    socialAccounts: formData.socialAccounts,
  };

  const response = await instructorAxiosInstance.patch('/api/profile', {
    userFormData,
    instructorFormData,
  });
  return response.data;
};

export const fetchInitialChatData = async (): Promise<ApiResponse> => {
  const response = await instructorAxiosInstance.get('/api/profile/chat');
  return response.data;
};
