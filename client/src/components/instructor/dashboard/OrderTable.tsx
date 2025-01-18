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
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IDashboardOrder } from '@/interfaces/DashboardOrder';
import { MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IOrderTableProps {
  orders: IDashboardOrder[];
}

const OrderTable: React.FC<IOrderTableProps> = ({ orders }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <Table>
          <TableCaption className="text-lg mb-4">Orders</TableCaption>
          <TableHeader>
            <TableRow className="hidden md:table-row">
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="hidden lg:table-cell">Purchased</TableHead>
              <TableHead className="hidden lg:table-cell">
                Credit Date
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Courses</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id} className="relative">
                <TableCell className="font-medium">
                  <div className="md:hidden font-bold text-sm text-muted-foreground mb-1">
                    Order ID
                  </div>
                  {order.orderId}
                </TableCell>
                <TableCell>
                  <div className="md:hidden font-bold text-sm text-muted-foreground mb-1">
                    User
                  </div>
                  {order.userId.firstName + ' ' + order.userId.lastName}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {order.createdAt &&
                    new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {order.createdAt &&
                    new Date(
                      new Date(order.createdAt).getTime() +
                        7 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="md:hidden font-bold text-sm text-muted-foreground mb-1">
                    Status
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.isInstructorPaymentCompleted
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.isInstructorPaymentCompleted ? 'Success' : 'Pending'}
                  </span>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {order.courses.length}
                </TableCell>
                <TableCell>
                  <div className="md:hidden font-bold text-sm text-muted-foreground mb-1">
                    Amount
                  </div>
                  ₹{order.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="text-red-500 hover:text-red-500">
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
        </Table>
      </div>
    </div>
  );
};

export default OrderTable;
