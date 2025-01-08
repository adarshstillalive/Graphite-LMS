import userAxiosInstance from '@/axios/userAxiosInstance';
import { ApiResponse } from '@/interfaces/Response';

type SortType = {
  [key: string]: number;
};

interface Review {
  userId: string;
  courseId: string;
  rating: number;
  review: string;
}

interface InstructorReview {
  userId: string;
  instructorId: string;
  rating: number;
  review: string;
}

export const fetchCoursesForHomePage = async (
  currentPage: number = 0
): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams();
  if (currentPage > 0) {
    queryParams.append('page', currentPage.toString());
  }

  const queryString = queryParams.toString();
  const response = await userAxiosInstance.get(`/api/courses?${queryString}`);
  return response.data;
};

export const fetchHighRatedCoursesForHomePage = async (
  currentPage: number = 0
): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams();
  if (currentPage > 0) {
    queryParams.append('page', currentPage.toString());
  }

  queryParams.append('filter', currentPage.toString());

  const queryString = queryParams.toString();
  const response = await userAxiosInstance.get(
    `/api/courses/rating?${queryString}`
  );
  return response.data;
};

export const fetchCoursesForProductsPage = async (
  queryString1: string | undefined,
  sort: SortType,
  filter: string,
  currentPage: number
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

  const queryString2 = queryParams.toString();

  const response = await userAxiosInstance.get(
    `/api/courses/productpage${queryString1 ? `?${queryString1 + '&' + queryString2}` : `?${queryString2}`}`
  );
  return response.data;
};

export const fetchCategoriesFromApi = async (): Promise<ApiResponse> => {
  const response = await userAxiosInstance.get('/api/categories');
  return response.data;
};

export const fetchCommonCourse = async (
  courseId: string,
  userId: string | undefined = undefined
): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams();
  if (userId) {
    queryParams.append('userId', userId.toString());
  }
  const queryString = queryParams.toString();
  const response = await userAxiosInstance.get(
    `/api/course/${courseId}?${queryString}`
  );
  return response.data;
};

export const fetchInstructor = async (
  instructorId: string
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.get(
    `/api/course/instructorProfile/${instructorId}`
  );
  return response.data;
};

export const fetchReviewsWithUser = async (
  userId: string,
  courseId: string,
  currentPage: number
): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams();
  if (currentPage > 0) {
    queryParams.append('page', currentPage.toString());
  }

  const queryString = queryParams.toString();
  const response = await userAxiosInstance.get(
    `/api/course/${courseId}/reviews/${userId}?${queryString}`
  );
  return response.data;
};

export const fetchReviews = async (
  courseId: string,
  currentPage: number
): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams();
  if (currentPage > 0) {
    queryParams.append('page', currentPage.toString());
  }

  const queryString = queryParams.toString();
  const response = await userAxiosInstance.get(
    `/api/course/${courseId}/reviews?${queryString}`
  );
  return response.data;
};

export const addReview = async (review: Review): Promise<ApiResponse> => {
  const response = await userAxiosInstance.put(`/api/course/reviews`, {
    review,
  });
  return response.data;
};

export const fetchInstructorReviewsWithUser = async (
  userId: string,
  instructorId: string,
  currentPage: number
): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams();
  if (currentPage > 0) {
    queryParams.append('page', currentPage.toString());
  }

  const queryString = queryParams.toString();
  const response = await userAxiosInstance.get(
    `/api/instructor/${instructorId}/reviews/${userId}?${queryString}`
  );
  return response.data;
};

export const fetchInstructorReviews = async (
  instructorId: string,
  currentPage: number
): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams();
  if (currentPage > 0) {
    queryParams.append('page', currentPage.toString());
  }

  const queryString = queryParams.toString();
  const response = await userAxiosInstance.get(
    `/api/instructor/${instructorId}/reviews?${queryString}`
  );
  return response.data;
};

export const addInstructorReview = async (
  review: InstructorReview
): Promise<ApiResponse> => {
  const response = await userAxiosInstance.put(`/api/instructor/reviews`, {
    review,
  });
  return response.data;
};
