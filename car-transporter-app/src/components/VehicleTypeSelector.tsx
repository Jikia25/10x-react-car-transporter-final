// src/components/VehicleTypeSelector.tsx
import React, { useState } from 'react';

// Import types from data file
interface VehicleType {
  id: string;
  name: string;
  nameGeo: string;
  category: 'standard' | 'large' | 'premium';
  multiplier: number;
  dimensions: {
    length: string;
    width: string;
    height: string;
    weight: string;
  };
  examples: string[];
  icon: string;
}

// Vehicle types data (same as in vehicle_pricing.ts)
const vehicleTypes: VehicleType[] = [
  {
    id: 'sedan',
    name: 'Sedan',
    nameGeo: 'სედანი',
    category: 'standard',
    multiplier: 1.0,
    dimensions: {
      length: 'Up to 16 ft',
      width: 'Up to 6 ft',
      height: 'Up to 5.5 ft',
      weight: 'Up to 4,000 lbs'
    },
    examples: ['Toyota Camry', 'Honda Accord', 'BMW 3 Series'],
    icon: '🚗'
  },
  {
    id: 'suv',
    name: 'SUV',
    nameGeo: 'ჯიპი',
    category: 'large',
    multiplier: 1.15,
    dimensions: {
      length: 'Up to 18 ft',
      width: 'Up to 7 ft',
      height: 'Up to 7 ft',
      weight: 'Up to 6,000 lbs'
    },
    examples: ['Toyota RAV4', 'Honda CR-V', 'BMW X5'],
    icon: '🚙'
  },
  {
    id: 'pickup',
    name: 'Pickup Truck',
    nameGeo: 'პიკაპი',
    category: 'large',
    multiplier: 1.2,
    dimensions: {
      length: 'Up to 20 ft',
      width: 'Up to 7 ft',
      height: 'Up to 7 ft',
      weight: 'Up to 7,000 lbs'
    },
    examples: ['Ford F-150', 'Chevrolet Silverado', 'Toyota Tacoma'],
    icon: '🛻'
  },
  {
    id: 'luxury',
    name: 'Luxury/Sports Car',
    nameGeo: 'ლუქს/სპორტული',
    category: 'premium',
    multiplier: 1.3,
    dimensions: {
      length: 'Up to 16 ft',
      width: 'Up to 6.5 ft',
      height: 'Up to 5 ft',
      weight: 'Up to 4,500 lbs'
    },
    examples: ['Mercedes S-Class', 'Porsche 911', 'Tesla Model S'],
    icon: '🏎️'
  },
  {
    id: 'van',
    name: 'Van/Minivan',
    nameGeo: 'მიკრობუსი',
    category: 'large',
    multiplier: 1.25,
    dimensions: {
      length: 'Up to 19 ft',
      width: 'Up to 7 ft',
      height: 'Up to 8 ft',
      weight: 'Up to 6,500 lbs'
    },
    examples: ['Honda Odyssey', 'Toyota Sienna', 'Ford Transit'],
    icon: '🚐'
  },
  {
    id: 'motorcycle',
    name: 'Motorcycle',
    nameGeo: 'მოტოციკლი',
    category: 'standard',
    multiplier: 0.6,
    dimensions: {
      length: 'Up to 8 ft',
      width: 'Up to 3 ft',
      height: 'Up to 4 ft',
      weight: 'Up to 800 lbs'
    },
    examples: ['Harley Davidson', 'Honda CBR', 'Yamaha R1'],
    icon: '🏍️'
  },
  {
    id: 'oversized',
    name: 'Oversized Vehicle',
    nameGeo: 'გაბარიტული',
    category: 'premium',
    multiplier: 1.5,
    dimensions: {
      length: 'Over 20 ft',
      width: 'Over 7 ft',
      height: 'Over 8 ft',
      weight: 'Over 7,000 lbs'
    },
    examples: ['RV', 'Large Truck', 'Construction Vehicle'],
    icon: '🚛'
  }
];

const conditionMultipliers = {
  running: 1.0,        // მუშა მდგომარეობაში
  nonRunning: 1.15,    // არამუშა
  damaged: 1.25        // დაზიანებული
};

const transportTypeMultipliers = {
  open: 1.0,          // ღია ტრანსპორტი
  enclosed: 1.4       // დახურული ტრანსპორტი
};

interface VehicleTypeSelectorProps {
  onPriceChange: (price: number, details: PriceDetails) => void;
  basePrice?: number;
}

interface PriceDetails {
  vehicleType: VehicleType;
  condition: keyof typeof conditionMultipliers;
  transportType: keyof typeof transportTypeMultipliers;
  breakdown: {
    basePrice: number;
    vehicleMultiplier: number;
    conditionMultiplier: number;
    transportMultiplier: number;
    totalPrice: number;
  };
}

