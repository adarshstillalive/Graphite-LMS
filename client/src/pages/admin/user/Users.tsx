import TableComponent from '@/components/admin/users/TableComponent';
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
import { IUser } from '@/interfaces/User';
import { getUsers, handleBlock } from '@/services/admin/userService';
import { useEffect, useState } from 'react';

const Users = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [sortHelper, setSortHelper] = useState({
    field: 'createdAt',
    value: -1,
  });
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        const sort = { [sortHelper.field]: sortHelper.value };
        const response = await getUsers(currentPage, sort, search);
        const result = response.data;
        setUsers(result.data);
        setTotalPages(Math.ceil(result.total / 10));
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Error in fetching user data',
        });
      }
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [currentPage, search, sortHelper.field, sortHelper.value, toast]);

  const blockHandler = async (userId: string) => {
    try {
      const response = await handleBlock(userId);
      console.log(response.data);
      const updatedUsers = users.map((user: IUser) => {
        if (user._id === response.data._id) {
          return response.data;
        }
        return user;
      });

      setUsers(updatedUsers);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          <SearchAndSort
            field="firstName"
            search={search}
            setSearch={setSearch}
            setSortHelper={setSortHelper}
            placeholder="Enter user name"
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <TableComponent userData={users} blockHandler={blockHandler} />
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

export default Users;
