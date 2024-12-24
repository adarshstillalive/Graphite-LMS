import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { inputStyle } from '@/interfaces/zodCourseFormSchema';
import { capturePayment, paypalOrder } from '@/services/user/orderService';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const subtotal =
    (currentUser &&
      currentUser.cart &&
      currentUser?.cart.reduce((acc, curr) => {
        return (acc += curr.price);
      }, 0)) ||
    0;

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const createOrder = async () => {
    try {
      const response = await paypalOrder();
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const onApprove = async (data: { orderID: string }) => {
    if (!data.orderID) {
      throw new Error('Invalid approval');
    }

    try {
      await capturePayment(data.orderID);
      navigate('/profile/cart');
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any) => {
    console.log(error);
  };
  const handleCheckout = async () => {
    if (!paymentMethod) {
      toast({
        variant: 'destructive',
        description: 'Please select a payment method.',
      });
      return;
    }

    try {
      if (paymentMethod === 'paypal') {
        // const response = await paypalRedirect();
      }
    } catch (error) {
      console.log(error);
    }

    toast({
      description: `Processing payment with ${paymentMethod}...`,
    });
    // Implement actual payment processing logic here
  };

  return (
    currentUser &&
    currentUser.cart && (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Order Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {currentUser.cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center mb-2"
              >
                <span>{item.title}</span>
                <span>₹{item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Right: Payment Information */}
          <div className="bg-gray-100 p-6">
            <div className="w-1/2">
              <h2 className="text-xl font-semibold mb-4">
                Payment Information
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <Select onValueChange={handlePaymentMethodChange}>
                  <SelectTrigger className={`w-full ${inputStyle}`}>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className={inputStyle} value="paypal">
                      PayPal
                    </SelectItem>
                    <SelectItem className={inputStyle} value="wallet">
                      Wallet (Balance: ₹170)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {paymentMethod === 'paypal' ? (
                <PayPalButtons
                  style={{
                    layout: 'vertical',
                    color: 'white',
                    shape: 'rect',
                    label: 'paypal',
                  }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                  fundingSource="paypal"
                ></PayPalButtons>
              ) : (
                <Button onClick={handleCheckout} className="w-full">
                  Complete Purchase
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Checkout;
