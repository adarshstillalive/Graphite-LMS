import { ICourse } from './Course';

export interface DashboardTopCourses {
  courseId: string;
  totalSales: number;
  totalRevenue: number;
  courseDetails: ICourse;
}
