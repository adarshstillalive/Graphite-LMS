import SearchAndSort from '@/components/common/SearchAndSort';
import { Button } from '@/components/ui/button';
import CourseCardWide from '@/components/user/course/CourseCardWide';
import Sidebar from '@/components/user/course/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { IPopulatedCourse } from '@/interfaces/Course';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortHelper, setSortHelper] = useState({
    field: 'createdAt',
    value: -1,
  });

  const [courses, setCourses] = useState<IPopulatedCourse[]>([]);

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
    }, 500);
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              All Courses
            </h1>
            <div className="w-full sm:w-auto">
              <SearchAndSort
                field="title"
                search={search}
                setSearch={setSearch}
                setSortHelper={setSortHelper}
                placeholder="Enter course name"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:hidden py-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside
            className={`
              ${isSidebarOpen ? 'fixed inset-0 z-40 mt-16 bg-white' : 'hidden'} 
              lg:relative lg:block lg:w-80 
              overflow-y-auto
              transition-all duration-300
              lg:min-h-screen
            `}
          >
            {isSidebarOpen && (
              <Button
                variant="ghost"
                className="absolute lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              >
                ✕
              </Button>
            )}
            <Sidebar
              categories={categories}
              setQueryString={setQueryString}
              categoryId={categoryId}
            />
          </aside>

          <main className="flex-1">
            {courses.length > 0 ? (
              <div className="space-y-4">
                {courses.map((course) => (
                  <CourseCardWide key={course._id} course={course} />
                ))}
                <div className="flex justify-center py-4">
                  <Button
                    variant="outline"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Load more
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center min-h-[400px]">
                <h1 className="text-2xl font-bold text-gray-500">
                  No Courses Found
                </h1>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Courses;
