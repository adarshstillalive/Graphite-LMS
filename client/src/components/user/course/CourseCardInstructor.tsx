import React from 'react';
import { IPopulatedCourseCommon } from '@/interfaces/Course';
import { useNavigate } from 'react-router-dom';
import { Star, Layers } from 'lucide-react';
import { FaHeart } from 'react-icons/fa6';
import {
  addToWishlist,
  removeFromWishlist,
} from '@/services/user/profileService';
import { useToast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface CourseCardProps {
  course: IPopulatedCourseCommon;
  instructorName: string;
}

export const CourseCardInstructor: React.FC<CourseCardProps> = ({
  course,
  instructorName,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleWishlistToggle = async (courseId: string) => {
    try {
      if (!currentUser) {
        navigate('/auth/login');
      }
      const isExist =
        currentUser?.wishlist &&
        currentUser?.wishlist.some((item) => item._id === courseId);
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
      className="rounded-none cursor-pointer w-full max-w-[250px] overflow-hidden hover:shadow-md transition-all
                   
                 bg-white dark:bg-gray-900"
      onClick={() => navigate(`/courses/courseDetail/${course._id}`)}
    >
      <div className="w-full relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <button
          className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition"
          onClick={(e) => {
            e.stopPropagation();
            handleWishlistToggle(course._id);
          }}
          aria-label="Add to Favorites"
        >
          <FaHeart
            className={`text-2xl ${currentUser?.wishlist?.some((item) => item._id === course._id) ? 'fill-red-500' : 'fill-white'}`}
          />
        </button>
      </div>

      <div className="py-2">
        <div className="flex justify-between items-start">
          <h3 className="text-md font-medium text-gray-900 dark:text-white line-clamp-2">
            {course.title}
          </h3>
        </div>

        <div className="flex justify-between items-start">
          <h3 className="text-sm font-normal text-gray-900 dark:text-white line-clamp-2">
            {instructorName}
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
