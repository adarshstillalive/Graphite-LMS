import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IPopulatedCourse } from '@/interfaces/Course';
import { useNavigate } from 'react-router-dom';
import { Star, Layers } from 'lucide-react';

interface CourseCardProps {
  course: IPopulatedCourse;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="rounded-none cursor-pointer w-full max-w-[320px] overflow-hidden border-0  
                   
                 bg-white dark:bg-gray-900"
      onClick={() =>
        navigate('/admin/courses/courseDetail', {
          state: { courseId: course._id },
        })
      }
    >
      <div className="relative aspect-video  w-full overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 
                     group-hover:scale-110"
        />
        {!course.isPublished && (
          <div className="absolute top-2 right-2 bg-gray-800/80 text-white px-2 py-1 rounded-full text-xs">
            Draft
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 pr-2">
            {course.title}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 fill-yellow-600 text-yellow-600" />
            <span className="font-bold text-gray-800 dark:text-gray-200">
              {course.rating && course.rating > 0
                ? course.rating.toFixed(1)
                : 'New'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-semibold text-primary">
            ₹{course.price.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <Badge
            variant={course.isPublished ? 'default' : 'secondary'}
            className="px-3 py-1 text-sm font-normal"
          >
            {course.isPublished ? 'Published' : 'Not Published'}
          </Badge>
          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <Layers className="h-4 w-4" />
            <span className="text-xs">
              {course.chapters?.length || 0} Chapter(s)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
