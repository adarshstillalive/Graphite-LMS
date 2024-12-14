import instructorAxiosInstance from '@/axios/instructorAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';
import { CourseFormValues } from '@/pages/instructor/courses/CreateCourse';
import { UploadState } from '@/redux/slices/instructor/courseCreationSlice';

export const fetchCategoriesFromApi = async (): Promise<ApiResponse> => {
  const response = await instructorAxiosInstance.get('/api/categories');
  return response.data;
};

export const cloudinarySignedVideoUploadUrl =
  async (): Promise<ApiResponse> => {
    const response = await instructorAxiosInstance.get(
      '/api/course/upload/videoSign'
    );
    return response.data;
  };

export const createCourseApi = async (
  formData: CourseFormValues
): Promise<ApiResponse> => {
  const response = await instructorAxiosInstance.post('/api/course', {
    formData: formData,
  });
  return response.data;
};

export const uploadVideoUrlApi = async (
  uploads: UploadState[],
  courseId: string
): Promise<ApiResponse> => {
  const response = await instructorAxiosInstance.post('/api/course/videoUrl', {
    uploads,
    courseId,
  });
  return response.data;
};

export const uploadCourseThumbnail = async (
  file: FormData
): Promise<ApiResponse> => {
  const response = await instructorAxiosInstance.post(
    '/api/course/thumbnail',
    file,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const removeCourseThumbnail = async (
  imageUrl: string
): Promise<ApiResponse> => {
  const regex = /instructor\/course\/thumbnail\/(.+)\./;
  const match = imageUrl.match(regex);
  if (!match) {
    throw new Error('Service Error: wrong image credentials');
  }
  const publicId = `instructor/course/thumbnail/${match[1]}`;
  const response = await instructorAxiosInstance.delete(
    `/api/course/thumbnail/?publicId=${publicId}`
  );
  return response.data;
};

export const fetchCoursesApi = async (): Promise<ApiResponse> => {
  const response = await instructorAxiosInstance.get('/api/courses');
  return response.data;
};
