// src/components/TransportServiceCard.tsx
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

interface Props {
  service: TransportService;
}

export default function TransportServiceCard({ service }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm">
          ⭐ {service.rating}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title & Company */}
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{service.title}</h3>
          <p className="text-sm text-blue-600 font-medium">{service.companyName}</p>
        </div>

        {/* Route & Duration */}
        {service.route && (
          <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
            <span className="flex items-center">
              🚗 {service.route}
            </span>
            <span className="flex items-center">
              ⏱️ {service.duration}
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{service.description}</p>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {service.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {feature}
              </span>
            ))}
            {service.features.length > 3 && (
              <span className="text-gray-500 text-xs px-2 py-1">
                +{service.features.length - 3} სხვა
              </span>
            )}
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-green-600">{service.price}</div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            დეტალები
          </button>
        </div>
      </div>
    </div>
  );
}