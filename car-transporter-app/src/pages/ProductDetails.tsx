// src/pages/ProductDetails.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { carsData, type Car } from "../data/car_data";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCar = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const foundCar = carsData.find((c) => c.id === id);
      setCar(foundCar || null);
      setLoading(false);
    };

    loadCar();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">იტვირთება მანქანა...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            მანქანა ვერ მოიძებნა
          </h1>
          <Link
            to="/shop"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            ← უკან მაღაზიაში
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/shop"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            ← უკან მაღაზიაში
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-96 rounded-lg overflow-hidden bg-gray-200">
              <img
                src={car.images[currentImageIndex]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              {car.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? car.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  >
                    ←
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === car.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Status */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {car.year} {car.make} {car.model}
              </h1>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    car.status
                  )}`}
                >
                  {car.status}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm text-gray-600">
                    {car.rating} ({car.reviews} მიმოხილვა)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {formatPrice(car.price)}
              </div>
              {car.originalPrice && (
                <div className="text-lg text-gray-500 line-through">
                  ორიგინალი: {formatPrice(car.originalPrice)}
                </div>
              )}
              <div className="text-sm text-green-600 font-medium">
                დაზოგვა:{" "}
                {car.originalPrice
                  ? formatPrice(car.originalPrice - car.price)
                  : "N/A"}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                აღწერა
              </h3>
              <p className="text-gray-700 leading-relaxed">{car.description}</p>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                სპეციფიკაციები
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-500">გარბენი</span>
                  <div className="font-semibold">
                    {car.mileage.toLocaleString()} მაილი
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-500">ძრავა</span>
                  <div className="font-semibold">{car.engine}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-500">ტრანსმისია</span>
                  <div className="font-semibold">{car.transmission}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-500">საწვავი</span>
                  <div className="font-semibold">{car.fuelType}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-500">ფერი</span>
                  <div className="font-semibold">{car.color}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-500">მდებარეობა</span>
                  <div className="font-semibold">{car.location}</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                თვისებები
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {car.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 text-blue-800 px-3 py-2 rounded-full text-sm text-center"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Import Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                იმპორტის ინფორმაცია
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">აუქციონი:</span>
                  <span className="font-medium">
                    {car.importInfo.auctionSite}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">შეძენის თარიღი:</span>
                  <span className="font-medium">
                    {new Date(car.importInfo.purchaseDate).toLocaleDateString(
                      "ka-GE"
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">სტატუსი:</span>
                  <span className="font-medium">
                    {car.importInfo.shippingStatus}
                  </span>
                </div>
                {car.vin && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">VIN:</span>
                    <span className="font-mono text-xs">{car.vin}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {car.inStock ? (
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors">
                  🛒 ყიდვა - {formatPrice(car.price)}
                </button>
              ) : (
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors">
                  📋 პრე-ორდერი -{" "}
                  {car.estimatedArrival
                    ? `ჩამოსვლა: ${new Date(
                        car.estimatedArrival
                      ).toLocaleDateString("ka-GE")}`
                    : "მალე ჩამოვა"}
                </button>
              )}

              <Link
                to="/contact"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-center transition-colors"
              >
                💬 შეკითხვა ამ მანქანაზე
              </Link>
            </div>

            {/* Damage Warning */}
            {car.damage && (
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <div className="flex items-start">
                  <span className="text-orange-500 mr-2">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-1">
                      ზიანის შესახებ
                    </h4>
                    <p className="text-orange-700 text-sm">{car.damage}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
