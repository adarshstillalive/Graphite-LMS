// import { ChartBar } from '@/components/admin/dashboard/ChartBar';
import { ChartLine } from '@/components/admin/dashboard/ChartLine';
import CountListing from '@/components/admin/dashboard/CountListing';
import TopInstructors from '@/components/admin/dashboard/TopInstructors';
import TopSellingCourses from '@/components/admin/dashboard/TopSellingCourses';

const Home = () => {
  return (
    <div className="space-y-8">
      <CountListing />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <ChartLine />
        {/* <ChartBar /> */}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <TopSellingCourses />
        <TopInstructors />
      </div>
    </div>
  );
};

export default Home;
