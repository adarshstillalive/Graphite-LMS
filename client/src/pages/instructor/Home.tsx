import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchInstructor } from '../../services/instructor/commonService';
import { setCurrentInstructor } from '@/redux/slices/instructor/instructorSlice';

const Home = () => {
  // const {currentInstructor} = useSelector((state:RootState)=>state.instructor)
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchInstructorApi = async () => {
      try {
        const instructorData = await fetchInstructor();
        dispatch(setCurrentInstructor(instructorData?.data));
      } catch (error) {
        console.error('Error fetching instructor data:', error);
      }
    };

    fetchInstructorApi();
  }, [dispatch]);

  return (
    <div className="">
      <h1 className="text-3xl h-screen text-red-500">HOME</h1>
    </div>
  );
};

export default Home;
