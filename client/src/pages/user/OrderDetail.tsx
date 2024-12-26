import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { IOrder } from '@/interfaces/Order';
import { RootState } from '@/redux/store';
import {
  fetchOrderDetailsApi,
  returnCourseApi,
} from '@/services/user/orderService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetail: React.FC = () => {
  const { toast } = useToast();
  const { orderId } = useParams();
  const [order, setOrder] = useState<IOrder>();
  const [returnReason, setReturnReason] = useState('');
  const navigate = useNavigate();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const formatDate = (date: Date | undefined) =>
    date ? new Date(date).toLocaleString() : 'N/A';

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!orderId) {
          toast({
            variant: 'destructive',
            description: 'Something went wrong, Refresh the page.',
          });
          return;
        }
        const response = await fetchOrderDetailsApi(orderId);
        setOrder(response.data);
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          description: 'Loading failed, Try again.',
        });
      }
    };
    fetchOrderDetails();
  }, []);

  const handleReturnSubmit = async (courseId: string, price: string) => {
    if (!returnReason.trim() || !orderId || !currentUser?._id) {
      toast({
        variant: 'destructive',
        description: 'Please provide a reason for returning.',
      });
      return;
    }
    const formData = {
      orderId: orderId,
      userId: currentUser?._id,
      itemId: courseId,
      price,
      reason: returnReason,
    };

    try {
      const response = await returnCourseApi(formData);
      toast({
        variant: 'default',
        description: 'Course returned successfully!',
      });
      setReturnReason('');
      setSelectedCourseId(null);
      setOrder(response.data);
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: 'Failed to process the return. Try again.',
      });
    }
  };

  return (
    order && (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-center">Order Details</h1>

        {/* Order Information */}
        <div className="bg-white border rounded-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Order Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <p>
              <strong>Order ID:</strong> {order.orderId}
            </p>
            <p>
              <strong>User ID:</strong> {order.userId}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}
            </p>
            <p>
              <strong>Coupon Applied:</strong> {order.coupon || 'NIL'}
            </p>
            <p>
              <strong>Order Status:</strong> {order.orderStatus}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Created At:</strong> {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Courses */}
        <div className="bg-white border rounded-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Courses</h2>
          <div className="space-y-4">
            {order.courses.map((product, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 border rounded-sm p-4 hover:shadow transition cursor-pointer"
                onClick={() =>
                  navigate(`/courses/courseDetail/${product.courseId._id}`)
                }
              >
                <img
                  src={product.courseId.thumbnail}
                  alt={product.courseId.title}
                  className="w-auto h-24 object-cover rounded-md"
                />
                <div>
                  <p className="text-lg font-medium">
                    <strong>Course Name:</strong> {product.courseId.title}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{product.price.toFixed(2)}
                  </p>
                  <p>
                    <strong>Returned:</strong> {product.returned}
                  </p>
                </div>
                <div className="ml-auto">
                  {!product.returned && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Return</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Return Course</DialogTitle>
                          <DialogDescription>
                            Please provide a reason for returning this course.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <textarea
                            className="w-full border rounded-md p-2"
                            rows={4}
                            placeholder="Enter the reason for return..."
                            value={returnReason}
                            onChange={(e) => setReturnReason(e.target.value)}
                          />
                          <div className="flex justify-end space-x-4">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="default"
                                onClick={() => {
                                  setSelectedCourseId(product.courseId._id);
                                  handleReturnSubmit(
                                    product.courseId._id,
                                    product.price
                                  );
                                }}
                              >
                                Submit
                              </Button>
                            </DialogClose>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancellation Details */}
        {order.cancelledDate && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Cancellation Details
            </h2>
            <p>
              <strong>Cancelled Date:</strong> {formatDate(order.cancelledDate)}
            </p>
            {order.cancellingReason && (
              <p>
                <strong>Cancelling Reason:</strong> {order.cancellingReason}
              </p>
            )}
          </div>
        )}
      </div>
    )
  );
};

export default OrderDetail;
