import CourseTable from '@/components/admin/course/CourseTable';
import DataPagination from '@/components/common/DataPagination';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { IPopulatedCourse } from '@/interfaces/Course';
import { fetchCoursesApi } from '@/services/admin/courseService';
import { useEffect, useState } from 'react';

interface CourseListProps {
  enableEditTab: (course: IPopulatedCourse) => void;
}

const CourseList: React.FC<CourseListProps> = ({ enableEditTab }) => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [courses, setCourses] = useState<IPopulatedCourse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCoursesApi(currentPage);
        const result = response.data;
        setCourses(result.data);
        setTotalPages(Math.ceil(result.total / 10));
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Error in fetching category data',
        });
      }
    };
    fetchData();
  }, [currentPage, toast]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <CourseTable courseData={courses} onEdit={enableEditTab} />
      </CardContent>
      <CardFooter>
        <DataPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </CardFooter>
    </Card>
  );
};

export default CourseList;
