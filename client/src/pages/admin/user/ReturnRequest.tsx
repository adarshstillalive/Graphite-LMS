import ReturnRequestTable from '@/components/admin/users/ReturnRequestTable';
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
import { IPopulatedReturnRequests } from '@/interfaces/ReturnRequests';
import { fetchReturnRequests } from '@/services/admin/orderService';
import { useEffect, useState } from 'react';

const ReturnRequest = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [sortHelper, setSortHelper] = useState({
    field: 'createdAt',
    value: -1,
  });
  const [requests, setRequests] = useState<IPopulatedReturnRequests[]>([]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        const sort = { [sortHelper.field]: sortHelper.value };
        const response = await fetchReturnRequests(currentPage, sort, search);
        const result = response.data;
        setRequests(result.data);
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
        <CardTitle>Return requests</CardTitle>
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
        <ReturnRequestTable requests={requests} onEdit={enableEditTab} />
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

export default ReturnRequest;
