// src/pages/CartPage.tsx - localStorage-თან მუშაობა
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InlinePrice from "../components/InlinePrice";
import EmptyState from "../components/EmptyState";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  images: string[];
  engine: string;
  transmission: string;
  color: string;
  rating: number;
  reviews: number;
}

interface CartItem {
  car: Car;
  quantity: number;
  addedAt: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = () => {
      try {
        const savedCart = localStorage.getItem('cart_items');
        if (savedCart) {
          const items = JSON.parse(savedCart);
          console.log('Raw cart data:', items); // დებაგისთვის
          
          // შემოწმება რომ items არის array და არა ცარიელი
          if (Array.isArray(items) && items.length > 0) {
            // თითოეული ელემენტისთვის შემოწმება
            const validItems = items.filter(item => {
              // თუ ელემენტს აქვს car property (ახალი ფორმატი)
              if (item.car && item.car.id) {
                return true;
              }
              // თუ ელემენტს აქვს id property (ძველი ფორმატი)
              if (item.id) {
                // ვაკონვერტირებთ ახალ ფორმატში
                const convertedItem = {
                  car: item,
                  quantity: item.quantity || 1,
                  addedAt: item.addedAt || new Date().toISOString()
                };
                return true;
              }
              return false;
            }).map(item => {
              // კონვერტაცია ძველი ფორმატიდან ახალში
              if (item.id && !item.car) {
                return {
                  car: {
                    id: item.id,
                    make: item.make || 'Unknown',
                    model: item.model || 'Unknown',
                    year: item.year || 2020,
                    price: item.price || 0,
                    originalPrice: item.originalPrice,
                    images: item.images || ['https://via.placeholder.com/300x200'],
                    engine: item.engine || 'Unknown',
                    transmission: item.transmission || 'Unknown',
                    color: item.color || 'Unknown',
                    rating: item.rating || 4.5,
                    reviews: item.reviews || 0
                  },
                  quantity: item.quantity || 1,
                  addedAt: item.addedAt || new Date().toISOString()
                };
              }
              return item;
            });
            
            setCartItems(validItems);
          } else {
            setCartItems([]);
          }
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
        setCartItems([]);
        // ყავახე localStorage თუ დაზიანებულია
        localStorage.removeItem('cart_items');
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);

  const updateCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('cart_items', JSON.stringify(items));
  };

  const removeFromCart = (carId: string) => {
    const updatedItems = cartItems.filter(item => item.car.id !== carId);
    updateCart(updatedItems);
  };

  const updateQuantity = (carId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(carId);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.car.id === carId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart_items');
    
    // Cart update event dispatch
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.car.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">იტვირთება კალათა...</p>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (cartItems.length === 0) {
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
              {getTotalItems()} ელემენტი კალათაში
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
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
            {cartItems.map((item) => (
              <CartItemComponent
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
                  <span className="text-gray-600">ნივთები ({getTotalItems()})</span>
                  <span className="font-medium">
                    <InlinePrice price={getTotalPrice()} size="sm" showCurrencyToggle={false} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ტრანსპორტი</span>
                  <span className="font-medium">უფასო</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">სულ</span>
                    <span className="text-xl font-bold text-blue-600">
                      <InlinePrice price={getTotalPrice()} size="lg" showCurrencyToggle={true} />
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

              {/* Transport Info */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">ტრანსპორტირების ინფო</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• უფასო ტრანსპორტი ყველა შეკვეთისთვის</li>
                  <li>• მიტანის ვადა: 15-25 დღე</li>
                  <li>• დაზღვეული ტრანსპორტი</li>
                  <li>• ონლაინ ტრეკინგი</li>
                </ul>
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
  item: CartItem;
  onRemove: (carId: string) => void;
  onUpdateQuantity: (carId: string, quantity: number) => void;
}

function CartItemComponent({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const { car, quantity } = item;

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
                <InlinePrice price={car.price} size="md" showCurrencyToggle={false} />
              </div>
              {car.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  <InlinePrice price={car.originalPrice} size="sm" showCurrencyToggle={false} />
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
              ქვეჯამი: <InlinePrice price={car.price * quantity} size="sm" showCurrencyToggle={false} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}