export default function VehicleTypeSelector({ onPriceChange, basePrice = 1500 }: VehicleTypeSelectorProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('sedan');
  const [selectedCondition, setSelectedCondition] = useState<keyof typeof conditionMultipliers>('running');
  const [selectedTransport, setSelectedTransport] = useState<keyof typeof transportTypeMultipliers>('open');

  const calculateAndNotify = (vehicleId: string, condition: keyof typeof conditionMultipliers, transport: keyof typeof transportTypeMultipliers) => {
    const vehicleType = vehicleTypes.find(v => v.id === vehicleId);
    if (!vehicleType) return;

    const vehicleMultiplier = vehicleType.multiplier;
    const conditionMultiplier = conditionMultipliers[condition];
    const transportMultiplier = transportTypeMultipliers[transport];
    
    const totalPrice = Math.round(basePrice * vehicleMultiplier * conditionMultiplier * transportMultiplier);
    
    const details: PriceDetails = {
      vehicleType,
      condition,
      transportType: transport,
      breakdown: {
        basePrice,
        vehicleMultiplier,
        conditionMultiplier,
        transportMultiplier,
        totalPrice
      }
    };

    onPriceChange(totalPrice, details);
  };

  const handleVehicleChange = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    calculateAndNotify(vehicleId, selectedCondition, selectedTransport);
  };

  const handleConditionChange = (condition: keyof typeof conditionMultipliers) => {
    setSelectedCondition(condition);
    calculateAndNotify(selectedVehicle, condition, selectedTransport);
  };

  const handleTransportChange = (transport: keyof typeof transportTypeMultipliers) => {
    setSelectedTransport(transport);
    calculateAndNotify(selectedVehicle, selectedCondition, transport);
  };

  React.useEffect(() => {
    calculateAndNotify(selectedVehicle, selectedCondition, selectedTransport);
  }, [basePrice]);

  const selectedVehicleType = vehicleTypes.find(v => v.id === selectedVehicle);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Vehicle Type & Options</h3>
        <p className="text-gray-600">Select your vehicle details for accurate pricing</p>
      </div>

      {/* Vehicle Type Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800">Vehicle Type</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {vehicleTypes.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => handleVehicleChange(vehicle.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedVehicle === vehicle.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="text-2xl mb-2">{vehicle.icon}</div>
              <div className="text-sm font-medium">{vehicle.nameGeo}</div>
              <div className="text-xs text-gray-500 mt-1">
                {vehicle.multiplier === 1.0 ? 'Standard' : `+${Math.round((vehicle.multiplier - 1) * 100)}%`}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Condition */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800">Vehicle Condition</h4>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleConditionChange('running')}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedCondition === 'running'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-sm font-medium">მუშა</div>
            <div className="text-xs text-gray-500">Standard</div>
          </button>
          <button
            onClick={() => handleConditionChange('nonRunning')}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedCondition === 'nonRunning'
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-sm font-medium">არამუშა</div>
            <div className="text-xs text-gray-500">+15%</div>
          </button>
          <button
            onClick={() => handleConditionChange('damaged')}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedCondition === 'damaged'
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-sm font-medium">დაზიანებული</div>
            <div className="text-xs text-gray-500">+25%</div>
          </button>
        </div>
      </div>

      {/* Transport Type */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800">Transport Type</h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleTransportChange('open')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedTransport === 'open'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-lg mb-2">🚛</div>
            <div className="text-sm font-medium">ღია ტრანსპორტი</div>
            <div className="text-xs text-gray-500 mt-1">Standard price</div>
          </button>
          <button
            onClick={() => handleTransportChange('enclosed')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedTransport === 'enclosed'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-lg mb-2">🚐</div>
            <div className="text-sm font-medium">დახურული ტრანსპორტი</div>
            <div className="text-xs text-gray-500 mt-1">+40% (Premium)</div>
          </button>
        </div>
      </div>

      {/* Selected Vehicle Details */}
      {selectedVehicleType && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h5 className="font-semibold text-gray-800">Vehicle Specifications</h5>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Length:</span> {selectedVehicleType.dimensions.length}
            </div>
            <div>
              <span className="text-gray-600">Width:</span> {selectedVehicleType.dimensions.width}
            </div>
            <div>
              <span className="text-gray-600">Height:</span> {selectedVehicleType.dimensions.height}
            </div>
            <div>
              <span className="text-gray-600">Weight:</span> {selectedVehicleType.dimensions.weight}
            </div>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Examples:</span> {selectedVehicleType.examples.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
}