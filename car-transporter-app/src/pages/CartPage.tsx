// src/pages/CartPage.tsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ka-GE", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Empty cart state
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Empty cart icon */}
              <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L21 18M7 13v6a2 2 0 002 2h7a2 2 0 002-2v-6"
                  />
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                თქვენი კალათა ცარიელია
              </h1>
              <p className="text-gray-600 mb-6">
                დაიწყეთ შოპინგი და დაამატეთ მანქანები კალათაში
              </p>

              <Link
                to="/shop"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                მანქანების მაღაზიაში დაბრუნება
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">შოპინგ კალათა</h1>
            <p className="text-gray-600 mt-1">
              {state.totalItems} ელემენტი კალათაში
            </p>
          </div>
          
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
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
                  შეკვეთის გაფორმება
                </button>
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ka-GE", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

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