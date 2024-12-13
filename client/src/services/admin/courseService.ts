import adminAxiosInstance from '@/axios/adminAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';
import { CategoryFormValues } from '@/pages/admin/course/AddCategory';

type SortType = {
  [key: string]: number;
};

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
  currentPage: number = 0,
  sort: SortType,
  filter: string
): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams();
  if (currentPage > 0) {
    queryParams.append('page', currentPage.toString());
  }

  if (sort) {
    for (const key in sort) {
      queryParams.append(`sort[${key}]`, sort[key].toString());
    }
  }

  if (filter) {
    const query = { name: { $regex: filter, $options: 'i' } };
    queryParams.append('filter', JSON.stringify(query));
  }

  const queryString = queryParams.toString();

  const response = await adminAxiosInstance.get(
    `/api/courses/category?${queryString}`
  );
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
  currentPage: number = 0,
  sort: SortType,
  filter: string
): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams();
  if (currentPage > 0) {
    queryParams.append('page', currentPage.toString());
  }

  if (sort) {
    for (const key in sort) {
      queryParams.append(`sort[${key}]`, sort[key].toString());
    }
  }

  if (filter) {
    const query = { title: { $regex: filter, $options: 'i' } };
    queryParams.append('filter', JSON.stringify(query));
  }

  const queryString = queryParams.toString();
  const response = await adminAxiosInstance.get(
    `/api/courses/requests?${queryString}`
  );
  return response.data;
};

export const fetchRejectedRequestApi = async (
  currentPage: number = 0,
  sort: SortType,
  filter: string
): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams();
  if (currentPage > 0) {
    queryParams.append('page', currentPage.toString());
  }

  if (sort) {
    for (const key in sort) {
      queryParams.append(`sort[${key}]`, sort[key].toString());
    }
  }

  if (filter) {
    const query = { title: { $regex: filter, $options: 'i' } };
    queryParams.append('filter', JSON.stringify(query));
  }

  const queryString = queryParams.toString();
  const response = await adminAxiosInstance.get(
    `/api/courses/rejectedRequests?${queryString}`
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
  currentPage: number = 0,
  sort: SortType,
  filter: string
): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams();
  if (currentPage > 0) {
    queryParams.append('page', currentPage.toString());
  }

  if (sort) {
    for (const key in sort) {
      queryParams.append(`sort[${key}]`, sort[key].toString());
    }
  }

  if (filter) {
    const query = { title: { $regex: filter, $options: 'i' } };
    queryParams.append('filter', JSON.stringify(query));
  }

  const queryString = queryParams.toString();
  const response = await adminAxiosInstance.get(`/api/courses?${queryString}`);
  return response.data;
};
