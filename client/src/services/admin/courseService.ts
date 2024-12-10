import adminAxiosInstance from '@/axios/adminAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';
import { CategoryFormValues } from '@/pages/admin/course/AddCategory';

export interface ISubCategory {
  _id?: string;
  name: string;
}

export interface ICategory {
  _id?: string;
  name: string;
  subCategory: ISubCategory[];
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const createCategory = async (
  categoryData: CategoryFormValues
): Promise<ApiResponse> => {
  const response = await adminAxiosInstance.post('/api/courses/category', {
    categoryData,
  });
  return response.data;
};

export const fetchCategories = async (
  currentPage: number = 0
): Promise<ApiResponse> => {
  const page = currentPage > 0 ? `?page=${currentPage}` : '';
  const response = await adminAxiosInstance.get(`/api/courses/category${page}`);
  return response.data;
};

export const updateCategory = async (
  categoryData: CategoryFormValues,
  id: string
): Promise<ApiResponse> => {
  const response = await adminAxiosInstance.put(`/api/courses/category/${id}`, {
    categoryData,
  });
  return response.data;
};

export const fetchRequestApi = async (
  currentPage: number = 0
): Promise<ApiResponse> => {
  const page = currentPage > 0 ? `?page=${currentPage}` : '';
  const response = await adminAxiosInstance.get(`/api/courses/requests${page}`);
  return response.data;
};

export const fetchRejectedRequestApi = async (
  currentPage: number = 0
): Promise<ApiResponse> => {
  const page = currentPage > 0 ? `?page=${currentPage}` : '';
  const response = await adminAxiosInstance.get(
    `/api/courses/rejectedRequests${page}`
  );
  return response.data;
};

export const approveCourseRequest = async (
  courseId: string
): Promise<ApiResponse> => {
  const response = await adminAxiosInstance.patch(
    `/api/courses/requests/approve/${courseId}`
  );
  return response.data;
};

export const rejectCourseRequest = async (
  courseId: string,
  reason: string
): Promise<ApiResponse> => {
  const response = await adminAxiosInstance.patch(
    `/api/courses/requests/reject/${courseId}`,
    { reason }
  );
  return response.data;
};

export const fetchCoursesApi = async (
  currentPage: number = 0
): Promise<ApiResponse> => {
  const page = currentPage > 0 ? `?page=${currentPage}` : '';
  const response = await adminAxiosInstance.get(`/api/courses${page}`);
  return response.data;
};
