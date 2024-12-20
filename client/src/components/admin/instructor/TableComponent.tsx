import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { IInstructorPopulated } from '@/interfaces/Instructor';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TableComponentProps {
  instructorData: IInstructorPopulated[];
  blockHandler: (instructorId: string) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  instructorData,
  blockHandler,
}) => {
  const navigate = useNavigate();

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
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                    className="text-red-500 hover:text-red-500"
                  >
                    <Dialog>
                      <DialogTrigger>
                        {instructor.isBlocked ? 'Unblock' : 'Block'}
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                          <DialogDescription>
                            This will{' '}
                            {instructor.isBlocked ? 'Unblock' : 'Block'} the
                            instructor
                          </DialogDescription>
                          <div className="flex justify-end space-x-4 mt-4">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="default"
                                onClick={() =>
                                  instructor._id && blockHandler(instructor._id)
                                }
                              >
                                {instructor.isBlocked ? 'Unblock' : 'Block'}
                              </Button>
                            </DialogClose>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
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
