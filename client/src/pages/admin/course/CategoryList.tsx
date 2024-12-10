import CategoryTable from '@/components/admin/course/CategoryTable';
import DataPagination from '@/components/common/DataPagination';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { fetchCategories, ICategory } from '@/services/admin/courseService';

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa6';

interface CategoryListProps {
  enableEditTab: (category: ICategory) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ enableEditTab }) => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [sortHelper, setSortHelper] = useState({
    field: 'createdAt',
    value: -1,
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sort = { [sortHelper.field]: sortHelper.value };
        const response = await fetchCategories(currentPage, sort, search);
        const result = response.data;
        setCategories(result.data);
        setTotalPages(Math.ceil(result.total / 10));
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Error in fetching category data',
        });
      }
    };
    fetchData();
  }, [currentPage, search, sortHelper.field, sortHelper.value, toast]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>
          <div className="mb-6 flex flex-col sm:flex-row pt-4 gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:border-black"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
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
                  onClick={() => setSortHelper({ field: 'name', value: 1 })}
                >
                  aA-zZ
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortHelper({ field: 'name', value: -1 })}
                >
                  zZ-aA
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setSortHelper({ field: 'createdAt', value: 1 })
                  }
                >
                  Created (New)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setSortHelper({ field: 'createdAt', value: -1 })
                  }
                >
                  Created (Old)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <CategoryTable categoryData={categories} onEdit={enableEditTab} />
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

export default CategoryList;
