import TableComponent from '@/components/admin/instructor/TableComponent';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { IInstructorPopulated } from '@/interfaces/Instructor';
import { getInstructors } from '@/services/admin/instructorService';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa6';

const InstructorList = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [instructors, setInstructors] = useState<IInstructorPopulated[]>([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await getInstructors();

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
    };
    fetchInstructors();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Instructors</CardTitle>
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
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  // onClick={() => navigator.clipboard.writeText(payment.id)}
                  className="text-red-500 hover:text-red-500"
                >
                  Block
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Instructor</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <TableComponent instructorData={instructors} />
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
