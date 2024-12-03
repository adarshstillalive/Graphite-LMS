import adminAxiosInstance from '@/axios/adminAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';
import { CategoryFormValues } from '@/pages/admin/course/AddCategory';

export interface ISubCategory {
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
