// src/pages/ProductDetails.tsx - განახლებული ტრანსპორტირების კალკულატორით
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { carsData, type Car } from "../data/car_data";
import { getStateByCode, calculateTransportCost } from "../data/states_transport";
import { useCart } from "../context/CartContext";
import InlinePrice from "../components/InlinePrice";
import TransportCostCalculator from "../components/TransportCostCalculator";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showTransportCalculator, setShowTransportCalculator] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadCar = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundCar = carsData.find(c => c.id === id);
      setCar(foundCar || null);
      setLoading(false);
    };

    if (id) {
      loadCar();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">იტვირთება მანქანის დეტალები...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">მანქანა ვერ მოიძებნა</h1>
          <Link to="/shop" className="text-blue-600 hover:text-blue-800">
            მანქანების მაღაზიაში დაბრუნება
          </Link>
        </div>
      </div>
    );
  }

  const state = getStateByCode(car.usState);
  const transportInfo = calculateTransportCost(car.usState, car.price);

  const handleAddToCart = () => {
    addToCart(car);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">მთავარი</Link>
            <span className="mx-2">›</span>
            <Link to="/shop" className="hover:text-blue-600">მაღაზია</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">{car.year} {car.make} {car.model}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Images Section */}
          <div>
            {/* Main Image */}
            <div className="mb-4">
              <img
                src={car.images[selectedImage]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Thumbnail Images */}
            {car.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${car.make} ${car.model} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div>
            {/* Title and Status */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {car.year} {car.make} {car.model}
                </h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  car.status === "ბაზარზე" ? "bg-green-100 text-green-800" :
                  car.status === "გზაში" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {car.status}
                </span>
              </div>
              
              {/* Location Info */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <span className="mr-1">🏢</span>
                  {car.auctionLocation}
                </div>
                {car.lotNumber && (
                  <div className="flex items-center">
                    <span className="mr-1">🏷️</span>
                    ლოტი: {car.lotNumber}
                  </div>
                )}
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">მანქანის ღირებულება</div>
                <div className="flex items-center gap-3">
                  <InlinePrice 
                    price={car.price} 
                    originalPrice={car.originalPrice}
                    size="lg"
                    showCurrencyToggle={true}
                  />
                </div>
              </div>

              {/* Transport Cost Section */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm text-gray-600">ტრანსპორტირება {state?.georgianName}-დან</div>
                    <div className="text-lg font-semibold text-orange-600">
                      ${transportInfo.transportCost.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">მიღების დრო</div>
                    <div className="text-lg font-semibold text-blue-600">
                      {transportInfo.estimatedDays} დღე
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-sm text-blue-800 mb-1">სულ ღირებულება (ტრანსპორტით)</div>
                  <div className="text-2xl font-bold text-blue-900">
                    <InlinePrice 
                      price={transportInfo.totalCost}
                      size="xl"
                      showCurrencyToggle={false}
                    />
                  </div>
                </div>
              </div>

              {/* Transport Calculator Toggle */}
              <button
                onClick={() => setShowTransportCalculator(!showTransportCalculator)}
                className="w-full mt-4 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
              >
                {showTransportCalculator ? 'კალკულატორის დამალვა' : 'სხვა შტატების ფასების ნახვა'}
              </button>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!car.inStock}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  car.inStock
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {car.inStock ? 'კალათაში დამატება' : 'მიუწვდომელია'}
              </button>
              
              <div className="flex gap-3">
                <Link
                  to="/contact"
                  className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition-colors"
                >
                  კონსულტაცია
                </Link>
                <button className="flex-1 py-2 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
                  ფავორიტებში
                </button>
              </div>
            </div>

            {/* Key Specifications */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">ძირითადი მახასიათებლები</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">გარბენი:</span>
                  <span className="ml-2 font-medium">{car.mileage.toLocaleString()} მაილი</span>
                </div>
                <div>
                  <span className="text-gray-600">ძრავა:</span>
                  <span className="ml-2 font-medium">{car.engine}</span>
                </div>
                <div>
                  <span className="text-gray-600">ტრანსმისია:</span>
                  <span className="ml-2 font-medium">{car.transmission}</span>
                </div>
                <div>
                  <span className="text-gray-600">საწვავი:</span>
                  <span className="ml-2 font-medium">{car.fuelType}</span>
                </div>
                <div>
                  <span className="text-gray-600">ფერი:</span>
                  <span className="ml-2 font-medium">{car.color}</span>
                </div>
                <div>
                  <span className="text-gray-600">VIN:</span>
                  <span className="ml-2 font-medium">{car.vin}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transport Calculator Section */}
        {showTransportCalculator && (
          <div className="mb-8">
            <TransportCostCalculator
              carPrice={car.price}
              selectedState={car.usState}
              className="max-w-2xl mx-auto"
            />
          </div>
        )}

        {/* Description and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">აღწერა</h3>
              <p className="text-gray-700 leading-relaxed">{car.description}</p>
              
              {car.estimatedArrival && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-yellow-600 mr-2">🚛</span>
                    <div>
                      <div className="font-medium text-yellow-800">ტრანსპორტირების სტატუსი</div>
                      <div className="text-sm text-yellow-700">
                        მოსალოდნელი ჩამოსვლა: {new Date(car.estimatedArrival).toLocaleDateString("ka-GE")}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">შეფასება</h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= Math.floor(car.rating) ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-lg font-bold">{car.rating}</span>
              </div>
              <p className="text-sm text-gray-600">{car.reviews} მომხმარებლის შეფასება</p>
            </div>

            {/* Transport Info */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">ტრანსპორტირების ინფო</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">შტატი:</span>
                  <span className="ml-2 font-medium">{state?.georgianName}</span>
                </div>
                <div>
                  <span className="text-gray-600">აუქციონი:</span>
                  <span className="ml-2 font-medium">{car.auctionLocation}</span>
                </div>
                <div>
                  <span className="text-gray-600">ტრანსპორტი:</span>
                  <span className="ml-2 font-medium">${transportInfo.transportCost.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">მიღების დრო:</span>
                  <span className="ml-2 font-medium">{transportInfo.estimatedDays} დღე</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}