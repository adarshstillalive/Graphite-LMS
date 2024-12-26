import { useLocation } from 'react-router-dom';
import { IProduct } from '@/interfaces/Order';

const OrderDetail = () => {
  const location = useLocation();
  const { order } = location.state;

  if (!order) {
    return <p>No details available for this order.</p>;
  }

  const {
    orderId,
    userId,
    courses,
    totalAmount,
    paymentMethod,
    createdAt,
    updatedAt,
  } = order;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">Return Request Details</h1>
      <div className="space-y-2">
        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
        <p>
          <strong>User:</strong> {userId.firstName + ' ' + userId.lastName} (
          {userId.email})
        </p>
        <p>
          <strong>Price:</strong> ₹{totalAmount.toFixed(2)}
        </p>
        <p>
          <strong>Payment method:</strong> {paymentMethod}
        </p>
        <p>
          <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Last Updated:</strong> {new Date(updatedAt).toLocaleString()}
        </p>
      </div>
      <div className="bg-white border rounded-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Courses</h2>
        <div className="space-y-4">
          {courses.map((product: IProduct, index: number) => (
            <div
              key={index}
              className="flex items-start space-x-4 border rounded-sm p-4 hover:shadow transition cursor-pointer"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
