// src/data/car_data.ts - Enhanced with vehicle types

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
  status: string;
  location: string;
  estimatedArrival?: string;

  // ახალი ველები შტატების მონაცემებისთვის
  usState: string; // State code მაგ: "CA", "TX", "FL"
  auctionLocation: string; // მაგ: "Copart Los Angeles"
  lotNumber?: string; // აუქციონის ლოტის ნომერი
  transportCost?: number; // ტრანსპორტირების ღირებულება (გამოითვლება)

  // ახალი ველები vehicle type-ისთვის
  vehicleType: string;
  condition: string;
  transportType?: "open" | "enclosed";
}

//  vehicle type-ებით
export const carsData: Car[] = [
  {
    id: "1",
    make: "Jeep",
    model: "Wrangler LJ",
    year: 2020,
    price: 38000,
    originalPrice: 42000,
    images: [
      "https://i.pinimg.com/1200x/fc/82/7c/fc827cb630c7167db753b4eabd907006.jpg",
      "https://i.pinimg.com/1200x/6e/4b/0e/6e4b0efe2229a4f9bce8bca5ad0c8062.jpg",
      "https://i.pinimg.com/736x/eb/91/48/eb91483d9861324509f96e512e2efeda.jpg",
    ],
    description:
      "Jeep Wrangler LJ 2020 შესანიშნავ მდგომარეობაში. იდეალური ოფფროუდისა და ქალაქისთვის. რეგულარულად მოვლილი და სრული დოკუმენტაციით.",
    mileage: 32000,
    engine: "3.6L V6",
    transmission: "Automatic",
    fuelType: "ბენზინი",
    color: "შავი",
    vin: "1C4HJXDG0LW123456",
    rating: 4.9,
    reviews: 210,
    inStock: true,
    status: "ბაზარზე",
    location: "თბილისი, ავტო ბაზრობა",
    usState: "TX", // ტეხასი
    auctionLocation: "Copart Houston",
    lotNumber: "56293741",
    vehicleType: "suv",
    condition: "running",
  },

  {
    id: "2",
    make: "Ford",
    model: "F-350",
    year: 2023,
    price: 48500,
    images: [
      "https://i.pinimg.com/1200x/d4/7e/dc/d47edc91714384076c5af59178fc1122.jpg", // Ford F-350
      "https://i.pinimg.com/1200x/06/d4/71/06d471c1ef88888a3eb0be9282404073.jpg",
      "https://i.pinimg.com/1200x/a0/e4/9e/a0e49e1ecdbb2497a21324ce1fdb9eda.jpg",
    ],
    description:
      "ძლიერი Ford F-350 Super Duty 2023. Heavy Duty მუშაობისთვის და მძიმე ტვირთების ტრანსპორტირებისთვის.",
    mileage: 15000,
    engine: "6.7L Power Stroke V8 Diesel",
    transmission: "10-Speed Automatic",
    fuelType: "დიზელი",
    color: "თეთრი",
    vin: "1FT8W3BT0PEA12345",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    status: "გზაში",
    location: "ტრანსპორტირების პროცესში",
    estimatedArrival: "2025-02-18",
    usState: "TX", // ტეხასი
    auctionLocation: "IAA Dallas",
    lotNumber: "35896741",
    vehicleType: "pickup",
    condition: "running",
  },
  {
    id: "3",
    make: "BMW",
    model: "X5",
    year: 2020,
    price: 45000,
    originalPrice: 48000,
    images: [
      "https://i.pinimg.com/736x/b7/e9/61/b7e961cf1567e7a7a6bbccc80d9f4264.jpg", // BMW X5
      "https://i.pinimg.com/1200x/a2/8d/cc/a28dcc546618d28f90404a287b30cc6a.jpg", // BMW X5 პროფილი
    ],
    description:
      "პრემიუმ კლასის BMW X5. ყველა ოფციით, შესანიშნავ მდგომარეობაში.",
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
    usState: "FL", 
    auctionLocation: "Copart Miami",
    lotNumber: "67234891",
    vehicleType: "suv",
    condition: "running",
  },
  {
    id: "4",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2023,
    price: 38000,
    images: [
      "https://i.pinimg.com/1200x/e6/1e/b1/e61eb192382ea2dd4e39c839bfe00e00.jpg",
      "https://i.pinimg.com/736x/4f/02/cd/4f02cdaeb733742f64f0b25f112d7846.jpg",
    ],
    description:
      "ყველაზე ახალი მოდელის Mercedes-Benz C-Class. ლუქსუს და კომფორტი ერთად.",
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
    lotNumber: "89456123",
    vehicleType: "luxury",
    condition: "running",
  },
  {
    id: "5",
    make: "Audi",
    model: "Q7",
    year: 2021,
    price: 42000,
    originalPrice: 45000,
    images: [
      "https://i.pinimg.com/736x/41/70/b5/4170b53c574ed489c09541f061783c6c.jpg", // Audi Q7
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
    usState: "NJ", 
    auctionLocation: "Copart Trenton",
    lotNumber: "12367845",
    vehicleType: "suv",
    condition: "running",
  },
  {
    id: "6",
    make: "Toyota",
    model: "86",
    year: 2017,
    price: 28500,
    images: [
      "https://i.pinimg.com/736x/f5/95/02/f59502c31f3b13d589ea813f54b68a56.jpg", // Toyota 86 wide-body
    ],
    description:
      "Toyota 86 (GT86 / Subaru BRZ) wide-body მოდიფიკაციით. სპორტული კუპე, დაბალი პროფილით და ტიუნინგ კულტურის სტილში.",
    mileage: 42000,
    engine: "2.0L 4-Cylinder Boxer",
    transmission: "6-Speed Manual",
    fuelType: "ბენზინი",
    color: "მეტალიკური იისფერი",
    vin: "JF1ZNAA16H8701234",
    rating: 4.7,
    reviews: 98,
    inStock: true,
    status: "ხელმისაწვდომი",
    location: "Los Angeles, CA",
    estimatedArrival: "2025-02-20",
    usState: "CA",
    auctionLocation: "Copart Los Angeles",
    lotNumber: "47283920",
    vehicleType: "luxury",
    condition: "running",
  },

  {
    id: "7",
    make: "Toyota",
    model: "Supra",
    year: 2021,
    price: 55000,
    originalPrice: 58000,
    images: [
      "https://i.pinimg.com/1200x/7a/5a/5a/7a5a5a67de34529006c2781d4e01f0ae.jpg", // Toyota Supra
      "https://i.pinimg.com/1200x/b6/37/5e/b6375e1c95e5abed5fbf81322a2dd647.jpg",
    ],
    description:
      "ლეგენდარული Toyota Supra 2021. კლასიკური იაპონური სპორტული მანქანა უახლესი ტექნოლოგიებით.",
    mileage: 18000,
    engine: "3.0L Twin Turbo I6",
    transmission: "8-Speed Automatic",
    fuelType: "ბენზინი",
    color: "ღია ლურჯი",
    vin: "JM1NBAPF5M0123456",
    rating: 4.9,
    reviews: 189,
    inStock: true,
    status: "ბაზარზე",
    location: "რუსთავი, ავტობაზარი",
    usState: "CA", 
    auctionLocation: "Copart Los Angeles",
    lotNumber: "78451236",
    vehicleType: "luxury",
    condition: "running",
  },
  {
    id: "8",
    make: "Porsche",
    model: "911 Carrera (Base)",
    year: 2024,
    price: 114400,
    images: [
      "https://hips.hearstapps.com/hmg-prod/images/2024-porsche-911-gt3-rs-138-64ecda037334a.jpg?crop=0.628xw:0.529xh;0.176xw,0.281xh&resize=2048:*", // შესაბამისად ჩასვით შესაბამისი ფოტო
    ],
    description:
      "Base model of the 2024 Porsche 911 Carrera. Turbocharged 3.0 L flat-6 engine, 379 hp, classic rear-engine layout with refined sports-car luxury.",
    mileage: 1000,
    engine: "3.0L twin-turbocharged flat-6",
    transmission: "8-Speed PDK (dual-clutch automatic)",
    fuelType: "ბენზინი (premium unleaded)",
    color: "ყვითელი",
    vin: "WA3VAAF77MD126458",
    rating: 4.9,
    reviews: 356,
    inStock: true,
    status: "ძირითადი მოდელი",
    location: "Los Angeles, CA",
    estimatedArrival: "2025-10-15",
    usState: "CA",
    auctionLocation: "Copart Los Angeles",
    lotNumber: "123456787",
    vehicleType: "luxury",
    condition: "nonRunning",
  },
  ,
  {
    id: "9",
    make: "Harley-Davidson",
    model: "Street Glide",
    year: 2019,
    price: 18000,
    images: [
      "https://i.pinimg.com/1200x/4f/a9/6e/4fa96e0c072fab6e9441382068cf7e7e.jpg", // Harley-Davidson
      "https://i.pinimg.com/1200x/c7/cd/cc/c7cdcc351908877bedf7062b2c6c4965.jpg",
    ],
    description: "კლასიკური ამერიკული მოტოციკლი. შესანიშნავ მდგომარეობაში.",
    mileage: 15000,
    engine: "Milwaukee-Eight 107",
    transmission: "6-Speed",
    fuelType: "ბენზინი",
    color: "შავი",
    vin: "1HD1KBC19KB123456",
    rating: 4.9,
    reviews: 67,
    inStock: true,
    status: "ბაზარზე",
    location: "რუსთავი, ავტობაზარი",
    usState: "AZ", // არიზონა
    auctionLocation: "Copart Phoenix",
    lotNumber: "98765432",
    vehicleType: "motorcycle",
    condition: "running",
  },
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
