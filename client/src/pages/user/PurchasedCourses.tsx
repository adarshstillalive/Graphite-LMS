import CourseCardWide from '@/components/user/course/CourseCardWide';
import { useToast } from '@/hooks/use-toast';
import { IPopulatedCourse } from '@/interfaces/Course';
import { fetchPurchasedCourses } from '@/services/user/profileService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PurchasedCourses = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<IPopulatedCourse[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetchPurchasedCourses();
        setCourses(response.data);
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Loading failed, Try again.',
        });
      }
    };
    fetchCourses();
  }, []);

  return (
    <main className="flex-1 p-6">
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          My Purchased Courses
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Explore the courses you've purchased and continue learning.
        </p>
      </header>

      {/* Purchased Courses List */}
      <div className="grid gap-6">
        {courses && courses.length > 0 ? (
          courses.map((course: IPopulatedCourse) => (
            <CourseCardWide key={course._id} course={course} />
          ))
        ) : (
          <div className="text-center mt-10">
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              No courses purchased yet!
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Browse our catalog to find courses that interest you.
            </p>
            <button
              onClick={() => navigate('/courses')}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
            >
              Explore Courses
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default PurchasedCourses;
