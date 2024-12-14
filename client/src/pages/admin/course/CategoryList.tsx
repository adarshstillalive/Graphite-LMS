import CategoryTable from '@/components/admin/course/CategoryTable';
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
import { fetchCategories, ICategory } from '@/services/admin/courseService';

import { useEffect, useState } from 'react';

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
    const handler = setTimeout(async () => {
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
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [currentPage, search, sortHelper.field, sortHelper.value, toast]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>
          <SearchAndSort
            field="name"
            search={search}
            setSearch={setSearch}
            setSortHelper={setSortHelper}
          />
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
