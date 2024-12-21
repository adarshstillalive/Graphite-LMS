import TableComponent from '@/components/admin/instructor/TableComponent';
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
import { IInstructorPopulated } from '@/interfaces/Instructor';
import {
  getInstructors,
  handleBlock,
} from '@/services/admin/instructorService';
import { useEffect, useState } from 'react';

const InstructorList = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [sortHelper, setSortHelper] = useState({
    field: 'createdAt',
    value: -1,
  });
  const [instructors, setInstructors] = useState<IInstructorPopulated[]>([]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        const sort = { [sortHelper.field]: sortHelper.value };
        const response = await getInstructors(currentPage, sort, search);

        const result = response.data;

        setInstructors(result.data);
        setTotalPages(Math.ceil(result.total / 10));
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Error in fetching instructor data',
        });
      }
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [currentPage, search, sortHelper.field, sortHelper.value, toast]);

  const blockHandler = async (instructorId: string) => {
    try {
      const response = await handleBlock(instructorId);
      console.log(response.data);
      const updatedInstructors = instructors.map(
        (instructor: IInstructorPopulated) => {
          if (instructor._id === response.data._id) {
            return response.data;
          }
          return instructor;
        }
      );

      setInstructors(updatedInstructors);
      if (response.success) {
        toast({
          variant: 'default',
          description: 'Action success',
        });
      }
    } catch (error) {
      console.log(error);

      toast({
        variant: 'destructive',
        description: 'Action failed',
      });
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Instructors</CardTitle>
        <CardDescription>
          <SearchAndSort
            field="firstName"
            search={search}
            setSearch={setSearch}
            setSortHelper={setSortHelper}
            placeholder="Enter instructor name"
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <TableComponent
          instructorData={instructors}
          blockHandler={blockHandler}
        />
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

export default InstructorList;
