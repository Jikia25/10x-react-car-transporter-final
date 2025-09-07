// src/context/OrdersContext.tsx - Fixed to match updated Car interface
import { createContext, useContext, useState, type ReactNode } from 'react';

// Updated Car interface to match our enhanced car_data.ts
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
  
  // ახალი ველები vehicle type-ისთვის
  vehicleType: 'sedan' | 'suv' | 'pickup' | 'luxury' | 'van' | 'motorcycle' | 'oversized';
  condition: 'running' | 'nonRunning' | 'damaged';
  transportType?: 'open' | 'enclosed';
}

export interface OrderItem {
  car: Car;
  quantity: number;
  price: number; // Price at time of purchase
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  totalAmount: number;
  currency: 'USD' | 'GEL';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'orderDate'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

// Sample orders data with updated Car structure
const sampleOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    items: [
      {
        car: {
          id: "1",
          make: "Toyota",
          model: "Camry",
          year: 2020,
          price: 28500,
          originalPrice: 30000,
          images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop"],
          description: "განსაკუთრებით კარგ მდგომარეობაში Toyota Camry. რეგულარული ტექნიკური მომსახურება, ყველა დოკუმენტი ხელთაა.",
          mileage: 45000,
          engine: "2.5L 4-Cylinder",
          transmission: "CVT",
          fuelType: "ბენზინი",
          color: "ვერცხლისფერი",
          vin: "4T1B11HK9LU123456",
          rating: 4.8,
          reviews: 142,
          inStock: true,
          status: "ბაზარზე",
          location: "რუსთავი, ავტობაზარი",
          usState: "CA",
          auctionLocation: "Copart Los Angeles",
          lotNumber: "45782659",
          vehicleType: 'sedan',
          condition: 'running',
          transportType: 'open',
          transportCost: 1650
        },
        quantity: 1,
        price: 28500
      }
    ],
    shippingInfo: {
      fullName: "ქრისტინა ჯიქია",
      email: "kristina@example.com",
      phone: "+995 555 123 456",
      address: "რუსთაველის გამზირი 25",
      city: "თბილისი",
      zipCode: "0108"
    },
    totalAmount: 30150, // Car price + transport cost
    currency: "USD",
    status: "delivered",
    orderDate: "2024-12-01T10:30:00Z",
    trackingNumber: "TRK123456789"
  },
  {
    id: "2", 
    orderNumber: "ORD-2024-002",
    items: [
      {
        car: {
          id: "2",
          make: "BMW",
          model: "X5",
          year: 2021,
          price: 45000,
          originalPrice: 48000,
          images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop"],
          description: "პრემიუმ კლასის BMW X5. ყველა ოფციით, შესანიშნავ მდგომარეობაში.",
          mileage: 28000,
          engine: "3.0L Twin Turbo",
          transmission: "8-Speed Automatic",
          fuelType: "ბენზინი",
          color: "შავი",
          vin: "5UX23EU00M9123456",
          rating: 4.9,
          reviews: 67,
          inStock: true,
          status: "გზაში",
          location: "ტრანსპორტირების პროცესში",
          estimatedArrival: "2025-02-20",
          usState: "FL",
          auctionLocation: "Copart Miami",
          lotNumber: "67234891",
          vehicleType: 'suv',
          condition: 'running',
          transportType: 'enclosed',
          transportCost: 2100
        },
        quantity: 1,
        price: 45000
      }
    ],
    shippingInfo: {
      fullName: "ქრისტინა ჯიქია",
      email: "kristina@example.com", 
      phone: "+995 555 123 456",
      address: "რუსთაველის გამზირი 25",
      city: "თბილისი",
      zipCode: "0108"
    },
    totalAmount: 47100, // Car price + transport cost
    currency: "USD",
    status: "processing",
    orderDate: "2024-12-20T14:20:00Z",
    estimatedDelivery: "2025-01-15"
  }
];

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  const addOrder = (newOrder: Omit<Order, 'id' | 'orderNumber' | 'orderDate'>) => {
    const order: Order = {
      ...newOrder,
      id: Date.now().toString(),
      orderNumber: `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
      orderDate: new Date().toISOString()
    };
    
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrdersContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      getOrderById
    }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}