// src/pages/CheckoutPage.tsx - შესწორებული localStorage-თან მუშაობით
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InlinePrice from "../components/InlinePrice";

interface CartItem {
  car: {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    images: string[];
  };
  quantity: number;
  addedAt: string;
}

interface ShippingForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState<ShippingForm>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Load cart items from localStorage
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const savedCart = localStorage.getItem('cart_items');
        if (savedCart) {
          const items = JSON.parse(savedCart);
          if (Array.isArray(items)) {
            setCartItems(items);
          }
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);

  // Calculate totals
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.car.price * item.quantity), 0);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">იტვირთება...</p>
        </div>
      </div>
    );
  }

  // Redirect to shop if cart is empty and order not placed
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L21 18M7 13v6a2 2 0 002 2h7a2 2 0 002-2v-6" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            კალათა ცარიელია
          </h1>
          <p className="text-gray-600 mb-6">
            შეკვეთის გასაფორმებლად ჯერ მანქანები დაამატეთ კალათაში
          </p>
          <Link
            to="/shop"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            მანქანების მაღაზიაში გადასვლა
          </Link>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'სახელი სავალდებულოა';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'ელ-ფოსტა სავალდებულოა';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'ელ-ფოსტის ფორმატი არასწორია';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'ტელეფონის ნომერი სავალდებულოა';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'ტელეფონის ფორმატი არასწორია';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'მისამართი სავალდებულოა';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'ქალაქი სავალდებულოა';
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'საფოსტო კოდი სავალდებულოა';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order object
      const order = {
        id: Date.now().toString(),
        items: cartItems,
        shippingInfo: formData,
        totalAmount: getTotalPrice(),
        totalItems: getTotalItems(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString() // 15 days from now
      };

      // Save order to localStorage
      const existingOrders = localStorage.getItem('orders');
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Clear cart
      localStorage.removeItem('cart_items');
      window.dispatchEvent(new Event('cartUpdated'));
      
      setOrderPlaced(true);
      
    } catch (error) {
      console.error('Order submission error:', error);
      alert('შეკვეთის გაფორმებისას მოხდა შეცდომა. სცადეთ ხელახლა.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Success icon */}
            <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              შეკვეთა წარმატებით გაფორმდა!
            </h1>
            <p className="text-gray-600 mb-6">
              თქვენი შეკვეთა მიღებულია და დამუშავების პროცესშია. მალე დაგიკავშირდებით ელ-ფოსტის მეშვეობით.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-900 mb-2">შეკვეთის დეტალები</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p>მანქანები: {getTotalItems()} ცალი</p>
                <p>სულ ღირებულება: <InlinePrice price={getTotalPrice()} size="sm" showCurrencyToggle={false} /></p>
                <p>მოსალოდნელი მიწოდება: 15-25 დღე</p>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/shop"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-center transition-colors"
              >
                ახალი შეკვეთა
              </Link>
              <Link
                to="/"
                className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg text-center transition-colors"
              >
                მთავარ გვერდზე
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isFormValid = Object.values(formData).every(value => value.trim() !== '') && Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            კალათაში დაბრუნება
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">შეკვეთის გაფორმება</h1>
          <p className="text-gray-600 mt-2">შეავსეთ მიწოდების ინფორმაცია და დაადასტურეთ შეკვეთა</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">მიწოდების ინფორმაცია</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    სრული სახელი *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="თქვენი სრული სახელი"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ელ-ფოსტა *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="example@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ტელეფონი *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+995 5XX XXX XXX"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    მისამართი *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ქუჩა, სახლის ნომერი"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ქალაქი *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="თბილისი"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      საფოსტო კოდი *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="0100"
                    />
                    {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">მნიშვნელოვანი ინფორმაცია</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• მიწოდების ვადა: 15-25 სამუშაო დღე</li>
                    <li>• გადახდა შესაძლებელია ნაღდი ან ბანკის გადარიცხვით</li>
                    <li>• ყველა ავტომობილი მოდის სრული დოკუმენტაციით</li>
                    <li>• უფასო კონსულტაცია ყველა ეტაპზე</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full font-bold py-4 px-6 rounded-lg text-lg transition-all ${
                    !isFormValid || isSubmitting
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      შეკვეთა იფორმება...
                    </div>
                  ) : (
                    `შეკვეთის გაფორმება - ${getTotalPrice().toLocaleString()}$`
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                შეკვეთის მიმოხილვა
              </h2>

              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.car.id} className="flex items-center space-x-3 pb-3 border-b">
                    <img
                      src={item.car.images[0]}
                      alt={`${item.car.make} ${item.car.model}`}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {item.car.year} {item.car.make} {item.car.model}
                      </h4>
                      <p className="text-xs text-gray-500">რაოდენობა: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <InlinePrice price={item.car.price * item.quantity} size="sm" showCurrencyToggle={false} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">ნივთები ({getTotalItems()})</span>
                  <InlinePrice price={getTotalPrice()} size="sm" showCurrencyToggle={false} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ტრანსპორტი</span>
                  <span className="font-medium text-green-600">უფასო</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">დაზღვევა</span>
                  <span className="font-medium text-green-600">ჩართული</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">სულ</span>
                    <div className="text-right">
                      <InlinePrice price={getTotalPrice()} size="lg" showCurrencyToggle={false} />
                      <div className="text-sm text-gray-500">
                        ≈ {Math.round(getTotalPrice() * 2.7).toLocaleString()} ₾
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security badges */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    უსაფრთხო
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    დაზღვეული
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}