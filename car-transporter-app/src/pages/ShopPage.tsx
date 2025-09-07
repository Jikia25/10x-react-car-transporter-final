// src/pages/ShopPage.tsx - განახლებული ავტორიზაციისთვის
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { carsData, type Car } from "../data/car_data";
import { getStateByCode } from "../data/states_transport";
import InlinePrice from "../components/InlinePrice";
import EmptyState from "../components/EmptyState";
import AdvancedSearchModal from "../components/AdvancedSearchModal";

export default function ShopPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ყველა" | "ბაზარზე" | "გზაში">("ყველა");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState<'cart' | 'favorite'>('cart');
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();

  // ავტორიზაციის შემოწმება
  const token = localStorage.getItem("fake_token");
  const isAuthenticated = !!token;

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setCars(carsData);
      setLoading(false);
    };

    loadCars();
    
    // ფავორიტების ჩატვირთვა localStorage-დან
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleAddToCart = (car: Car) => {
    if (!isAuthenticated) {
      setAuthAction('cart');
      setShowAuthModal(true);
      return;
    }

    // კალათაში დამატება - სწორი ფორმატით
    const existingCart = localStorage.getItem('cart_items');
    const cartItems = existingCart ? JSON.parse(existingCart) : [];
    
    const existingItem = cartItems.find((item: any) => item.car?.id === car.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ 
        car: car, // მთელი car object
        quantity: 1, 
        addedAt: new Date().toISOString() 
      });
    }
    
    localStorage.setItem('cart_items', JSON.stringify(cartItems));
    
    // Cart update event dispatch
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Success notification
    alert(`${car.make} ${car.model} კალათაში დაემატა!`);
  };

  const handleToggleFavorite = (carId: string) => {
    if (!isAuthenticated) {
      setAuthAction('favorite');
      setShowAuthModal(true);
      return;
    }

    const newFavorites = favorites.includes(carId)
      ? favorites.filter(id => id !== carId)
      : [...favorites, carId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleAuthRedirect = () => {
    setShowAuthModal(false);
    navigate('/login');
  };

  const filteredCars = cars.filter((car) => {
    if (filter === "ყველა") return true;
    return car.status === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">იტვირთება მანქანები...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">მანქანების მაღაზია</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            ამერიკიდან იმპორტირებული ხარისხიანი მანქანები - რუსთავის ბაზარზე და
            გზაში მყოფი ავტომობილები
          </p>
          
          {/* Search Controls */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAdvancedSearch(true)}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              დეტალური ძიება
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          {(["ყველა", "ბაზარზე", "გზაში"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {status} (
              {status === "ყველა"
                ? cars.length
                : cars.filter((c) => c.status === status).length}
              )
            </button>
          ))}
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard 
                key={car.id} 
                car={car} 
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(car.id)}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🚗"
            title="მანქანები ვერ მოიძებნა"
            description={`${filter === "ყველა" ? "ამ კატეგორიაში" : `"${filter}" სტატუსით`} მანქანები ამჟამად მიუწვდომელია. სცადეთ სხვა ფილტრი ან შემოწმდით მოგვიანებით.`}
            actionText="ყველა მანქანის ნახვა"
            actionLink="/shop"
          />
        )}
      </div>

      {/* Advanced Search Modal */}
      <AdvancedSearchModal
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
      />

      {/* Auth Required Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {authAction === 'cart' ? 'კალათაში დამატება' : 'ფავორიტებში დამატება'}
              </h3>
              <p className="text-gray-600 mb-6">
                ამ ფუნქციის გამოსაყენებლად საჭიროა ავტორიზაცია
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  გაუქმება
                </button>
                <button
                  onClick={handleAuthRedirect}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  შესვლა
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// განახლებული Car Card Component
interface CarCardProps {
  car: Car;
  onAddToCart: (car: Car) => void;
  onToggleFavorite: (carId: string) => void;
  isFavorite: boolean;
  isAuthenticated: boolean;
}

function CarCard({ car, onAddToCart, onToggleFavorite, isFavorite, isAuthenticated }: CarCardProps) {
  const state = getStateByCode(car.usState);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ბაზარზე":
        return "bg-green-100 text-green-800";
      case "გზაში":
        return "bg-yellow-100 text-yellow-800";
      case "გაყიდული":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const transportCost = state?.transportCostToGeorgia || 1700;
  const totalCostWithTransport = car.price + transportCost;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Car Image */}
      <div className="relative h-48 overflow-hidden">
        <Link to={`/product/${car.id}`}>
          <img
            src={car.images[0]}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Status Badge */}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            car.status
          )}`}
        >
          {car.status}
        </div>

        {/* State Badge */}
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          {state?.georgianName || car.usState}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(car.id)}
          className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
          }`}
          title={isFavorite ? 'ფავორიტებიდან ამოშლა' : 'ფავორიტებში დამატება'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        {/* Price */}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full">
          <InlinePrice 
            price={car.price}
            originalPrice={car.originalPrice}
            showCurrencyToggle={true}
            size="sm"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <Link to={`/product/${car.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {car.year} {car.make} {car.model}
          </h3>
        </Link>

        {/* Location & Auction Info */}
        <div className="mb-3 space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-1">🏢</span>
            {car.auctionLocation}
          </div>
          {car.lotNumber && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-1">🏷️</span>
              ლოტი: {car.lotNumber}
            </div>
          )}
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <span className="mr-1">📍</span>
            {car.location}
          </div>
          <div className="flex items-center">
            <span className="mr-1">🛣️</span>
            {car.mileage.toLocaleString()} მაილი
          </div>
          <div className="flex items-center">
            <span className="mr-1">⚙️</span>
            {car.transmission}
          </div>
          <div className="flex items-center">
            <span className="mr-1">⛽</span>
            {car.fuelType}
          </div>
        </div>

        {/* Transport Cost Info */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
          <div className="text-xs text-orange-800 mb-1">
            ტრანსპორტირება {state?.georgianName}-დან
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-700">+ ${transportCost.toLocaleString()}</span>
            <span className="text-xs text-orange-600">{state?.estimatedDays || 20} დღე</span>
          </div>
        </div>

        {/* Total Cost */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
          <div className="text-xs text-blue-800 mb-1">სულ ღირებულება (ტრანსპორტით)</div>
          <div className="text-lg font-bold text-blue-900">
            <InlinePrice 
              price={totalCostWithTransport}
              showCurrencyToggle={false}
              size="md"
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {car.description}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => onAddToCart(car)}
            disabled={!car.inStock}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
              car.inStock
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {!isAuthenticated ? '🔒 კალათაში დამატება' : 
             !car.inStock ? 'მიუწვდომელია' : 'კალათაში დამატება'}
          </button>
          <Link
            to={`/product/${car.id}`}
            className="px-3 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors"
          >
            დეტალები
          </Link>
        </div>

        {/* Rating & Stock */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm text-gray-600">
              {car.rating} ({car.reviews})
            </span>
          </div>
          <div
            className={`text-xs px-2 py-1 rounded-full ${
              car.inStock
                ? "bg-green-100 text-green-800"
                : "bg-orange-100 text-orange-800"
            }`}
          >
            {car.inStock ? "ხელმისაწვდომია" : "მალე ჩამოვა"}
          </div>
        </div>

        {/* Estimated Arrival */}
        {car.estimatedArrival && (
          <div className="mt-2 text-xs text-blue-600">
            მოსალოდნელი ჩამოსვლა:{" "}
            {new Date(car.estimatedArrival).toLocaleDateString("ka-GE")}
          </div>
        )}
      </div>
    </div>
  );
}