import OrderTable from '@/components/admin/order/OrderTable';
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
import { IPopulatedOrder } from '@/interfaces/Order';
import { fetchOrders } from '@/services/admin/orderService';
import { useEffect, useState } from 'react';

const Order = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [sortHelper, setSortHelper] = useState({
    field: 'createdAt',
    value: -1,
  });
  const [orders, setOrders] = useState<IPopulatedOrder[]>([]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        const sort = { [sortHelper.field]: sortHelper.value };
        const response = await fetchOrders(currentPage, sort, search);
        const result = response.data;
        setOrders(result.data);
        setTotalPages(Math.ceil(result.total / 2));
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Fetching courses failed, Refresh the page',
        });
      }
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [currentPage, search, sortHelper.field, sortHelper.value, toast]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const enableEditTab = () => {};
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>
          <SearchAndSort
            field="title"
            search={search}
            setSearch={setSearch}
            setSortHelper={setSortHelper}
            placeholder=""
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <OrderTable orders={orders} onEdit={enableEditTab} />
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

export default Order;
