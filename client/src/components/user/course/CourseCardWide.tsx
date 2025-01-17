import React from 'react';
import { IPopulatedCourse, IPopulatedCourseCommon } from '@/interfaces/Course';
import { MdStar, MdStarOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa6';
import {
  addToWishlist,
  removeFromWishlist,
} from '@/services/user/profileService';
import { useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/redux/store';

interface CourseCardProps {
  course: IPopulatedCourse;
}

const CourseCardWide: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const isPurchased = currentUser?.purchasedCourses?.some(
    (c) => c._id === course._id
  );
  const isCreated =
    currentUser?._id === (course.instructorId?._id || course.instructorId);

  const shouldShowWishlistButton = !isPurchased && !isCreated;
  const shouldShowPrice = !isPurchased && !isCreated;

  const handleWishlistToggle = async (courseId: string) => {
    try {
      if (!currentUser) {
        navigate('/auth/login');
      }
      const isExist =
        currentUser?.wishlist &&
        currentUser?.wishlist.some(
          (item: IPopulatedCourseCommon) => item._id === courseId
        );
      if (isExist) {
        await removeFromWishlist(courseId);
      } else {
        await addToWishlist(courseId);
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Adding to wishlist failed, Try again.',
      });
    }
  };

  return (
    <div
      className="bg-white rounded-none shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
      onClick={() =>
        navigate(`/courses/courseDetail/${course._id}/${isCreated}`)
      }
    >
      {/* Mobile Layout */}
      <div className="block sm:hidden w-full max-w-[380px] mx-auto overflow-hidden bg-white dark:bg-gray-900">
        <div className="w-full relative aspect-video overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
          {shouldShowWishlistButton && (
            <button
              className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition"
              onClick={(e) => {
                e.stopPropagation();
                handleWishlistToggle(course._id ? course._id : '');
              }}
              aria-label="Add to Favorites"
            >
              <FaHeart
                className={`text-2xl ${
                  currentUser?.wishlist?.some((item) => item._id === course._id)
                    ? 'fill-red-500'
                    : 'fill-white'
                }`}
              />
            </button>
          )}
        </div>

        <div className="py-2 px-4">
          <h3 className="text-md font-medium text-gray-900 dark:text-white line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {course.instructorId.firstName} {course.instructorId.lastName}
          </p>
          <p className="text-sm text-gray-500">{course.category.name}</p>
          <div className="flex justify-between items-center my-2">
            <div className="flex items-center space-x-1">
              <MdStar className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {course.rating?.toFixed(1) || 'New'}
              </span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <span>{course.chapters?.length || 0} Chapter(s)</span>
            </div>
          </div>
          {shouldShowPrice && (
            <span className="text-lg font-semibold text-primary">
              ₹{course.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Large Screen Layout */}
      <div className="hidden sm:flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-64 h-48 sm:h-40 flex-shrink-0">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover rounded-none"
          />
          {shouldShowWishlistButton && (
            <button
              className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition"
              onClick={(e) => {
                e.stopPropagation();
                handleWishlistToggle(course._id ? course._id : '');
              }}
              aria-label="Add to Favorites"
            >
              <FaHeart
                className={`text-xl ${
                  currentUser?.wishlist?.some(
                    (item: IPopulatedCourseCommon) => item._id === course._id
                  )
                    ? 'text-red-500'
                    : 'text-white'
                }`}
              />
            </button>
          )}
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                {course.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3">
                {course.description.slice(0, 150)}
                {course.description.slice(0, 150) && '...'}
              </p>
              <p className="text-sm text-gray-500">
                By {course.instructorId.firstName}{' '}
                {course.instructorId.lastName}
              </p>
            </div>
            {shouldShowPrice && (
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  ₹{course.price.toFixed(2)}&nbsp;&nbsp;
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
            <div className="flex items-center">
              <span className="font-medium text-gray-900 mr-1">
                {course.rating?.toFixed(1)}
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) =>
                  star <= Math.round(course.rating || 0) ? (
                    <MdStar key={star} className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <MdStarOutline
                      key={star}
                      className="w-4 h-4 text-gray-300"
                    />
                  )
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{course.chapters?.length} Chapter(s)</span>
              <span>•</span>
              <span>{course.level}</span>
              <span>•</span>
              <span>{course.language}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardWide;
