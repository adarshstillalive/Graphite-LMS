import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { IPopulatedCourseCommon } from '@/interfaces/Course';
import { fetchHighRatedCoursesForHomePage } from '@/services/user/courseService';
import { useEffect, useState } from 'react';
import { CourseCardHome } from './CourseCardHome';

const HighRatedCourse = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [courses, setCourses] = useState<IPopulatedCourseCommon[]>([]);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const response = await fetchHighRatedCoursesForHomePage(currentPage);
        const result = response.data;

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

  const handleLoad = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="py-8 sm:py-16 px-4 sm:px-8">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          High rated courses
        </h2>
        <div className="relative">
          <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="flex min-w-max">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="w-[280px] sm:w-[320px] flex-none"
                >
                  <CourseCardHome course={course} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {totalPages > currentPage && (
          <div className="mt-6 sm:mt-10 text-center">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => handleLoad(currentPage + 1)}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HighRatedCourse;
