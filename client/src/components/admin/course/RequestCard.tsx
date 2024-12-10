import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IPopulatedCourse } from '@/interfaces/Course';

interface CourseRequestCardProps {
  course: IPopulatedCourse;
  onViewDetails: (courseId: string) => void;
}

export const RequestCard: React.FC<CourseRequestCardProps> = ({
  course,
  onViewDetails,
}) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <Badge variant={course.isApproved ? 'default' : 'secondary'}>
            {course.isApproved ? 'Approved' : 'Pending'}
          </Badge>
          <Badge variant={course.isPublished ? 'default' : 'secondary'}>
            {course.isPublished ? 'Published' : 'Unpublished'}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Instructor email: {course.instructorId.email}
        </p>
        <p className="text-sm text-muted-foreground">
          Category: {course.category.name}
        </p>
        <p className="text-sm text-muted-foreground">
          Subcategory:{' '}
          {course.category.subCategory.reduce((acc, curr) => {
            if (curr._id === course.subcategory) {
              return curr.name;
            }
            return acc;
          }, 'Not found')}
        </p>
        <p className="text-sm text-muted-foreground">Level: {course.level}</p>
        <p className="text-sm font-medium mt-2">Price: ₹{course.price}</p>
        {course.createdAt && (
          <p className="text-xs text-muted-foreground mt-2">
            Created: {new Date(course.createdAt).toLocaleDateString()}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => course._id && onViewDetails(course._id)}
          variant="outline"
          className="w-full"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
