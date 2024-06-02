import CartComponent from "@/components/Cart";

const Cart: React.FC = () => {
  return (
    <div className="px-8 py-14 bg-gray-100 flex flex-col items-center min-h-96">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
        <CartComponent />
      </div>
    </div>
  );
};

export default Cart;
