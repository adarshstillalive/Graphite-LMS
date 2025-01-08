import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CourseDetail from './CourseDetail';
import CourseDetailPurchased from './CourseDetailPurchased';

const CoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { currentInstructor } = useSelector(
    (state: RootState) => state.instructor
  );
  const isPurchased =
    currentUser?.purchasedCourses?.some((c) => c._id === id) || false;
  const isCreated =
    currentInstructor?.courses?.some((c) => c.courseId === id) || false;

  return (
    id && (
      <>
        {isPurchased || isCreated ? (
          <CourseDetailPurchased id={id} />
        ) : (
          <CourseDetail id={id} />
        )}
      </>
    )
  );
};

export default CoursePage;
