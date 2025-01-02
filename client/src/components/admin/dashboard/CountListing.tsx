import { Card, CardContent } from '@/components/ui/card';
import { fetchListingCounts } from '@/services/admin/orderService';
import { BookOpen, UserCheck, Users, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Counts {
  courses: number;
  instructors: number;
  users: number;
  orders: number;
}

const CountListing = () => {
  const [listingCounts, setListingCounts] = useState<Counts>();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetchListingCounts();

        setListingCounts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCounts();
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <Card className="rounded-sm">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">Total Courses</p>
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-lg">{listingCounts?.courses || 0}</p>
        </CardContent>
      </Card>

      <Card className="rounded-sm">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">Total Instructors</p>
            <UserCheck className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-lg">{listingCounts?.instructors || 0}</p>
        </CardContent>
      </Card>

      <Card className="rounded-sm">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-lg">{listingCounts?.users || 0}</p>
        </CardContent>
      </Card>

      <Card className="rounded-sm">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <ShoppingCart className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-lg">{listingCounts?.orders || 0}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountListing;
