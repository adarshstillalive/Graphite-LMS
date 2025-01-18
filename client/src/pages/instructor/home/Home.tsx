import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCurrentInstructor } from '@/redux/slices/instructor/instructorSlice';
import { fetchInstructor } from '@/services/instructor/commonService';
import InstructorPieChart from '@/components/instructor/dashboard/InstructorPieChart';
import { useToast } from '@/hooks/use-toast';
import { fetchInstructorOrders } from '@/services/instructor/orderService';
import OrderTable from '@/components/instructor/dashboard/OrderTable';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchInstructorOrders();
        const fetchedOrders = response.data || [];
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
    <div className="container mx-auto py-6 space-y-6">
      <div className="grid grid-cols-1 gap-6 justify-center">
        <Card className=" justify-center flex lg:col-span-2">
          <CardContent className="p-6">
            <InstructorPieChart orders={orders} />
          </CardContent>
        </Card>
        <Card className="rounded-none lg:col-span-2">
          <CardContent className="p-6">
            <OrderTable orders={orders} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
