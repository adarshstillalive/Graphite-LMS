import React from 'react';
import { IPopulatedCourseCommon } from '@/interfaces/Course';
import { useNavigate } from 'react-router-dom';
import { Star, Layers } from 'lucide-react';

interface CourseCardProps {
  course: IPopulatedCourseCommon;
}

export const CourseCardHome: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-none cursor-pointer w-full max-w-[250px] overflow-hidden hover:shadow-md transition-all
                   
                 bg-white dark:bg-gray-900"
      onClick={() => navigate(`/courses/courseDetail/${course._id}`)}
    >
      <div className="relative aspect-video  w-full overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 
                     group-hover:scale-110"
        />
      </div>

      <div className="py-2">
        <div className="flex justify-between items-start">
          <h3 className="text-md font-medium text-gray-900 dark:text-white line-clamp-2">
            {course.title}
          </h3>
        </div>

        <div className="flex justify-between items-start">
          <h3 className="text-sm font-normal text-gray-900 dark:text-white line-clamp-2">
            {course.instructorId.firstName + ' ' + course.instructorId.lastName}
          </h3>
        </div>

        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
            {course.category.name}
          </h3>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-600 text-yellow-600" />
            <span className="font-sm text-sm text-gray-800 dark:text-gray-200">
              {course.rating && course.rating > 0
                ? course.rating.toFixed(1)
                : 'New'}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-primary">
            ₹{course.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <Layers className="h-4 w-4" />
            <span className="text-xs">
              {course.chapters?.length || 0} Chapter(s)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
