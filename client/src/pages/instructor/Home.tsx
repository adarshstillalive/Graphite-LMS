import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Request from './Request';
import { useEffect } from 'react';
import { fetchUser } from '../../services/instructor/commonService';
import { setIsInstructor } from '../../redux/slices/user/userSlice';

const Home = () => {
  const { isInstructor } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserApi = async () => {
      const {
        data: { isInstructor: isInstructorFromDb },
      } = await fetchUser();
      console.log(isInstructorFromDb);

      if (isInstructorFromDb && !isInstructor) {
        dispatch(setIsInstructor(true));
      }
    };
    fetchUserApi();
  }, [dispatch, isInstructor]);
  console.log(isInstructor);

  return isInstructor ? (
    <div className="">
      <h1 className="text-3xl h-screen text-red-500">HOME</h1>
    </div>
  ) : (
    <Request />
  );
};

export default Home;
