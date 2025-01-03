import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardTopCourses } from '@/interfaces/DashboardTopCourses';
import { fetchTopCourses } from '@/services/admin/courseService';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const TopSellingCourses = () => {
  const [courses, setCourses] = useState<DashboardTopCourses[]>();

  useEffect(() => {
    const topCourses = async () => {
      try {
        const response = await fetchTopCourses();

        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    topCourses();
  }, []);
  return (
    courses && (
      <Card className="rounded-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Best Selling Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.courseId}
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-10 h-10">
                    <img
                      src={course.courseDetails.thumbnail}
                      alt={course.courseDetails.title}
                      className="rounded-md object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {course.courseDetails.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ₹{course.courseDetails.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">
                      {course.courseDetails.rating?.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm">{course.totalSales} sold</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default TopSellingCourses;
