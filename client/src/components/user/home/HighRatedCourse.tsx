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
    <section className="pb-16 px-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">High rated courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {courses.map((course) => (
            <CourseCardHome key={course._id} course={course} />
          ))}
        </div>
        {totalPages > currentPage && (
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              size="lg"
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
