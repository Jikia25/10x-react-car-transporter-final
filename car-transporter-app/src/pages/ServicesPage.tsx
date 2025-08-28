// src/pages/ServicesPage.tsx
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import TransportServiceCard from "../components/TransportServiceCard";

interface TransportService {
  id: string;
  title: string;
  image: string;
  price: string;
  description: string;
  features: string[];
  route?: string;
  duration: string;
  companyName: string;
  rating: number;
}

// Sample data - ტრანსპორტ სერვისების მონაცემები
const sampleServices = [
  {
    id: "1",
    title: "Copart-დან ავტომობილის იმპორტი",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
    price: "$800-დან",
    description: "სრული სერვისი Copart აუქციონიდან ავტომობილის შეძენა-ტრანსპორტირებისთვის. გამჭვირვალე ფასები, სანდო პროცესი.",
    features: ["რეალურ დროში თრექინგი", "დაზღვევა", "საბაჟო გაფორმება", "კონტეინერული ტრანსპორტი"],
    route: "USA → Georgia",
    duration: "15-20 დღე",
    companyName: "AutoImport Pro",
    rating: 4.8
  },
  {
    id: "2", 
    title: "საბაჟო გაფორმება და კლირენსი",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    price: "200₾-დან",
    description: "სწრაფი და ეფექტური საბაჟო მომსახურება. ყველა დოკუმენტის მომზადება, ტექნიკური ტესტირება.",
    features: ["დოკუმენტების მომზადება", "ტექნიკური ტესტი", "ნომრების რეგისტრაცია"],
    duration: "2-3 დღე",
    companyName: "FastCustoms Ltd",
    rating: 4.6
  },
  {
    id: "3",
    title: "ლოკალური ტრანსპორტირება",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop", 
    price: "50₾-დან",
    description: "ბათუმიდან თბილისამდე და სხვა ქალაქებში ავტომობილების უსაფრთხო ტრანსპორტირება.",
    features: ["დაზღვეული ტრანსპორტი", "GPS თრექინგი", "24/7 მხარდაჭერა"],
    route: "ბათუმი → თბილისი",
    duration: "1 დღე",
    companyName: "CarTransport GE",
    rating: 4.9
  },
  {
    id: "4",
    title: "ტექნიკური ინსპექცია და შეკეთება",
    image: "https://images.unsplash.com/photo-1632823471565-1ecdf7038942?w=400&h=300&fit=crop",
    price: "150₾-დან", 
    description: "ავტომობილის სრული ტექნიკური შემოწმება იმპორტის შემდეგ. გარანტიით შეკეთების სერვისი.",
    features: ["დიაგნოსტიკა", "გარანტიით შეკეთება", "ორიგინალური ნაწილები"],
    duration: "3-5 დღე",
    companyName: "AutoService Pro",
    rating: 4.7
  },
  {
    id: "5",
    title: "ავტომობილის დაზღვევა",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    price: "120₾-დან",
    description: "სამოგზაურო და სავალდებულო დაზღვევა კონკურენტული ფასებით. ონლაინ გაფორმება.",
    features: ["სამოგზაურო დაზღვევა", "სავალდებულო დაზღვევა", "ონლაინ გაფორმება"],
    duration: "30 წუთი",
    companyName: "InsurancePlus",
    rating: 4.5
  },
  {
    id: "6",
    title: "ექსპრეს მიწოდება",
    image: "https://images.unsplash.com/photo-1586227740560-8cf2732c1531?w=400&h=300&fit=crop",
    price: "$1500-დან",
    description: "სწრაფი ავიაციური ტრანსპორტირება სპეციალური ავტომობილებისთვის. VIP მომსახურება.",
    features: ["ავიაციური ტრანსპორტი", "VIP მომსახურება", "5 დღეში მიწოდება"],
    route: "USA → Georgia",
    duration: "5-7 დღე",
    companyName: "Express Aviation",
    rating: 4.9
  }
];

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setServices(sampleServices);
      setLoading(false);
    };

    loadServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">იტვირთება სერვისები...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">ჩვენი სერვისები</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            ავტომობილის იმპორტისა და ტრანსპორტირების სრული სპექტრი - 
            Copart აუქციონიდან თქვენს კარამდე
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-12">
        {services.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">სერვისები არ მოიძებნა</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-gray-600">
                ვთავაზობთ {services.length} სახის პროფესიონალურ სერვისს
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <TransportServiceCard 
                  key={service.id} 
                  service={service} 
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Call to Action */}
    



<div className="bg-blue-600 text-white py-12">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-2xl font-bold mb-4">გსურთ პარტნიორობა?</h2>
    <p className="text-blue-100 mb-6">
      შემოუერთდით ჩვენს პლატფორმას და გაზარდეთ თქვენი ბიზნესი
    </p>
    <Link 
      to="/contact"
      className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
    >
      კონტაქტი
    </Link>
  </div>
</div>
    </div>
  );
}