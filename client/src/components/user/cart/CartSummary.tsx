import React from 'react';
import { Button } from '@/components/ui/button';

interface CartSummaryProps {
  totalItems: number;
  subtotal: number;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalItems,
  subtotal,
  onCheckout,
}) => {
  return (
    <div className="bg-gray-100 p-6 rounded-sm">
      <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Total Items:</span>
        <span>{totalItems}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="font-semibold">Subtotal:</span>
        <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
      </div>
      <Button onClick={onCheckout} className="w-full">
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
