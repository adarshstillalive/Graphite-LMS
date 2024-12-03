import { Button } from '@/components/ui/button';
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
import { ICategory } from '@/services/admin/courseService';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';

interface TableComponentProps {
  categoryData: ICategory[];
  onEdit: (category: ICategory) => void;
}

const CategoryTable: React.FC<TableComponentProps> = ({
  categoryData,
  onEdit,
}) => {
  return (
    <Table>
      <TableCaption>Categories</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>SubCategory</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categoryData.map((categoryData) => (
          <TableRow key={categoryData._id}>
            <TableCell className="font-medium">{categoryData.name}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categoryData.subCategory.map((sub, index) => (
                    <DropdownMenuItem key={index} className="cursor-default">
                      {sub.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell>
              {categoryData.isBlocked ? 'Blocked' : 'Active'}
            </TableCell>
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
                    Block
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onEdit(categoryData)}>
                    Edit category
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

export default CategoryTable;
