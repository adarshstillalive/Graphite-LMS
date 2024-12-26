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
import { IPopulatedOrder } from '@/interfaces/Order';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TableComponentProps {
  orders: IPopulatedOrder[];
  onEdit: (request: IPopulatedOrder) => void;
}

const OrderTable: React.FC<TableComponentProps> = ({ orders, onEdit }) => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableCaption>Orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order id</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Purchased date</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Course count</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order._id}>
            <TableCell className="font-medium">{order.orderId}</TableCell>
            <TableCell className="font-medium">
              {order.userId.firstName + ' ' + order.userId.lastName}
            </TableCell>
            <TableCell>
              {order.createdAt &&
                new Date(order.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>{order.paymentMethod}</TableCell>
            <TableCell>{order.courses.length}</TableCell>
            <TableCell>{order.totalAmount.toFixed(2)}</TableCell>
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
                      navigate('/admin/orders/orderDetail', {
                        state: { order },
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

export default OrderTable;
