// src/data/vehicle_pricing.ts

export interface VehicleType {
  id: string;
  name: string;
  nameGeo: string;
  category: 'standard' | 'large' | 'premium';
  multiplier: number; // base price-ზე multiplication factor
  dimensions: {
    length: string;
    width: string;
    height: string;
    weight: string;
  };
  examples: string[];
  icon: string;
}

export const vehicleTypes: VehicleType[] = [
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

// Transport condition multipliers
export const conditionMultipliers = {
  running: 1.0,        // მუშა მდგომარეობაში
  nonRunning: 1.15,    // არამუშა
  damaged: 1.25        // დაზიანებული
};

// Transport type multipliers  
export const transportTypeMultipliers = {
  open: 1.0,          // ღია ტრანსპორტი
  enclosed: 1.4       // დახურული ტრანსპორტი
};

// Helper function to calculate total price with all multipliers
export function calculateVehiclePrice(
  basePrice: number,
  vehicleTypeId: string,
  condition: keyof typeof conditionMultipliers = 'running',
  transportType: keyof typeof transportTypeMultipliers = 'open'
): number {
  const vehicleType = vehicleTypes.find(v => v.id === vehicleTypeId);
  if (!vehicleType) return basePrice;

  const vehicleMultiplier = vehicleType.multiplier;
  const conditionMultiplier = conditionMultipliers[condition];
  const transportMultiplier = transportTypeMultipliers[transportType];

  return Math.round(basePrice * vehicleMultiplier * conditionMultiplier * transportMultiplier);
}

export function getVehicleTypeById(id: string): VehicleType | undefined {
  return vehicleTypes.find(v => v.id === id);
}