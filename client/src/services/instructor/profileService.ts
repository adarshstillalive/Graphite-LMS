import instructorAxiosInstance from '@/axios/instructorAxiosInstance';

export const changeProfilePicture = async (formData: FormData) => {
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
