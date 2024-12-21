import CourseTable from '@/components/admin/course/CourseTable';
import DataPagination from '@/components/common/DataPagination';
import SearchAndSort from '@/components/common/SearchAndSort';
import {
  Card,
  CardContent,
  CardDescription,
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
  const [search, setSearch] = useState('');
  const [sortHelper, setSortHelper] = useState({
    field: 'createdAt',
    value: -1,
  });
  const [courses, setCourses] = useState<IPopulatedCourse[]>([]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        const sort = { [sortHelper.field]: sortHelper.value };
        const response = await fetchCoursesApi(currentPage, sort, search);
        const result = response.data;
        setCourses(result.data);
        setTotalPages(Math.ceil(result.total / 2));
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Fetching courses failed, Refresh the page',
        });
      }
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [currentPage, search, sortHelper.field, sortHelper.value, toast]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses</CardTitle>
        <CardDescription>
          <SearchAndSort
            field="title"
            search={search}
            setSearch={setSearch}
            setSortHelper={setSortHelper}
            placeholder="Enter course title"
          />
        </CardDescription>
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
