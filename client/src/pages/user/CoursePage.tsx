import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CourseDetail from './CourseDetail';
import CourseDetailPurchased from './CourseDetailPurchased';

const CoursePage = () => {
  const { id, isCreated } = useParams<{ id: string; isCreated: string }>();
  const isCreatedBoolean = isCreated === 'true';
  const { currentUser } = useSelector((state: RootState) => state.user);
  const isPurchased =
    currentUser?.purchasedCourses?.some((c) => c._id === id) || false;

  return (
    id && (
      <>
        {isPurchased || isCreatedBoolean ? (
          <CourseDetailPurchased id={id} />
        ) : (
          <CourseDetail id={id} />
        )}
      </>
    )
  );
};

export default CoursePage;
