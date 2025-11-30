
# 🚗 Car Transporter App

> Modern car import and transport management platform connecting US vehicle markets with Georgian buyers

A full-featured web application for browsing, selecting, and managing vehicle imports from the United States to Georgia. Built with React, TypeScript, and modern web technologies.

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.12-38B2AC.svg)](https://tailwindcss.com/)

## ✨ Features

### 🔐 User Management
- **Multi-role Authentication**: Individual buyers, dealers, and shipping companies
- **Profile-based Experience**: Customized interface based on user type
- **Protected Routes**: Secure dashboard and checkout flows

### 🚙 Vehicle Marketplace
- **Advanced Search**: Filter by VIN, make, model, year, price, mileage, and more
- **24 US State Coverage**: Vehicles from major US markets
- **Real-time Inventory**: Browse available vehicles with detailed specifications
- **Vehicle Details**: Comprehensive information including dimensions, fuel type, transmission

### 💰 Smart Pricing
- **Multi-Currency Support**: USD ↔ GEL conversion (1 USD = 2.7 GEL)
- **Transport Calculator**: Automatic cost estimation based on origin state
- **Vehicle Type Pricing**: Differential pricing for sedans, SUVs, trucks, motorcycles
- **Condition-based Adjustments**: Pricing for running, non-running, and damaged vehicles

### 🛒 E-Commerce Features
- **Shopping Cart**: Add/remove vehicles, manage quantities
- **Checkout Flow**: Streamlined purchase process
- **Order Tracking**: Dashboard for order history and status

### 🌍 Bilingual Interface
- Georgian (ქართული) primary
- English secondary
- Localized currency and measurements

## 🛠️ Tech Stack

**Frontend Framework:**
- React 19.2.0 with TypeScript
- React Router v7 for navigation
- Context API for state management

**Styling:**
- Tailwind CSS v4.1 (latest)
- Responsive mobile-first design
- Custom Georgian font support

**Build Tools:**
- Vite 7 for blazing fast development
- ESBuild for optimized production builds
- ESLint + TypeScript ESLint for code quality

**Development:**
- TypeScript 5.8 with strict mode
- Hot Module Replacement (HMR)
- Modern ES2022+ syntax

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── AdvancedSearchModal.tsx
│   ├── VehicleTypeSelector.tsx
│   ├── TransportCostCalculator.tsx
│   ├── ContactForm.tsx
│   └── ...
├── context/            # React Context providers
│   ├── CartContext.tsx
│   ├── CurrencyContext.tsx
│   ├── OrdersContext.tsx
│   └── UserContext.tsx
├── pages/              # Route components
│   ├── MainPage.tsx
│   ├── ShopPage.tsx
│   ├── ProductDetails.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── Dashboard.tsx
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
├── data/               # Static data and types
│   ├── car_data.ts
│   ├── states_transport.ts
│   └── vehicle_pricing.ts
├── App.tsx             # Main app with routing
└── main.tsx            # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/car-transporter-app.git

# Navigate to project directory
cd car-transporter-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Application runs at http://localhost:5173
```

### Production Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint
```

## 🔒 Authentication System

The app uses localStorage-based authentication with three user types:

**Individual Users** (👤)
- Personal vehicle imports
- Standard pricing
- Basic support

**Dealers** (🏢)
- Volume discounts (15-25%)
- Bulk operations
- Priority support
- Business analytics

**Shippers** (🚛)
- Custom rates
- Dedicated account management
- Volume-based pricing
- Advanced logistics tools

## 🌐 Available Routes

### Public Routes
- `/` - Home page
- `/shop` - Vehicle catalog
- `/product/:id` - Vehicle details
- `/about` - About us
- `/contact` - Contact page
- `/services` - Services overview
- `/faq` - Frequently asked questions
- `/terms` - Terms and conditions

### Protected Routes (Login Required)
- `/dashboard` - User dashboard
- `/cart` - Shopping cart
- `/checkout` - Checkout process

### Authentication
- `/login` - User login
- `/register` - New user registration

## 🎨 Key Features Breakdown

### Advanced Vehicle Search
- VIN code lookup
- Multi-parameter filtering
- US state selection (24 states)
- Fuel type filtering (Gasoline, Diesel, Hybrid, Electric)
- Transmission type (Automatic, Manual)
- Price and mileage ranges

### Transport Cost Calculator
- Automatic pricing based on vehicle location
- State-specific transport rates
- Estimated delivery time
- Customs clearance cost estimation

### Vehicle Type Selector
- Sedan (standard pricing)
- SUV (+15%)
- Pickup Truck (+20%)
- Luxury/Sports (+30%)
- Van/Minivan (+25%)
- Motorcycle (-40%)
- Oversized (+50%)

### Condition Multipliers
- Running: Standard rate
- Non-Running: +15%
- Damaged: +25%

### Transport Types
- Open Transport: Standard rate
- Enclosed Transport: +40% (Premium protection)

## 🔧 Configuration

### Base URL
Set in `vite.config.ts`:
```typescript
base: './'  // Relative paths for deployment flexibility
```

### Build Output
```typescript
build: {
  outDir: 'dist',
  assetsDir: 'assets'
}
```

### TypeScript Config
- Strict mode enabled
- ES2022 target
- DOM libraries included
- JSX: React JSX

## 📱 Responsive Design

- **Mobile-first approach**
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-optimized interfaces
- Adaptive navigation (hamburger menu on mobile)

## 🌍 Localization

- Primary: Georgian (ქართული)
- Currency: USD $ and Georgian Lari ₾
- Measurements: Miles, lbs (US standard)
- Date format: Georgian standard

## 🔐 Data Storage

- **localStorage**: User authentication tokens, shopping cart
- **Context API**: Global state management
- **Session data**: User preferences, currency selection

## 🚀 Performance Optimizations

- Code splitting with React Router
- Lazy loading of routes
- Optimized bundle size with Vite
- Tree-shaking for unused code
- Fast refresh during development

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Contact

- **Email**: info@transportapp.ge
- **Phone**: +995 555 123 456
- **Address**: Vazha-Pshavela Ave 25, Tbilisi 0186, Georgia

## 🙏 Acknowledgments

- Vehicle data sourced from US automotive markets
- Transport rates based on current Georgian logistics standards
- Icons and UI components from Heroicons and Lucide
- Exchange rates: Georgian National Bank

---

**Built with ❤️ for the Georgian automotive import community**
