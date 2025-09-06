// src/pages/CartPage.tsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { type Car } from "../data/car_data";
import CurrencySelector from "../components/CurrencySelector";
import EmptyState from "../components/EmptyState";

export default function CartPage() {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  // Empty cart state
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <EmptyState
          icon="🛒"
          title="თქვენი კალათა ცარიელია"
          description="დაიწყეთ შოპინგი და დაამატეთ სასურველი მანქანები კალათაში შესყიდვისთვის."
          actionText="მანქანების მაღაზია"
          actionLink="/shop"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">შოპინგ კალათა</h1>
            <p className="text-gray-600 mt-1">
              {state.totalItems} ელემენტი კალათაში
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <CurrencySelector />
            <Link
              to="/shop"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              მაღაზიაში დაბრუნება
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <CartItem
                key={item.car.id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                შეკვეთის მიმოხილვა
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">ნივთები ({state.totalItems})</span>
                  <span className="font-medium">{formatPrice(state.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ტრანსპორტი</span>
                  <span className="font-medium">უფასო</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">სულ</span>
                    <span className="text-xl font-bold text-blue-600">
                      {formatPrice(state.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/checkout"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors text-center"
                >
                  შეკვეთის გაფორმება
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg transition-colors"
                >
                  კალათის გასუფთავება
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cart Item Component  
interface CartItemProps {
  item: {
    car: Car;
    quantity: number;
    addedAt: string;
  };
  onRemove: (carId: string) => void;
  onUpdateQuantity: (carId: string, quantity: number) => void;
}

function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const { car, quantity } = item;
  const { formatPrice } = useCurrency();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      onRemove(car.id);
    } else {
      onUpdateQuantity(car.id, newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Car Image */}
        <Link to={`/product/${car.id}`} className="flex-shrink-0">
          <img
            src={car.images[0]}
            alt={`${car.make} ${car.model}`}
            className="w-full md:w-32 h-32 object-cover rounded-lg hover:opacity-75 transition-opacity"
          />
        </Link>

        {/* Car Info */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="mb-2 md:mb-0">
              <Link
                to={`/product/${car.id}`}
                className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {car.year} {car.make} {car.model}
              </Link>
              <p className="text-sm text-gray-600">
                {car.engine} • {car.transmission} • {car.color}
              </p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-500 mr-1">⭐</span>
                <span className="text-sm text-gray-600">
                  {car.rating} ({car.reviews})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-xl font-bold text-blue-600">
                {formatPrice(car.price)}
              </div>
              {car.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  {formatPrice(car.originalPrice)}
                </div>
              )}
            </div>
          </div>

          {/* Quantity and Remove */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">რაოდენობა:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1 bg-gray-50 font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors"
                  disabled={quantity >= 5}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => onRemove(car.id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
            >
              წაშლა
            </button>
          </div>

          {/* Subtotal */}
          <div className="mt-2 text-right">
            <span className="text-sm text-gray-600">
              ქვეჯამი: {formatPrice(car.price * quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}