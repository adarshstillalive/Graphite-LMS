import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IPopulatedCourse } from '@/interfaces/Course';

interface CourseCardProps {
  course: IPopulatedCourse;
  onViewDetails: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
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
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="secondary">{course.category.name}</Badge>
          <Badge variant="secondary">
            {course.category.subCategory.reduce((acc, curr) => {
              if (curr._id === course.subcategory) {
                return curr.name;
              }
              return acc;
            }, 'Not found')}
          </Badge>
          <Badge variant="secondary">{course.level}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {course.description.substring(0, 100)}...
        </p>
        <p className="font-semibold">Price: ₹{course.price}</p>
        {course.rating && <p>Rating: {course.rating}/5</p>}
      </CardContent>
      <CardFooter>
        <Button onClick={() => onViewDetails(course._id || '')}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
