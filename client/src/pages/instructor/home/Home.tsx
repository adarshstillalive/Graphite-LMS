import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCurrentInstructor } from '@/redux/slices/instructor/instructorSlice';
import { fetchInstructor } from '@/services/instructor/commonService';
import InstructorPieChart from '@/components/instructor/dashboard/InstructorPieChart';
import { useToast } from '@/hooks/use-toast';
import { fetchInstructorOrders } from '@/services/instructor/orderService';
import OrderTable from '@/components/instructor/dashboard/OrderTable';

const Home = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchInstructorOrders();

        const fetchedOrders = response.data || [];

        if (!fetchedOrders.length) {
          toast({
            variant: 'destructive',
            description: 'No orders found. Data is currently unavailable.',
          });
          return;
        }

        setOrders(fetchedOrders);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          description: 'Failed to load data. Please refresh the page.',
        });
      }
    };

    fetchOrders();
  }, [toast]);

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
    <div className="p-4">
      <div className="space-y-6">
        <div>
          <InstructorPieChart orders={orders} />
        </div>
        <OrderTable orders={orders} />
      </div>
    </div>
  );
};

export default Home;
