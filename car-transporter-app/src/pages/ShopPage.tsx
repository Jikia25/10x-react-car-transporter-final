// src/pages/ShopPage.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { type Car, carsData  } from "../data/car_data";

export default function ShopPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ყველა" | "ბაზარზე" | "გზაში">("ყველა");

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setCars(carsData);
      setLoading(false);
    };

    loadCars();
  }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">მანქანები არ მოიძებნა</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Car Card Component
interface CarCardProps {
  car: Car;
}

function CarCard({ car }: CarCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ka-GE", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

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

  return (
    <Link
      to={`/product/${car.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Car Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.images[0]}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Status Badge */}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            car.status
          )}`}
        >
          {car.status}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full">
          <span className="font-bold">{formatPrice(car.price)}</span>
          {car.originalPrice && (
            <span className="ml-2 text-xs line-through opacity-75">
              {formatPrice(car.originalPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {car.year} {car.make} {car.model}
        </h3>

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

        {/* Description */}
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {car.description}
        </p>

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

        {/* Estimated Arrival (if in transit) */}
        {car.estimatedArrival && (
          <div className="mt-2 text-xs text-blue-600">
            მოსალოდნელი ჩამოსვლა:{" "}
            {new Date(car.estimatedArrival).toLocaleDateString("ka-GE")}
          </div>
        )}
      </div>
    </Link>
  );
}
