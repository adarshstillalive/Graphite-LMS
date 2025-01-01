import React from 'react';
import { IPopulatedCourseCommon } from '@/interfaces/Course';
import { MdStar, MdStarOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa6';
import {
  addToWishlist,
  removeFromCart,
  removeFromWishlist,
} from '@/services/user/profileService';
import { useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
  course: IPopulatedCourseCommon;
}

const CourseCardWide: React.FC<CourseCardProps> = ({ course }) => {
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

  const handleCart = async (courseId: string) => {
    try {
      await removeFromCart(courseId);
      toast({
        variant: 'default',
        description: 'Removed from cart',
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Removing from cart failed, Try again',
      });
    }
  };
  return (
    <div
      className="flex overflow-hidden hover:shadow-md py-4 border-t-2 relative cursor-pointer"
      onClick={() => navigate(`/courses/courseDetail/${course._id}`)}
    >
      <img
        src={course.thumbnail}
        alt={course.title}
        className=" object-cover relative"
      />
      <button
        className="absolute top-6 left-2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition"
        onClick={(e) => {
          e.stopPropagation();
          handleWishlistToggle(course._id);
        }}
        aria-label="Add to Favorites"
      >
        <FaHeart
          className={`text-2xl ${currentUser?.wishlist?.some((item: IPopulatedCourseCommon) => item._id === course._id) ? 'fill-red-500' : 'fill-white'}`}
        />
      </button>
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
          <div className="flex flex-col justify-between pl-8 items-end">
            <p className="font-semibold py-4 text-lg">
              ₹{course.price.toFixed(2)}
            </p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleCart(course._id);
              }}
            >
              Remove
            </Button>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <span className="font-semibold mr-1">
            {course.rating && course.rating.toFixed(1)}
          </span>
          <div className="flex items-center mr-4">
            {[1, 2, 3, 4, 5].map((star) =>
              star <= Math.round(course.rating || 0) ? (
                <MdStar key={star} className="h-5 w-5 fill-yellow-400" />
              ) : (
                <MdStarOutline key={star} className="h-5 w-5 text-gray-400" />
              )
            )}
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
