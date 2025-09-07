// src/pages/MainPage.tsx - სრულიად სუფთა და უერრო ვერსია
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InlinePrice from "../components/InlinePrice";
import VehicleTypeSelector from "../components/VehicleTypeSelector";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  images: string[];
  status: "ბაზარზე" | "გზაში" | "გაყიდული";
  mileage: number;
  transmission: string;
  fuelType: string;
  color: string;
}

const carsData: Car[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    price: 25000,
    originalPrice: 28000,
    images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=300&fit=crop"],
    status: "ბაზარზე",
    mileage: 45000,
    transmission: "ავტომატური",
    fuelType: "ბენზინი",
    color: "თეთრი"
  },
  {
    id: "2",
    make: "Honda",
    model: "Accord",
    year: 2021,
    price: 23500,
    originalPrice: 26000,
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop"],
    status: "გზაში",
    mileage: 52000,
    transmission: "ავტომატური",
    fuelType: "ბენზინი",
    color: "ნაცრისფერი"
  },
  {
    id: "3",
    make: "BMW",
    model: "X5",
    year: 2020,
    price: 45000,
    originalPrice: 52000,
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop"],
    status: "ბაზარზე",
    mileage: 38000,
    transmission: "ავტომატური",
    fuelType: "ბენზინი",
    color: "შავი"
  },
  {
    id: "4",
    make: "Mercedes",
    model: "C-Class",
    year: 2023,
    price: 38000,
    originalPrice: 42000,
    images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop"],
    status: "ბაზარზე",
    mileage: 25000,
    transmission: "ავტომატური",
    fuelType: "ბენზინი",
    color: "ვერცხლისფერი"
  },
  {
    id: "5",
    make: "Ford",
    model: "F-150",
    year: 2021,
    price: 35000,
    originalPrice: 39000,
    images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&h=300&fit=crop"],
    status: "გზაში",
    mileage: 55000,
    transmission: "ავტომატური",
    fuelType: "ბენზინი",
    color: "წითელი"
  },
  {
    id: "6",
    make: "Audi",
    model: "A4",
    year: 2022,
    price: 32000,
    originalPrice: 36000,
    images: ["https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=300&fit=crop"],
    status: "ბაზარზე",
    mileage: 35000,
    transmission: "ავტომატური",
    fuelType: "ბენზინი",
    color: "ნაცრისფერი"
  }
];

