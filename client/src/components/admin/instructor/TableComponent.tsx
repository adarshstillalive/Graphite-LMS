import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

interface TableComponentProps {
  instructorData: IInstructorPopulated[];
}

const TableComponent: React.FC<TableComponentProps> = ({ instructorData }) => {
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
        {instructorData.map((instructorData) => (
          <TableRow key={instructorData._id}>
            <TableCell className="font-medium">
              {`${instructorData.userId.firstName}` +
                ' ' +
                `${instructorData.userId.lastName}`}
            </TableCell>
            <TableCell>{instructorData.userId.email}</TableCell>
            <TableCell>{String(instructorData.courses?.length)}</TableCell>
            <TableCell>{String(instructorData.rating)}</TableCell>
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
                    // onClick={() => navigator.clipboard.writeText(payment.id)}
                    className="text-red-500 hover:text-red-500"
                  >
                    Block
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View Instructor</DropdownMenuItem>
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
