import CartSummary from '@/components/user/cart/CartSummary';
import CourseCardWide from '@/components/user/cart/CourseCardWide';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  // Only calculate subtotal if the cart is not empty
  const subtotal =
    currentUser && currentUser.cart && currentUser.cart.length > 0
      ? currentUser.cart.reduce((sum, item) => sum + item.price, 0)
      : 0; // Default to 0 if the cart is empty

  const handleCheckout = async () => {
    navigate('/profile/cart/checkout');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cart</h1>
          <p className="text-gray-600">Manage and view your Cart</p>
        </div>
      </div>

      {currentUser && currentUser.cart ? (
        currentUser.cart.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {currentUser.cart.map((item) => (
                <CourseCardWide key={item._id} course={item} />
              ))}
            </div>
            {subtotal > 0 && (
              <div>
                <CartSummary
                  totalItems={currentUser.cart.length}
                  subtotal={subtotal}
                  onCheckout={handleCheckout}
                />
              </div>
            )}
          </div>
        ) : (
          <h1 className="text-3xl font-bold text-center">Cart is empty</h1>
        )
      ) : (
        <h1 className="text-3xl font-bold text-center">Loading cart...</h1>
      )}
    </div>
  );
};

export default Cart;
