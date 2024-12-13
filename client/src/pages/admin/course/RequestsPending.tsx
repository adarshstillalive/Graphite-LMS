import { RequestCard } from '@/components/admin/course/RequestCard';
import { RequestDetails } from '@/components/admin/course/RequestDetails';
import DataPagination from '@/components/common/DataPagination';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { IPopulatedCourse } from '@/interfaces/Course';
import {
  approveCourseRequest,
  fetchRequestApi,
  rejectCourseRequest,
} from '@/services/admin/courseService';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa6';

const RequestsPending = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [sortHelper, setSortHelper] = useState({
    field: 'createdAt',
    value: -1,
  });
  const [requests, setRequests] = useState<IPopulatedCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<
    (typeof requests)[0] | null
  >(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        const sort = { [sortHelper.field]: sortHelper.value };
        const response = await fetchRequestApi(currentPage, sort, search);
        const result = response.data;
        setRequests(result.data);
        setTotalPages(Math.ceil(result.total / 10));
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Error in fetching request data',
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

  const onViewDetails = (courseId: string) => {
    const course = requests.find((c) => c._id === courseId);
    if (course) {
      setSelectedCourse(course);
      setIsDetailOpen(true);
    }
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedCourse(null);
  };

  const handleApproveCourse = async (courseId: string) => {
    console.log(courseId);
    try {
      const response = await approveCourseRequest(courseId);
      if (response.success) {
        const filteredRequests = requests.filter(
          (course) => course._id !== courseId
        );
        setRequests(filteredRequests);
        toast({
          variant: 'default',
          description: 'Course status approved successfully',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Approving course status failed, try again',
      });
    } finally {
      setIsDetailOpen(false);
    }
  };

  const handleRejectCourse = async (courseId: string, reason: string) => {
    console.log(reason);
    try {
      const response = await rejectCourseRequest(courseId, reason);
      if (response.success) {
        const filteredRequests = requests.filter(
          (course) => course._id !== courseId
        );
        setRequests(filteredRequests);
        toast({
          variant: 'default',
          description: 'Course rejected successfully',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Rejecting course status failed, try again',
      });
    } finally {
      setIsDetailOpen(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Requests</CardTitle>
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
                  onClick={() => setSortHelper({ field: 'title', value: 1 })}
                >
                  aA-zZ
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortHelper({ field: 'title', value: -1 })}
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
        {requests &&
          requests.map((request) => (
            <RequestCard
              key={request._id}
              course={request}
              onViewDetails={onViewDetails}
            />
          ))}
        {selectedCourse && (
          <RequestDetails
            course={selectedCourse}
            isOpen={isDetailOpen}
            onClose={handleCloseDetail}
            onApprove={handleApproveCourse}
            onReject={handleRejectCourse}
          />
        )}
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

export default RequestsPending;
