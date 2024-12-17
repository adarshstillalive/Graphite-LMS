import CourseCardWide from '@/components/user/course/CourseCardWide';
import Sidebar from '@/components/user/course/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { IPopulatedCourseCommon } from '@/interfaces/Course';
import { ICategory, ISubCategory } from '@/services/admin/courseService';
import {
  fetchCategoriesFromApi,
  fetchCoursesForHomePage,
} from '@/services/user/courseService';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Courses = () => {
  const { toast } = useToast();
  const [subcategory, setSubcategory] = useState<ISubCategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [courses, setCourses] = useState<IPopulatedCourseCommon[]>([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('Category');

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const response1 = await fetchCoursesForHomePage(currentPage);
        const response2 = await fetchCategoriesFromApi();

        const categoryData = response2.data.find(
          (cat: ICategory) => cat._id === category
        );
        if (categoryData) {
          setSubcategory(categoryData.subCategory);
        }

        const result = response1.data;

        setCourses(result.data);
        setTotalPages(Math.ceil(result.total / 10));
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Error in loading, Refresh the page',
        });
      }
    };
    fetchFeaturedCourses();
  }, [currentPage]);
  return (
    <div className="min-h-screen px-16">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <h1 className="text-3xl font-semibold text-gray-900">All Courses</h1>
        </div>
      </header>
      <div className="flex">
        <Sidebar subcategories={subcategory} />
        <main className="flex-1 p-6">
          <div className="grid ">
            {courses.map((course: IPopulatedCourseCommon) => (
              <CourseCardWide key={course._id} course={course} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Courses;
