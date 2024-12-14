import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPopulatedCourse } from '@/interfaces/Course';
import { useNavigate } from 'react-router-dom';

interface CourseRequestCardProps {
  course: IPopulatedCourse;
}

export const RequestCard: React.FC<CourseRequestCardProps> = ({ course }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="rounded-sm cursor-pointer w-full max-w-[320px] overflow-hidden shadow-md transition-transform duration-300  hover:shadow-xl"
      onClick={() =>
        navigate('/admin/courses/courseDetail', { state: { course } })
      }
    >
      <div className="relative aspect-video w-full">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">
          {course.title}
        </h3>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <p className=" text-sm text-gray-600">
            {course.instructorId.firstName} {course.instructorId.lastName}
          </p>
          <Badge
            variant={
              course.isApproved
                ? 'default'
                : course.isRejected
                  ? 'destructive'
                  : 'secondary'
            }
          >
            {course.isApproved
              ? 'Approved'
              : course.isRejected
                ? 'Rejected'
                : 'pending'}
          </Badge>
        </div>

        <div className=" text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-medium">Category:</span>{' '}
            {course.category.name}
          </p>
          <p>
            <span className="font-medium">Subcategory:</span>{' '}
            {course.category.subCategory.reduce((acc, curr) => {
              return curr._id === course.subcategory ? curr.name : acc;
            }, 'Not found')}
          </p>
          <p>
            <span className="font-medium">Price:</span> ₹{course.price}
          </p>
          {course.createdAt && (
            <p>
              <span className="font-medium">Created:</span>{' '}
              {new Date(course.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
