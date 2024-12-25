import { Badge } from '@/components/ui/badge';
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { IOrder } from '@/interfaces/Order';
import { fetchOrdersApi } from '@/services/user/orderService';
import { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Order = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortHelper, setSortHelper] = useState({
    field: 'createdAt',
    value: -1,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      const sort = { [sortHelper.field]: sortHelper.value };
      try {
        const response = await fetchOrdersApi(sort, currentPage);
        const result = response.data;
        setOrders(result.data);
        setTotalPages(Math.ceil(result.total / 2));
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Loading failed, Try again.',
        });
      }
    };
    fetchOrders();
  }, [currentPage, sortHelper.field, sortHelper.value, toast]);

  const onSelectOrder = (orderId: string) => {
    nav;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Order List</h1>
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
              onClick={() => setSortHelper({ field: 'totalAmount', value: 1 })}
            >
              Amount (Low-High)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortHelper({ field: 'totalAmount', value: -1 })}
            >
              Amount (High-Low)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortHelper({ field: 'createdAt', value: 1 })}
            >
              Date (New-Old)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortHelper({ field: 'createdAt', value: -1 })}
            >
              Date (Old-New)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Order ID</TableHead>
              <TableHead className="text-center">Course Count</TableHead>
              <TableHead className="text-center">Total Amount</TableHead>
              <TableHead className="text-center">Purchase Date</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders &&
              orders.map((order: IOrder) => (
                <TableRow key={order._id}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell className="text-center">
                    {order.courses.length}
                  </TableCell>
                  <TableCell className="text-center">
                    ₹{order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.createdAt &&
                      new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        order.orderStatus === 'payment failed'
                          ? 'destructive'
                          : 'default'
                      }
                      className="capitalize"
                    >
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link to={`/profile/orders/orderDetail/${order._id}`}>
                      <Button size="sm" variant="default">
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center py-4">
        <Button
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default Order;
