import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { fetchInstructor } from '../../services/instructor/commonService';
import { setCurrentInstructor } from '@/redux/slices/instructor/instructorSlice';

const Home = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  // const {currentInstructor} = useSelector((state:RootState)=>state.instructor)
  const dispatch = useDispatch();
  useEffect(() => {
    if (!currentUser?._id) {
      return;
    }

    const fetchInstructorApi = async () => {
      try {
        const instructorData = await fetchInstructor(currentUser._id);
        dispatch(setCurrentInstructor(instructorData?.data));
      } catch (error) {
        console.error('Error fetching instructor data:', error);
      }
    };

    fetchInstructorApi();
  }, [dispatch, currentUser?._id]);

  return (
    <div className="">
      <h1 className="text-3xl h-screen text-red-500">HOME</h1>
    </div>
  );
};

export default Home;
