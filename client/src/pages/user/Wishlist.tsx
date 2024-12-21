import { CourseCardHome } from '@/components/user/home/CourseCardHome';
import { IPopulatedCourseCommon } from '@/interfaces/Course';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const Wishlist = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Wishlist</h1>
          <p className="text-gray-600">Manage and view your wishlist</p>
        </div>
      </div>

      <div className="space-y-6 w-full">
        {currentUser &&
        currentUser.wishlist &&
        currentUser.wishlist.length > 0 ? (
          <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto p-4">
            {currentUser.wishlist.map((course: IPopulatedCourseCommon) => (
              <CourseCardHome key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <h1 className="text-3xl font-bold text-center">Wishlist is empty</h1>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
