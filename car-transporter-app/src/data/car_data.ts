// src/data/car_data.ts განახლებული Car interface

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  mileage: number;
  engine: string;
  transmission: string;
  fuelType: string;
  color: string;
  vin: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  status: "ბაზარზე" | "გზაში" | "გაყიდული";
  location: string;
  estimatedArrival?: string;
  
  // ახალი ველები შტატების მონაცემებისთვის
  usState: string; // State code მაგ: "CA", "TX", "FL"
  auctionLocation: string; // მაგ: "Copart Los Angeles"
  lotNumber?: string; // აუქციონის ლოტის ნომერი
  transportCost?: number; // ტრანსპორტირების ღირებულება (გამოითვლება)
}

// მაგალითი განახლებული მონაცემები
export const carsData: Car[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    price: 25000,
    originalPrice: 28000,
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&h=300&fit=crop"
    ],
    description: "განსაკუთრებით კარგ მდგომარეობაში Toyota Camry. რეგულარული ტექნიკური მომსახურება, ყველა დოკუმენტი ხელთაა.",
    mileage: 45000,
    engine: "2.5L 4-Cylinder",
    transmission: "CVT",
    fuelType: "ბენზინი",
    color: "ვერცხლისფერი",
    vin: "4T1G11AK8NU123456",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    status: "ბაზარზე",
    location: "რუსთავი, ავტობაზარი",
    usState: "CA", // კალიფორნია
    auctionLocation: "Copart Los Angeles",
    lotNumber: "45782659"
  },
  {
    id: "2", 
    make: "Honda",
    model: "Accord",
    year: 2021,
    price: 23500,
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop"
    ],
    description: "ეკონომიური და საიმედო Honda Accord. იდეალურია ყოველდღიური გამოყენებისთვის.",
    mileage: 38000,
    engine: "1.5L Turbo",
    transmission: "CVT",
    fuelType: "ბენზინი",
    color: "თეთრი",
    vin: "1HGCV1F30MA123456",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    status: "გზაში",
    location: "ტრანსპორტირების პროცესში",
    estimatedArrival: "2025-02-15",
    usState: "TX", // ტეხასი
    auctionLocation: "IAA Dallas",
    lotNumber: "35896741"
  },
  {
    id: "3",
    make: "BMW",
    model: "X5",
    year: 2020,
    price: 45000,
    originalPrice: 48000,
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop"
    ],
    description: "პრემიუმ კლასის BMW X5. ყველა ოფციით, შესანიშნავ მდგომარეობაში.",
    mileage: 52000,
    engine: "3.0L Twin Turbo",
    transmission: "8-Speed Automatic",
    fuelType: "ბენზინი",
    color: "შავი",
    vin: "5UXCR6C04L1234567",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    status: "ბაზარზე",
    location: "რუსთავი, ავტობაზარი",
    usState: "FL", // ფლორიდა
    auctionLocation: "Copart Miami",
    lotNumber: "67234891"
  },
  {
    id: "4",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2023,
    price: 38000,
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop"
    ],
    description: "ყველაზე ახალი მოდელის Mercedes-Benz C-Class. ლუქსუს და კომფორტი ერთად.",
    mileage: 12000,
    engine: "2.0L Turbo",
    transmission: "9-Speed Automatic", 
    fuelType: "ბენზინი",
    color: "ბუნებრივი ზღვისფერი",
    vin: "55SWF4KB5PU123456",
    rating: 4.7,
    reviews: 67,
    inStock: false,
    status: "გზაში",
    location: "ტრანსპორტირების პროცესში",
    estimatedArrival: "2025-02-20",
    usState: "NY", // ნიუ-იორკი
    auctionLocation: "Manheim New York",
    lotNumber: "89456123"
  },
  {
    id: "5",
    make: "Audi",
    model: "Q7",
    year: 2021,
    price: 42000,
    originalPrice: 45000,
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop"
    ],
    description: "სპორტული დიზაინის Audi Q7. 7 ადგილიანი, ოჯახისთვის იდეალური.",
    mileage: 41000,
    engine: "3.0L V6 Supercharged",
    transmission: "8-Speed Automatic",
    fuelType: "ბენზინი", 
    color: "რუხი",
    vin: "WA1VAAF77MD123456",
    rating: 4.5,
    reviews: 134,
    inStock: true,
    status: "ბაზარზე",
    location: "რუსთავი, ავტობაზარი",
    usState: "NJ", // ნიუ-ჯერსი
    auctionLocation: "Copart Trenton",
    lotNumber: "12367845"
  },
  {
    id: "6",
    make: "Lexus",
    model: "RX",
    year: 2022,
    price: 40000,
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=300&fit=crop"
    ],
    description: "ყველაზე საიმედო ლუქსუს SUV. Lexus RX თავისი მაღალი ხარისხითა და კომფორტით.",
    mileage: 28000,
    engine: "3.5L V6",
    transmission: "8-Speed Automatic",
    fuelType: "ბენზინი",
    color: "მუქი ნაცრისფერი",
    vin: "2T2BZMCA8NC123456",
    rating: 4.8,
    reviews: 178,
    inStock: true,
    status: "ბაზარზე", 
    location: "რუსთავი, ავტობაზარი",
    usState: "PA", // პენსილვანია
    auctionLocation: "Manheim Pennsylvania",
    lotNumber: "98745632"
  }
];

// Helper function ტრანსპორტირების ღირებულების გამოსათვლელად
export function getCarWithTransportCost(car: Car) {
  // imports states_transport.ts-დან
  // const { calculateTransportCost } = require('./states_transport');
  // const transportInfo = calculateTransportCost(car.usState, car.price);
  
  return {
    ...car,
    // transportCost: transportInfo.transportCost,
    // totalCostWithTransport: transportInfo.totalCost
  };
}