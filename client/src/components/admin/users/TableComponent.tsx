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
import { IUser } from '@/interfaces/User';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TableComponentProps {
  userData: IUser[];
  blockHandler: (userId: string) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  userData,
  blockHandler,
}) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableCaption>Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Full name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Instructor</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData.map((userData) => (
          <TableRow key={userData._id}>
            <TableCell className="font-medium">{`${userData.firstName} ${userData.lastName}`}</TableCell>
            <TableCell>{userData.email}</TableCell>
            <TableCell>{String(userData.isInstructor)}</TableCell>
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
                    className="text-red-500 hover:text-red-500"
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Dialog>
                      <DialogTrigger>
                        {userData.isBlocked ? 'Unblock' : 'Block'}
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                          <DialogDescription>
                            This will {userData.isBlocked ? 'Unblock' : 'Block'}{' '}
                            the user
                          </DialogDescription>
                          <div className="flex justify-end space-x-4 mt-4">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="default"
                                onClick={() =>
                                  userData._id && blockHandler(userData._id)
                                }
                              >
                                {userData.isBlocked ? 'Unblock' : 'Block'}
                              </Button>
                            </DialogClose>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      navigate('/admin/users/profile', {
                        state: { user: userData },
                      })
                    }
                  >
                    View user
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
