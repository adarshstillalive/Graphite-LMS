import CourseTable from '@/components/admin/course/CourseTable';
import DataPagination from '@/components/common/DataPagination';
import { Button } from '@/components/ui/button';
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa6';

interface CourseListProps {
  enableEditTab: (course: IPopulatedCourse) => void;
}

const CourseList: React.FC<CourseListProps> = ({ enableEditTab }) => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortHelper, setSortHelper] = useState({
    field: 'createdAt',
    value: -1,
  });
  const [courses, setCourses] = useState<IPopulatedCourse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sort = { [sortHelper.field]: sortHelper.value };
        const response = await fetchCoursesApi(currentPage, sort);
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
  }, [currentPage, sortHelper.field, sortHelper.value, toast]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses</CardTitle>
        <CardDescription>
          <div className="mb-6 flex flex-col sm:flex-row pt-4 gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:border-black"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <FaFilter />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => setSortHelper({ field: 'title', value: 1 })}
                >
                  aA-zZ
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortHelper({ field: 'title', value: -1 })}
                >
                  zZ-aA
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setSortHelper({ field: 'createdAt', value: 1 })
                  }
                >
                  Created (New)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setSortHelper({ field: 'createdAt', value: -1 })
                  }
                >
                  Created (Old)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
