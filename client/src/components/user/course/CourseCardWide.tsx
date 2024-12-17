import React from 'react';
import { IPopulatedCourseCommon } from '@/interfaces/Course';
import { MdStarOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: IPopulatedCourseCommon;
}

const CourseCardWide: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex overflow-hidden hover:shadow-md py-4 border-t-2 relative cursor-pointer"
      onClick={() => navigate(`/courses/courseDetail/${course._id}`)}
    >
      <img
        src={course.thumbnail}
        alt={course.title}
        className=" object-cover"
      />
      <div className="flex-1 px-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-base font-bold">{course.title}</h2>
            <p className="text-sm pb-2">
              {course.description.length > 250
                ? course.description.substring(0, 250) + '...'
                : course.description}
            </p>
            <p className="text-sm font-light">
              {course.instructorId.firstName +
                ' ' +
                course.instructorId.lastName}
            </p>
          </div>
          <div className="flex flex-col pl-8 items-end">
            <p className="font-semibold text-lg">₹{course.price.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <span className="font-semibold mr-1">
            {course.rating && course.rating.toFixed(1)}
          </span>
          <div className="flex items-center mr-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <MdStarOutline
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(course.rating || 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm font-light">
          {'Chapter(s): ' +
            course.chapters?.length +
            ' - ' +
            course.level +
            ' - ' +
            course.language}
        </p>
      </div>
    </div>
  );
};

export default CourseCardWide;