export default function MainPage() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [transportPrice, setTransportPrice] = useState(1500);
  const [priceDetails, setPriceDetails] = useState<any>(null);

  useEffect(() => {
    const featured = carsData.slice(0, 6);
    setFeaturedCars(featured);

    const interval = setInterval(() => {
      setCurrentCarIndex((prevIndex) => 
        prevIndex === featured.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePriceChange = (price: number, details: any) => {
    setTransportPrice(price);
    setPriceDetails(details);
  };

  const scrollToCar = (index: number) => {
    setCurrentCarIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              მანქანების ტრანსპორტირება
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              ამერიკიდან საქართველოში - უსაფრთხო და სანდო მიტანა
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                ღირებულების გაანგარიშება
              </Link>
              <Link
                to="/shop"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                მანქანების მაღაზია
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">რჩეული მანქანები</h2>
            <p className="text-xl text-gray-600">ამერიკიდან იმპორტირებული ხარისხიანი ავტომობილები</p>
          </div>

          {featuredCars.length > 0 && (
            <div className="relative">
              {/* Main Car Display */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="relative">
                    <img
                      src={featuredCars[currentCarIndex].images[0]}
                      alt={`${featuredCars[currentCarIndex].make} ${featuredCars[currentCarIndex].model}`}
                      className="w-full h-80 object-cover rounded-xl shadow-lg"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                      featuredCars[currentCarIndex].status === "ბაზარზე" ? "bg-green-100 text-green-800" :
                      featuredCars[currentCarIndex].status === "გზაში" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {featuredCars[currentCarIndex].status}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {featuredCars[currentCarIndex].year} {featuredCars[currentCarIndex].make} {featuredCars[currentCarIndex].model}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="flex items-center">
                        <span className="mr-2">🛣</span>
                        {featuredCars[currentCarIndex].mileage.toLocaleString()} მაილი
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">⚙</span>
                        {featuredCars[currentCarIndex].transmission}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">⛽</span>
                        {featuredCars[currentCarIndex].fuelType}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">🎨</span>
                        {featuredCars[currentCarIndex].color}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 mb-6">
                      <div className="text-sm text-gray-600 mb-2">მანქანის ღირებულება</div>
                      <div className="text-2xl font-bold text-blue-600 mb-4">
                        <InlinePrice 
                          price={featuredCars[currentCarIndex].price}
                          originalPrice={featuredCars[currentCarIndex].originalPrice}
                          size="lg"
                          showCurrencyToggle={true}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to={`/product/${featuredCars[currentCarIndex].id}`}
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors"
                      >
                        დეტალების ნახვა
                      </Link>
                      <Link
                        to="/shop"
                        className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-medium text-center hover:bg-blue-50 transition-colors"
                      >
                        ყველა მანქანა
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Car Navigation Dots */}
              <div className="flex justify-center space-x-2 mb-8">
                {featuredCars.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToCar(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentCarIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Car Grid Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCars.slice(0, 6).map((car, index) => (
                  <Link
                    key={car.id}
                    to={`/product/${car.id}`}
                    className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                      index === currentCarIndex ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setCurrentCarIndex(index)}
                  >
                    <div className="relative h-48">
                      <img
                        src={car.images[0]}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                        <InlinePrice price={car.price} size="sm" showCurrencyToggle={false} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-1">
                        {car.year} {car.make} {car.model}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {car.mileage.toLocaleString()} მაილი • {car.transmission}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Transport Calculator Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ტრანსპორტირების კალკულატორი</h2>
            <p className="text-xl text-gray-600">გაიანგარიშეთ ღირებულება თქვენი მანქანისთვის</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <VehicleTypeSelector
              onPriceChange={handlePriceChange}
              basePrice={1500}
            />
            
            {priceDetails && (
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  ღირებულების დეტალები
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">საბაზისო ფასი:</span>
                      <span className="font-medium">${priceDetails.breakdown.basePrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">მანქანის ტიპი ({priceDetails.vehicleType.nameGeo}):</span>
                      <span className="font-medium">×{priceDetails.breakdown.vehicleMultiplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">მდგომარეობა:</span>
                      <span className="font-medium">×{priceDetails.breakdown.conditionMultiplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ტრანსპორტის ტიპი:</span>
                      <span className="font-medium">×{priceDetails.breakdown.transportMultiplier}</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-sm text-blue-800 mb-2">სულ ღირებულება</div>
                      <div className="text-3xl font-bold text-blue-900">
                        ${priceDetails.breakdown.totalPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-700 mt-2">
                        ≈ {Math.round(priceDetails.breakdown.totalPrice * 2.7).toLocaleString()} ₾
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ჩვენი სერვისები</h2>
            <p className="text-xl text-gray-600">სრული სპექტრის ტრანსპორტირების მომსახურება</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">მანქანების იმპორტი</h3>
              <p className="text-gray-600 mb-4">
                ამერიკული აუქციონებიდან მანქანების შერჩევა და ყიდვა
              </p>
              <Link to="/shop" className="text-blue-600 font-medium hover:text-blue-700">
                მანქანების ნახვა →
              </Link>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🚛</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">ტრანსპორტირება</h3>
              <p className="text-gray-600 mb-4">
                უსაფრთხო მიტანა ამერიკიდან საქართველომდე
              </p>
              <Link to="/services" className="text-blue-600 font-medium hover:text-blue-700">
                ღირებულების გაანგარიშება →
              </Link>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">დოკუმენტაცია</h3>
              <p className="text-gray-600 mb-4">
                სრული დოკუმენტური მხარდაჭერა და კონსულტაცია
              </p>
              <Link to="/contact" className="text-blue-600 font-medium hover:text-blue-700">
                კონსულტაცია →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">რატომ ჩვენ?</h2>
            <p className="text-xl text-blue-100">10 წლიანი გამოცდილება ტრანსპორტირების სფეროში</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-4">⭐</div>
              <div className="text-2xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">მომხმარებელთა შეფასება</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-4">🚛</div>
              <div className="text-2xl font-bold mb-2">5000+</div>
              <div className="text-blue-100">გადატანილი მანქანა</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-4">⏱</div>
              <div className="text-2xl font-bold mb-2">15-25</div>
              <div className="text-blue-100">დღე მიტანის ვადა</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-4">🛡</div>
              <div className="text-2xl font-bold mb-2">100%</div>
              <div className="text-blue-100">დაცული ტრანსპორტი</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">მზად ხართ დაიწყოთ?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            მიიღეთ უფასო კონსულტაცია და გაიანგარიშეთ ტრანსპორტირების ღირებულება
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              უფასო კონსულტაცია
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              ღირებულების გაანგარიშება
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}