import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { OrdersProvider } from "./context/OrdersContext";
import { UserProvider } from "./context/UserContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import TermsPage from "./pages/TermsPage";
import Layout from "./components/Layout";
import ServicesPage from "./pages/ServicesPage";
import ShopPage from "./pages/ShopPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import MainPage from "./pages/MainPage";
import type { ReactNode } from "react";

export default function App() {
  const token = localStorage.getItem("fake_token");

  // პატარა helper რომ მხოლოდ ავტორიზებულებს შეუშვას
  const PrivateRoute = ({ children }: { children: ReactNode }) => {
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <UserProvider>
      <OrdersProvider>
        <CurrencyProvider>
          <CartProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={<PrivateRoute><Dashboard /></PrivateRoute>}
              />
              <Route
                path="/cart"
                element={<PrivateRoute><CartPage /></PrivateRoute>}
              />
              <Route
                path="/checkout"
                element={<PrivateRoute><CheckoutPage /></PrivateRoute>}
              />

              {/* Static pages with shared layout */}
              <Route element={<Layout />}>
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
              </Route>
            </Routes>
          </CartProvider>
        </CurrencyProvider>
      </OrdersProvider>
    </UserProvider>
  );
}
