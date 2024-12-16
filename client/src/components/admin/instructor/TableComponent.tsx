import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { IInstructorPopulated } from '@/interfaces/Instructor';
import { handleBlock } from '@/services/admin/instructorService';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TableComponentProps {
  instructorData: IInstructorPopulated[];
}

const TableComponent: React.FC<TableComponentProps> = ({ instructorData }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const blockHandler = async (instructorId: string) => {
    try {
      const response = await handleBlock(instructorId);
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
  return (
    <Table>
      <TableCaption>Instructors</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Full name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Courses</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {instructorData.map((instructor) => (
          <TableRow key={instructor._id}>
            <TableCell className="font-medium">
              {`${instructor.userId.firstName}` +
                ' ' +
                `${instructor.userId.lastName}`}
            </TableCell>
            <TableCell>{instructor.userId.email}</TableCell>
            <TableCell>{String(instructor.courses?.length)}</TableCell>
            <TableCell>{String(instructor.rating)}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() =>
                      instructor._id && blockHandler(instructor._id)
                    }
                    className="text-red-500 hover:text-red-500"
                  >
                    {instructor.isBlocked ? 'Unblock' : 'Block'}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      navigate('/admin/instructors/profile', {
                        state: { instructor },
                      })
                    }
                  >
                    View Instructor
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export default TableComponent;
