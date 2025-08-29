export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  status: "გზაში" | "ბაზარზე" | "გაყიდული";
  location: "ამერიკა" | "რუსთავის ბაზარი";
  mileage: number;
  engine: string;
  transmission: "ავტომატური" | "მექანიკური";
  fuelType: "ბენზინი" | "დიზელი" | "ჰიბრიდი" | "ელექტრო";
  color: string;
  features: string[];
  damage?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  estimatedArrival?: string;
  vin?: string;
  importInfo: {
    auctionSite: string;
    purchaseDate: string;
    shippingStatus: string;
  };
}
export const carsData: Car[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    price: 28500,
    originalPrice: 32000,
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop",
    ],
    description:
      "განსაკუთრებულად კარგ მდგომარეობაში Toyota Camry 2020 წელი. ეკონომიური, საიმედო და კომფორტული სედანი ოჯახისთვის.",
    status: "ბაზარზე",
    location: "რუსთავის ბაზარი",
    mileage: 45000,
    engine: "2.5L 4-Cylinder",
    transmission: "ავტომატური",
    fuelType: "ბენზინი",
    color: "ვერცხლისფერი",
    features: [
      "Toyota Safety Sense 2.0",
      "ტაჩსკრინი 8 ინჩი",
      "უკუსვლის კამერა",
      "ბლუთუს კავშირი",
      "LED ფარები",
      "გაცხელება სავარძლებისა",
    ],
    rating: 4.8,
    reviews: 142,
    inStock: true,
    vin: "4T1B11HK9LU123456",
    importInfo: {
      auctionSite: "Copart",
      purchaseDate: "2024-12-15",
      shippingStatus: "მიღებული",
    },
  },
  {
    id: "2",
    make: "Honda",
    model: "Accord",
    year: 2019,
    price: 26800,
    originalPrice: 29500,
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&h=600&fit=crop",
    ],
    description:
      "Honda Accord 2019, მშვენიერი მდგომარეობით. ეკონომიური ხარჯვა, სრული კომფორტი და უსაფრთხოება.",
    status: "გზაში",
    location: "ამერიკა",
    mileage: 52000,
    engine: "1.5L Turbo",
    transmission: "ავტომატური",
    fuelType: "ბენზინი",
    color: "შავი",
    features: [
      "Honda Sensing",
      "Apple CarPlay",
      "Android Auto",
      "მონიტორი 8 ინჩი",
      "ხმის კონტროლი",
    ],
    damage: "მცირე ზიანი უკანა ბამპერზე",
    rating: 4.6,
    reviews: 89,
    inStock: false,
    estimatedArrival: "2025-09-15",
    importInfo: {
      auctionSite: "IAA",
      purchaseDate: "2024-08-20",
      shippingStatus: "გაგზავნილი",
    },
  },
  {
    id: "3",
    make: "BMW",
    model: "X5",
    year: 2021,
    price: 45000,
    originalPrice: 52000,
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop",
    ],
    description:
      "ლუქსუს BMW X5 2021, სრული კომპლექტაცია. ძლიერი ძრავა, პრემიუმ ინტერიერი და თანამედროვე ტექნოლოგიები.",
    status: "ბაზარზე",
    location: "რუსთავის ბაზარი",
    mileage: 28000,
    engine: "3.0L TwinPower Turbo",
    transmission: "ავტომატური",
    fuelType: "ბენზინი",
    color: "ღია ცისფერი",
    features: [
      "xDrive AWD",
      "Panoramic Roof",
      "Harman Kardon Audio",
      "Navigation System",
      "Heated Seats",
      "360° Camera",
    ],
    rating: 4.9,
    reviews: 67,
    inStock: true,
    vin: "5UX23EU00M9123456",
    importInfo: {
      auctionSite: "Manheim",
      purchaseDate: "2024-11-10",
      shippingStatus: "მიღებული",
    },
  },
  {
    id: "4",
    make: "Ford",
    model: "F-150",
    year: 2022,
    price: 38500,
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
    ],
    description:
      "ძლიერი Ford F-150 2022 წელი. იდეალური სამუშაო და ოჯახური მანქანა, ყველაზე პოპულარული პიკაპი ამერიკაში.",
    status: "გზაში",
    location: "ამერიკა",
    mileage: 15000,
    engine: "3.5L EcoBoost V6",
    transmission: "ავტომატური",
    fuelType: "ბენზინი",
    color: "წითელი",
    features: [
      "4WD",
      "Ford Co-Pilot360",
      "SYNC 4A",
      "Pro Power Onboard",
      "Trailer Assist",
    ],
    rating: 4.7,
    reviews: 203,
    inStock: false,
    estimatedArrival: "2025-09-25",
    importInfo: {
      auctionSite: "Copart",
      purchaseDate: "2024-08-28",
      shippingStatus: "კონტეინერში",
    },
  },
  {
    id: "5",
    make: "Tesla",
    model: "Model 3",
    year: 2021,
    price: 42000,
    originalPrice: 48000,
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop",
    ],
    description:
      "ინოვაციური Tesla Model 3 - ელექტრო მანქანა მომავლისთვის. ავტონომიური მართვა, გრძელი მანძილი, ზერო ემისია.",
    status: "ბაზარზე",
    location: "რუსთავის ბაზარი",
    mileage: 32000,
    engine: "Electric Motor",
    transmission: "ავტომატური",
    fuelType: "ელექტრო",
    color: "თეთრი",
    features: [
      "Autopilot",
      "Supercharger Access",
      "Premium Interior",
      "15-inch Touchscreen",
      "Glass Roof",
      "Mobile Connector",
    ],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    vin: "5YJ3E1EA8MF123456",
    importInfo: {
      auctionSite: "Tesla Direct",
      purchaseDate: "2024-10-05",
      shippingStatus: "მიღებული",
    },
  },
];
