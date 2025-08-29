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