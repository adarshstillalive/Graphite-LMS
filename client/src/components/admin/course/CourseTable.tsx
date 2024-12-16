import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import { IPopulatedCourse } from '@/interfaces/Course';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TableComponentProps {
  courseData: IPopulatedCourse[];
  onEdit: (course: IPopulatedCourse) => void;
}

const CourseTable: React.FC<TableComponentProps> = ({ courseData, onEdit }) => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableCaption>Courses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Instructor</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Subcategory</TableHead>
          <TableHead>Chapters</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courseData.map((course) => (
          <TableRow key={course._id}>
            <TableCell className="font-medium">
              {course.instructorId.firstName}
            </TableCell>
            <TableCell className="font-medium">{course.title}</TableCell>
            <TableCell>{course.category.name}</TableCell>
            <TableCell>
              {course.category.subCategory.reduce((acc, curr) => {
                if (curr._id === course.subcategory) {
                  return curr.name;
                }
                return acc;
              }, 'Not found')}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {course.chapters?.length} chapter(s)
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {course.chapters &&
                    course.chapters.map((chapter, index) => (
                      <DropdownMenuSub key={index}>
                        <DropdownMenuSubTrigger>
                          <span className="font-bold">Ch. {index + 1}</span>
                          {chapter.title}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          {chapter.episodes &&
                            chapter.episodes.map((episode, epiIndex) => (
                              <DropdownMenuItem key={epiIndex}>
                                <span className="font-bold">
                                  Ep. {epiIndex + 1}
                                </span>
                                {episode.title}
                              </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell>{course.price}</TableCell>
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
                  <DropdownMenuItem
                    onClick={() =>
                      navigate('/admin/courses/courseDetail', {
                        state: { courseId: course._id },
                      })
                    }
                  >
                    View course
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(course)}>
                    Edit course
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

export default CourseTable;
