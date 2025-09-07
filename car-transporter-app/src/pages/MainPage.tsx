// src/pages/MainPage.tsx - Clean version without VIN Search
import { useState } from "react";
import { Link } from "react-router-dom";

// Car data interface
interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  mileage: number;
  vin: string;
  rating: number;
  reviews: number;
  status: string;
  usState: string;
  auctionLocation: string;
  lotNumber?: string;
  vehicleType: string;
  condition: string;
}

// Sample car data
const carsData: Car[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    price: 25000,
    originalPrice: 28000,
    images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=300&fit=crop"],
    description: "განსაკუთრებით კარგ მდგომარეობაში Toyota Camry. რეგულარული ტექნიკური მომსახურება, ყველა დოკუმენტი ხელთაა.",
    mileage: 45000,
    vin: "4T1G11AK8NU123456",
    rating: 4.8,
    reviews: 156,
    status: "ბაზარზე",
    usState: "CA",
    auctionLocation: "Copart Los Angeles",
    lotNumber: "45782659",
    vehicleType: 'sedan',
    condition: 'running'
  },
  {
    id: "2", 
    make: "Honda",
    model: "Accord",
    year: 2021,
    price: 23500,
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop"],
    description: "ეკონომიური და საიმედო Honda Accord. იდეალურია ყოველდღიური გამოყენებისთვის.",
    mileage: 38000,
    vin: "1HGCV1F30MA123456",
    rating: 4.6,
    reviews: 89,
    status: "გზაში",
    usState: "TX",
    auctionLocation: "IAA Dallas",
    lotNumber: "35896741",
    vehicleType: 'sedan',
    condition: 'running'
  },
  {
    id: "3",
    make: "BMW",
    model: "X5",
    year: 2020,
    price: 45000,
    originalPrice: 48000,
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop"],
    description: "პრემიუმ კლასის BMW X5. ყველა ოფციით, შესანიშნავ მდგომარეობაში.",
    mileage: 52000,
    vin: "5UXCR6C04L1234567",
    rating: 4.9,
    reviews: 203,
    status: "ბაზარზე",
    usState: "FL",
    auctionLocation: "Copart Miami",
    lotNumber: "67234891",
    vehicleType: 'suv',
    condition: 'running'
  }
];

export default function MainPage() {
  const [showJoinFlow, setShowJoinFlow] = useState(false);

  // Check if user is authenticated
  const token = localStorage.getItem("fake_token");
  const userProfile = localStorage.getItem("user_profile");

  const handleJoinComplete = (profile: any) => {
    console.log('User profile:', profile);
    localStorage.setItem("fake_token", "new_user_token");
    localStorage.setItem("user_profile", JSON.stringify(profile));
    setShowJoinFlow(false);
    window.location.reload();
  };

  // Sample services data
  const services = [
    {
      id: 1,
      title: "Copart-დან იმპორტი",
      description: "პროფესიონალური ავტომობილების შეძენა აუქციონიდან",
      price: "$800-დან",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      title: "საბაჟო გაფორმება",
      description: "სწრაფი და ეფექტური საბაჟო მომსახურება",
      price: "200₾-დან",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      title: "ტრანსპორტირება",
      description: "უსაფრთხო მიწოდება ბათუმიდან თბილისამდე",
      price: "50₾-დან",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    },
    {
      id: 4,
      title: "ტექნიკური ინსპექცია",
      description: "სრული ტექნიკური შემოწმება და შეკეთება",
      price: "150₾-დან",
      image: "https://images.unsplash.com/photo-1632823471565-1ecdf7038942?w=300&h=200&fit=crop",
    },
    {
      id: 5,
      title: "დაზღვევა",
      description: "სამოგზაურო და სავალდებულო დაზღვევა",
      price: "120₾-დან",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
    },
  ];

  const featuredCars = carsData.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
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

            {/* Join CTA for non-authenticated users */}
            {!token && (
              <div className="mb-8 p-6 bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-xl">
                <h3 className="text-xl font-bold mb-3">
                  შემოუერთდით ტრანსპორტერების ქსელს
                </h3>
                <p className="text-green-100 mb-4">
                  მიიღეთ ექსკლუზიური ფასები, პრიორიტეტული მომსახურება და პროფესიონალური მხარდაჭერა
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setShowJoinFlow(true)}
                    className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    გაწევრიანება - უფასოა
                  </button>
                  <Link
                    to="/login"
                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-green-600 transition-colors text-center"
                  >
                    უკვე ანგარიში მაქვს
                  </Link>
                </div>
              </div>
            )}

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
                    {/* User Type Badge for members */}
                    {token && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                        წევრის ფასი
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {car.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold text-green-600">
                          ${car.price.toLocaleString()}
                        </div>
                        {token && (
                          <div className="text-sm text-green-600 font-medium">
                            დაზოგეთ $200+
                          </div>
                        )}
                      </div>
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
                title: "მოიძიეთ ავტომობილი",
                description: "გამოიყენეთ ჩვენი search bar header-ში VIN კოდით ან მოდელით",
                icon: "🔍",
              },
              {
                step: "2",
                title: "გაფორმდეს შეკვეთა",
                description: "დაჯავშნეთ ავტომობილი და მიუთითეთ მიწოდების მისამართი",
                icon: "📋",
              },
              {
                step: "3",
                title: "ტრანსპორტირება",
                description: "ჩვენ ვაგზავნით მანქანას და ვუზრუნველყოფთ საბაჟო გაფორმებას",
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

      {/* Member Benefits Section for authenticated users */}
      {token && userProfile && (
        <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              თქვენი წევრობის სარგებელი
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="text-lg font-bold mb-2">ფასდაკლებები</h3>
                <p className="text-blue-100">დაზოგეთ $200+ ყოველ მანქანაზე</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-lg font-bold mb-2">პრიორიტეტი</h3>
                <p className="text-blue-100">სწრაფი მომსახურება და ტრანსპორტი</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-bold mb-2">ექსკლუზიური</h3>
                <p className="text-blue-100">წვდომა ახალ შეთავაზებებზე</p>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Join Login Flow Modal */}
      {showJoinFlow && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowJoinFlow(false)}
          />
          <div className="relative flex items-center justify-center min-h-screen p-4">
            <div className="bg-white max-w-md mx-auto rounded-lg p-6">
              <button
                onClick={() => setShowJoinFlow(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h3 className="text-xl font-bold mb-4">შემოგვიერთდით</h3>
              <p className="text-gray-600 mb-6">
                აირჩიეთ რომელი ტიპის მომხმარებელი ხართ:
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    handleJoinComplete({ type: 'individual', experience: 'beginner' });
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  👤 ინდივიდუალური მომხმარებელი
                </button>
                <button 
                  onClick={() => {
                    handleJoinComplete({ type: 'dealer', experience: 'beginner', monthlyVolume: 10 });
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  🏢 დილერი
                </button>
                <button 
                  onClick={() => {
                    handleJoinComplete({ type: 'shipper', experience: 'experienced', monthlyVolume: 50 });
                  }}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  🚛 შიპერი
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}