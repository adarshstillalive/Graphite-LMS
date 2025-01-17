import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
interface SearchAndSortProps {
  field: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSortHelper: React.Dispatch<
    React.SetStateAction<{ field: string; value: number }>
  >;
  placeholder: string;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({
  field,
  search,
  setSearch,
  setSortHelper,
  placeholder,
}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row pt-4 gap-4">
      {/* Search Input */}
      <div className="relative flex">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:border-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 p-0">
              <span className="sr-only">Open menu</span>
              <FaFilter />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => setSortHelper({ field, value: 1 })}
            >
              aA-zZ
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortHelper({ field, value: -1 })}
            >
              zZ-aA
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortHelper({ field: 'createdAt', value: 1 })}
            >
              Created (New)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortHelper({ field: 'createdAt', value: -1 })}
            >
              Created (Old)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Sort Dropdown */}
    </div>
  );
};

export default SearchAndSort;
