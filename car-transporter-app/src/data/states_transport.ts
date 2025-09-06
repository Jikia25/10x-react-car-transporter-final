// src/data/states_transport.ts

export interface USState {
  code: string;
  name: string;
  georgianName: string;
  transportCostToGeorgia: number; // USD
  estimatedDays: number;
  popularAuctions: string[];
}

export const US_STATES: USState[] = [
  {
    code: "CA",
    name: "California",
    georgianName: "კალიფორნია", 
    transportCostToGeorgia: 1850,
    estimatedDays: 21,
    popularAuctions: ["Copart", "IAA"]
  },
  {
    code: "TX",
    name: "Texas", 
    georgianName: "ტეხასი",
    transportCostToGeorgia: 1650,
    estimatedDays: 18,
    popularAuctions: ["Copart", "IAA"]
  },
  {
    code: "FL",
    name: "Florida",
    georgianName: "ფლორიდა",
    transportCostToGeorgia: 1750,
    estimatedDays: 19,
    popularAuctions: ["Copart", "IAA", "Manheim"]
  },
  {
    code: "NY",
    name: "New York",
    georgianName: "ნიუ-იორკი", 
    transportCostToGeorgia: 1950,
    estimatedDays: 22,
    popularAuctions: ["Copart", "Manheim"]
  },
  {
    code: "NJ",
    name: "New Jersey",
    georgianName: "ნიუ-ჯერსი",
    transportCostToGeorgia: 1900,
    estimatedDays: 21,
    popularAuctions: ["Copart", "IAA"]
  },
  {
    code: "PA",
    name: "Pennsylvania", 
    georgianName: "პენსილვანია",
    transportCostToGeorgia: 1800,
    estimatedDays: 20,
    popularAuctions: ["Copart", "Manheim"]
  },
  {
    code: "OH",
    name: "Ohio",
    georgianName: "ოჰაიო",
    transportCostToGeorgia: 1700,
    estimatedDays: 19,
    popularAuctions: ["Copart", "IAA"]
  },
  {
    code: "IL",
    name: "Illinois", 
    georgianName: "ილინოისი",
    transportCostToGeorgia: 1750,
    estimatedDays: 20,
    popularAuctions: ["Copart", "Manheim"]
  },
  {
    code: "AZ",
    name: "Arizona",
    georgianName: "არიზონა",
    transportCostToGeorgia: 1600,
    estimatedDays: 18,
    popularAuctions: ["Copart", "IAA"]
  },
  {
    code: "NV",
    name: "Nevada",
    georgianName: "ნევადა", 
    transportCostToGeorgia: 1700,
    estimatedDays: 19,
    popularAuctions: ["Copart", "IAA"]
  },
  {
    code: "NC",
    name: "North Carolina",
    georgianName: "ჩრდილოეთ კაროლინა",
    transportCostToGeorgia: 1550,
    estimatedDays: 17,
    popularAuctions: ["Copart", "IAA"]
  },
  {
    code: "GA",
    name: "Georgia (US)",
    georgianName: "ჯორჯია (აშშ)", 
    transportCostToGeorgia: 1450,
    estimatedDays: 16,
    popularAuctions: ["Copart", "IAA", "Manheim"]
  }
];

// Helper function to get state by code
export function getStateByCode(code: string): USState | undefined {
  return US_STATES.find(state => state.code === code);
}

// Helper function to calculate total transport cost
export function calculateTransportCost(stateCode: string, carPrice: number): {
  transportCost: number;
  totalCost: number;
  estimatedDays: number;
  stateName: string;
} {
  const state = getStateByCode(stateCode);
  
  if (!state) {
    return {
      transportCost: 1700, // default cost
      totalCost: carPrice + 1700,
      estimatedDays: 20,
      stateName: "Unknown State"
    };
  }

  return {
    transportCost: state.transportCostToGeorgia,
    totalCost: carPrice + state.transportCostToGeorgia,
    estimatedDays: state.estimatedDays,
    stateName: state.georgianName
  };
}