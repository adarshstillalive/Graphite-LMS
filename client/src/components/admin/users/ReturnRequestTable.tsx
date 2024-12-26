import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import { IPopulatedReturnRequests } from '@/interfaces/ReturnRequests';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TableComponentProps {
  requests: IPopulatedReturnRequests[];
  onEdit: (request: IPopulatedReturnRequests) => void;
}

const ReturnRequestTable: React.FC<TableComponentProps> = ({
  requests,
  onEdit,
}) => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableCaption>Requests</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>OrderDate</TableHead>
          <TableHead>payment</TableHead>
          <TableHead>Request date</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.orderId._id}>
            <TableCell className="font-medium">
              {request.userId.firstName}
            </TableCell>
            <TableCell className="font-medium">
              {request.itemId.title}
            </TableCell>
            <TableCell>
              {request.orderId.createdAt &&
                new Date(request.orderId.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>{request.orderId.paymentMethod}</TableCell>
            <TableCell>
              {new Date(request.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>{request.price}</TableCell>
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
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      navigate('/admin/return/requestDetail', {
                        state: { request },
                      })
                    }
                  >
                    View details
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

export default ReturnRequestTable;
