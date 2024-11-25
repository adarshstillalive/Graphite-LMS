import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Request from './Request';

const Home = () => {
  const { isInstructor } = useSelector((state: RootState) => state.user);

  return isInstructor ? (
    <div className="h-screen">
      <h1 className="text-3xl h-screen text-red-500 pt-16">HOME</h1>
    </div>
  ) : (
    <Request />
  );
};

export default Home;
