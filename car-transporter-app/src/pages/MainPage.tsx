// src/pages/MainPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useOrders } from "../context/OrdersContext";
import { useCart } from "../context/CartContext";
import { carsData } from "../data/car_data";
import InlinePrice from "../components/InlinePrice";
import AdvancedSearchModal from "../components/AdvancedSearchModal";

export default function MainPage() {
  const { user } = useUser();
  const { orders } = useOrders();
  const { state: cartState } = useCart();
  const [searchVin, setSearchVin] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const handleVinSearch = () => {
    if (!searchVin.trim()) return;

    // Search in cars data by VIN
    const results = carsData.filter(
      (car) =>
        car.vin?.toLowerCase().includes(searchVin.toLowerCase()) ||
        car.make.toLowerCase().includes(searchVin.toLowerCase()) ||
        car.model.toLowerCase().includes(searchVin.toLowerCase())
    );

    setSearchResults(results);
  };

  const handleLogout = () => {
    localStorage.removeItem("fake_token");
    window.location.reload();
  };

  // Sample services data
  const services = [
    {
      id: 1,
      title: "Copart-დან იმპორტი",
      description: "პროფესიონალური ავტომობილების შეძენა აუქციონიდან",
      price: "$800-დან",
      image:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      title: "საბაჟო გაფორმება",
      description: "სწრაფი და ეფექტური საბაჟო მომსახურება",
      price: "200₾-დან",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      title: "ტრანსპორტირება",
      description: "უსაფრთხო მიწოდება ბათუმიდან თბილისამდე",
      price: "50₾-დან",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    },
    {
      id: 4,
      title: "ტექნიკური ინსპექცია",
      description: "სრული ტექნიკური შემოწმება და შეკეთება",
      price: "150₾-დან",
      image:
        "https://images.unsplash.com/photo-1632823471565-1ecdf7038942?w=300&h=200&fit=crop",
    },
    {
      id: 5,
      title: "დაზღვევა",
      description: "სამოგზაურო და სავალდებულო დაზღვევა",
      price: "120₾-დან",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
    },
  ];

  const featuredCars = carsData.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Controls */}
      {user && (
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                მოგესალმებით, {user.fullName}
              </span>
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  ჩემი ანგარიში
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  გასვლა
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              ამერიკიდან ავტომობილების იმპორტი
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Copart, IAA და სხვა აუქციონებიდან პროფესიონალური შეძენა და
              ტრანსპორტირება. გამჭვირვალე ფასები, სანდო სერვისი.
            </p>

            {/* VIN Search */}
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                მოძებნეთ ავტომობილი VIN კოდით ან მოდელით
              </h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={searchVin}
                  onChange={(e) => setSearchVin(e.target.value)}
                  placeholder="VIN კოდი ან ავტომობილის მოდელი..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleVinSearch}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  ძიება
                </button>
              </div>
              <div className="flex space-x-2 mt-4 justify-center">
                <button
                  onClick={() => setShowAdvancedSearch(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  ფილტრი
                </button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-4 text-left">
                  <h4 className="font-medium text-gray-900 mb-2">
                    ძიების შედეგები:
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {searchResults.map((car) => (
                      <Link
                        key={car.id}
                        to={`/product/${car.id}`}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded"
                      >
                        <img
                          src={car.images[0]}
                          alt={`${car.make} ${car.model}`}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {car.year} {car.make} {car.model}
                          </p>
                          <p className="text-sm text-gray-500">
                            VIN: {car.vin}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-200">იმპორტირებული ავტომობილი</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-blue-200">წლიანი გამოცდილება</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-blue-200">კმაყოფილი მომხმარებლები</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ჩვენი სერვისები
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              სრული სპექტრის მომსახურება ავტომობილის იმპორტისა და
              ტრანსპორტირებისთვის
            </p>
          </div>

          {/* Horizontal Scrollable Services */}
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6" style={{ width: "max-content" }}>
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow w-80 flex-shrink-0"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">
                        {service.price}
                      </span>
                      <Link
                        to="/services"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                      >
                        დეტალები
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/services"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              ყველა სერვისის ნახვა
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Cars Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              რეკომენდებული ავტომობილები
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ხელმისაწვდომი მანქანები რუსთავის ბაზარზე და გზაში მყოფი
              ავტომობილები
            </p>
          </div>

          {/* Horizontal Scrollable Cars */}
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6" style={{ width: "max-content" }}>
              {featuredCars.map((car) => (
                <Link
                  key={car.id}
                  to={`/product/${car.id}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all w-80 flex-shrink-0 group"
                >
                  <div className="relative">
                    <img
                      src={car.images[0]}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      {car.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {car.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <InlinePrice
                        price={car.price}
                        size="md"
                        showCurrencyToggle={false}
                      />
                      <div className="text-sm text-gray-500">
                        {car.mileage.toLocaleString()} მაილი
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/shop"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              ყველა მანქანის ნახვა
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              როგორ მუშაობს?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              მარტივი 4-ნაბიჯიანი პროცესი ავტომობილის იმპორტისთვის
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "აირჩიეთ ავტომობილი",
                description:
                  "მოძებნეთ სასურველი მანქანა ჩვენს კატალოგში ან VIN კოდით",
                icon: "🔍",
              },
              {
                step: "2",
                title: "გაფორმდეს შეკვეთა",
                description:
                  "დაჯავშნეთ ავტომობილი და მიუთითეთ მიწოდების მისამართი",
                icon: "📋",
              },
              {
                step: "3",
                title: "ტრანსპორტირება",
                description:
                  "ჩვენ ვაგზავნით მანქანას და ვუზრუნველყოფთ საბაჟო გაფორმებას",
                icon: "🚛",
              },
              {
                step: "4",
                title: "მიღება",
                description: "მიიღეთ თქვენი ავტომობილი მითითებულ მისამართზე",
                icon: "✅",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            მზად ხართ ავტომობილის იმპორტისთვის?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            დაუკავშირდით ჩვენს ექსპერტებს უფასო კონსულტაციისთვის
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              მანქანების ნახვა
            </Link>
            <Link
              to="/contact"
              className="bg-green-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-900 transition-colors"
            >
              კონტაქტი
            </Link>
          </div>
        </div>
      </div>

      {/* Advanced Search Modal */}
      <AdvancedSearchModal
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
      />
    </div>
  );
}
