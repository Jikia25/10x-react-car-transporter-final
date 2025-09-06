// src/pages/ServicesPage.tsx - განახლებული ტრანსპორტირების დეტალებით
import { useState } from "react";
import { Link } from "react-router-dom";
import { US_STATES } from "../data/states_transport";
import TransportCostCalculator from "../components/TransportCostCalculator";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: "copart-import",
      title: "Copart-დან იმპორტი",
      description: "პროფესიონალური ავტომობილების შეძენა აუქციონიდან",
      basePrice: "$800-დან",
      fullDescription: "Copart-ი ამერიკის უმსხვილესი ავტომობილების აუქციონია. ჩვენ გთავაზობთ სრულ სერვისს - მანქანის ძიება, ყიდვა, საჯარო სერტიფიკატების მოძიება და ტრანსპორტირება.",
      features: [
        "მანქანის ძიება და შერჩევა",
        "აუქციონზე ონლაინ ყიდვა",
        "title-ის მოძიება",
        "საბაჟო დოკუმენტების მომზადება",
        "ყოველდღიური სტატუსის განახლება"
      ],
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=300&fit=crop"
    },
    {
      id: "customs-clearance", 
      title: "საბაჟო გაფორმება",
      description: "სწრაფი და ეფექტური საბაჟო მომსახურება",
      basePrice: "200₾-დან",
      fullDescription: "საბაჟო გაფორმებას ვასრულებთ ბათუმის პორტში გამოცდილი ბროკერების მეშვეობით. ყველა პროცედურა მიმდინარეობს მაქსიმალურ სისწრაფეში.",
      features: [
        "დოკუმენტების შემოწმება",
        "გადასახადების გამოთვლა",
        "საბაჟო პროცედურების გავლა",
        "ავტომობილის ინსპექცია",
        "ნომრების გაფორმება"
      ],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop"
    },
    {
      id: "transportation",
      title: "ტრანსპორტირება",
      description: "უსაფრთხო მიწოდება ბათუმიდან თბილისამდე",
      basePrice: "50₾-დან",
      fullDescription: "ტრანსპორტირება მიმდინარეობს სპეციალურ ავტოტრანსპორტერებით. ყველა ავტომობილი დაზღვეულია და უსაფრთხოდ ჩამოდის დანიშნულების ადგილზე.",
      features: [
        "სპეციალური ავტოტრანსპორტერები",
        "სრული დაზღვევა",
        "მიწოდება მისამართზე",
        "ონლაინ თრექინგი",
        "24/7 მხარდაჭერა"
      ],
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop"
    },
    {
      id: "technical-inspection",
      title: "ტექნიკური ინსპექცია",
      description: "სრული ტექნიკური შემოწმება და შეკეთება",
      basePrice: "150₾-დან",
      fullDescription: "გამოცდილი მექანიკები ატარებენ სრულ ტექნიკურ შემოწმებას და საჭიროების შემთხვევაში ასრულებენ შეკეთების სამუშაოებს.",
      features: [
        "ძრავის დიაგნოსტიკა",
        "ელექტრო სისტემის შემოწმება",
        "გადაცემათა კოლოფის ინსპექცია",
        "მუხრუჭების სისტემა",
        "შეკეთების სამუშაოები"
      ],
      image: "https://images.unsplash.com/photo-1632823471565-1ecdf7038942?w=500&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">ჩვენი სერვისები</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            სრული სპექტრის მომსახურება ავტომობილის იმპორტისა და ტრანსპორტირებისთვის
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    {service.basePrice}
                  </span>
                  <button
                    onClick={() => setSelectedService(
                      selectedService === service.id ? null : service.id
                    )}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    {selectedService === service.id ? 'დამალვა' : 'დეტალები'}
                  </button>
                </div>

                {selectedService === service.id && (
                  <div className="border-t pt-4">
                    <p className="text-gray-700 mb-4">{service.fullDescription}</p>
                    <h4 className="font-medium text-gray-900 mb-2">რას შეიცავს:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Transportation Details Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            ტრანსპორტირების ღირებულება შტატების მიხედვით
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {US_STATES.map((state) => (
              <div
                key={state.code}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{state.georgianName}</h3>
                  <span className="text-sm text-gray-500">{state.code}</span>
                </div>
                <div className="text-lg font-bold text-blue-600 mb-1">
                  ${state.transportCostToGeorgia.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {state.estimatedDays} დღე
                </div>
                <div className="text-xs text-gray-500">
                  აუქციონები: {state.popularAuctions.join(", ")}
                </div>
              </div>
            ))}
          </div>

          {/* Transport Cost Calculator */}
          <div className="border-t pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              ტრანსპორტირების კალკულატორი
            </h3>
            <TransportCostCalculator className="max-w-2xl mx-auto" />
          </div>
        </div>

        {/* Process Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ტრანსპორტირების პროცესი
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "შეკვეთის მიღება",
                description: "მანქანის შერჩევა და შეკვეთის გაფორმება",
                duration: "1 დღე",
                icon: "📋"
              },
              {
                step: "2", 
                title: "ამერიკაში ტრანსპორტი",
                description: "აუქციონიდან პორტამდე ტრანსპორტირება",
                duration: "3-5 დღე",
                icon: "🚛"
              },
              {
                step: "3",
                title: "ზღვით ტრანსპორტი",
                description: "ამერიკიდან ბათუმის პორტამდე გზავნილი",
                duration: "10-15 დღე",
                icon: "🚢"
              },
              {
                step: "4",
                title: "მიღება საქართველოში",
                description: "საბაჟო გაფორმება და მიწოდება",
                duration: "2-3 დღე", 
                icon: "✅"
              }
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
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <div className="text-blue-600 font-medium text-sm">{item.duration}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            ხშირად დასმული კითხვები
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "რომელი შტატიდან ყველაზე იაფია ტრანსპორტირება?",
                answer: "ყველაზე იაფი ტრანსპორტირება არის ჯორჯია (აშშ) შტატიდან - $1,450. ეს იმით აიხსნება რომ ეს შტატი ყველაზე ახლოს არის ატლანტის ოკეანესთან."
              },
              {
                question: "რამდენ ხანში ჩამოდის მანქანა?",
                answer: "საშუალოდ 16-22 დღე, რაც დამოკიდებულია შტატზე. ყველაზე სწრაფია ჯორჯია (16 დღე), ყველაზე ნელა - ნიუ-იორკი და კალიფორნია (21-22 დღე)."
              },
              {
                question: "რას შეიცავს ტრანსპორტირების ღირებულება?",
                answer: "ღირებულება შეიცავს: ამერიკაში ლოკალურ ტრანსპორტს, კონტეინერით ზღვით გადაზიდვას, ბათუმის პორტში მიღებას, საბაჟო გაფორმებას და თბილისამდე ტრანსპორტირებას."
              },
              {
                question: "შესაძლებელია თუ არა ტრანსპორტირების თრექინგი?",
                answer: "დიახ, ყველა ეტაპზე გაძლევთ დეტალურ ინფორმაციას: კონტეინერის ნომერს, გემის მონაცემებს და მოსალოდნელ დროს. ასევე SMS შეტყობინებებს იღებთ ყველა მნიშვნელოვან ეტაპზე."
              },
              {
                question: "რა ხდება თუ მანქანა დაზიანდება ტრანსპორტირებისას?",
                answer: "ყველა მანქანა დაზღვეულია ტრანსპორტირების მთელ პერიოდში. დაზიანების შემთხვევაში დაზღვევის კომპანია ფარავს შეკეთების ღირებულებას ან იხდის ზიანს."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            მზად ხართ ავტომობილის იმპორტისთვის?
          </h2>
          <p className="text-gray-600 mb-6">
            დაუკავშირდით ჩვენს ექსპერტებს უფასო კონსულტაციისთვის
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              მანქანების ნახვა
            </Link>
            <Link
              to="/contact"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              კონტაქტი
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}