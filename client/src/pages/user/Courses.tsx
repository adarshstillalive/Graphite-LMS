import SearchAndSort from '@/components/common/SearchAndSort';
import { Button } from '@/components/ui/button';
import CourseCardWide from '@/components/user/course/CourseCardWide';
import Sidebar from '@/components/user/course/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { IPopulatedCourseCommon } from '@/interfaces/Course';
import { ICategory } from '@/services/admin/courseService';
import {
  fetchCategoriesFromApi,
  fetchCoursesForProductsPage,
} from '@/services/user/courseService';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Courses = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [queryString, setQueryString] = useState<string>();
  const [search, setSearch] = useState('');
  const [sortHelper, setSortHelper] = useState({
    field: 'createdAt',
    value: -1,
  });

  const [courses, setCourses] = useState<IPopulatedCourseCommon[]>([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('Category');

  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        const sort = { [sortHelper.field]: sortHelper.value };
        if (categoryId) {
          if (queryString) {
            const response1 = await fetchCoursesForProductsPage(
              queryString,
              sort,
              search,
              currentPage
            );
            const result = response1.data;

            setCourses(result.data);
            setTotalPages(Math.ceil(result.total / 2));
          }
        } else {
          const response1 = await fetchCoursesForProductsPage(
            queryString,
            sort,
            search,
            currentPage
          );
          const result = response1.data;

          setCourses(result.data);
          setTotalPages(Math.ceil(result.total / 2));
        }
        const response2 = await fetchCategoriesFromApi();

        const categoryData = response2.data;

        if (categoryData) {
          setCategories(categoryData);
        }
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Error in loading, Refresh the page',
        });
      }
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [
    currentPage,
    queryString,
    search,
    sortHelper.field,
    sortHelper.value,
    toast,
  ]);

  return (
    <div className="min-h-screen px-16">
      <header className="bg-white flex shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <h1 className="text-3xl font-semibold text-gray-900">All Courses</h1>
        </div>
        <SearchAndSort
          field="title"
          search={search}
          setSearch={setSearch}
          setSortHelper={setSortHelper}
          placeholder="Enter course name"
        />
      </header>

      <div className="flex">
        <Sidebar
          categories={categories}
          setQueryString={setQueryString}
          categoryId={categoryId}
        />
        <main className="flex-1 p-6">
          <div className="grid ">
            {courses.map((course: IPopulatedCourseCommon) => (
              <CourseCardWide key={course._id} course={course} />
            ))}
          </div>
          <div className="flex justify-center py-4">
            <Button
              variant={'outline'}
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Load more
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Courses;
