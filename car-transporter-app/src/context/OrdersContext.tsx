// src/context/OrdersContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { type Car } from '../data/car_data';

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

// Sample orders data
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
          images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop"],
          description: "Toyota Camry 2020",
          status: "ბაზარზე",
          location: "რუსთავის ბაზარი",
          mileage: 45000,
          engine: "2.5L 4-Cylinder",
          transmission: "ავტომატური",
          fuelType: "ბენზინი",
          color: "ვერცხლისფერი",
          features: ["Toyota Safety Sense 2.0"],
          rating: 4.8,
          reviews: 142,
          inStock: true,
          vin: "4T1B11HK9LU123456",
          importInfo: {
            auctionSite: "Copart",
            purchaseDate: "2024-12-15",
            shippingStatus: "მიღებული"
          }
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
    totalAmount: 28500,
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
          images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop"],
          description: "BMW X5 2021",
          status: "ბაზარზე",
          location: "რუსთავის ბაზარი",
          mileage: 28000,
          engine: "3.0L TwinPower Turbo",
          transmission: "ავტომატური",
          fuelType: "ბენზინი",
          color: "ღია ცისფერი",
          features: ["xDrive AWD"],
          rating: 4.9,
          reviews: 67,
          inStock: true,
          vin: "5UX23EU00M9123456",
          importInfo: {
            auctionSite: "Manheim",
            purchaseDate: "2024-11-10",
            shippingStatus: "მიღებული"
          }
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
    totalAmount: 45000,
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