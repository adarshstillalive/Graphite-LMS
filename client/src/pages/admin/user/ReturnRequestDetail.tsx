import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { hangleReturnRequest } from '@/services/admin/orderService';

const ReturnRequestDetail = () => {
  const { toast } = useToast();
  const location = useLocation();
  const { request } = location.state;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusUpdate = async (status: 'approve' | 'reject') => {
    try {
      if (!request._id) return;
      setIsLoading(true);

      await hangleReturnRequest(
        request._id,
        request.orderId._id,
        request.userId._id,
        status
      );

      toast({
        variant: 'default',
        description: `Request successfully ${status === 'approve' ? 'approved' : 'rejected'}.`,
      });
      navigate('/admin/return');
    } catch (error) {
      console.log(error);

      toast({
        variant: 'destructive',
        description: `Failed to ${status} the request. Try again.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!request) {
    return <p>No details available for this request.</p>;
  }

  const {
    orderId,
    userId,
    itemId,
    price,
    reason,
    isApproved,
    isRejected,
    createdAt,
    updatedAt,
  } = request;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">Return Request Details</h1>
      <div className="space-y-2">
        <p>
          <strong>Order ID:</strong> {orderId._id}
        </p>
        <p>
          <strong>User:</strong> {userId.firstName + ' ' + userId.lastName} (
          {userId.email})
        </p>
        <p>
          <strong>Course:</strong> {itemId.title}
        </p>
        <p>
          <strong>Price:</strong> ₹{price.toFixed(2)}
        </p>
        <p>
          <strong>Reason:</strong> {reason}
        </p>
        <p>
          <strong>Status:</strong>{' '}
          {isApproved ? 'Approved' : isRejected ? 'Rejected' : 'Pending'}
        </p>
        <p>
          <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Last Updated:</strong> {new Date(updatedAt).toLocaleString()}
        </p>
      </div>
      {!isApproved && !isRejected && (
        <div className="flex space-x-4 mt-6">
          <Button onClick={() => handleStatusUpdate('approve')}>Approve</Button>
          <Button
            variant={'outline'}
            onClick={() => handleStatusUpdate('reject')}
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReturnRequestDetail;
