import { CourseCard } from '@/components/instructor/courses/course/CourseCard';
import { Button } from '@/components/ui/button';
import { IPopulatedCourse } from '@/interfaces/Course';
import { fetchCoursesApi } from '@/services/instructor/courseService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState<IPopulatedCourse[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetchCoursesApi();
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  // const handleBackToCourses = () => {
  //   setShowDetails(false);
  //   setSelectedCourse(null);
  // };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-gray-600">Manage and view your courses</p>
        </div>
        <Button className="rounded-none">
          <Link to="/instructor/createCourse">Create Course</Link>
        </Button>
      </div>

      <div className="space-y-6 w-full">
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto p-4">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
