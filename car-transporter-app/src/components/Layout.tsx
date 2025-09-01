// src/components/Layout.tsx
import { Outlet, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Layout() {
  const { state } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <div className="flex gap-4">
          <Link to="/" className="text-lg font-bold">Transport App</Link>
        </div>
        <nav className="flex gap-4 items-center">
          <Link 
            to="/about" 
            className="hover:text-blue-200"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="hover:text-blue-200"
          >
            Contact
          </Link>
          <Link 
            to="/services" 
            className="hover:text-blue-200"
          >
            Services
          </Link>
          <Link 
            to="/shop" 
            className="hover:text-blue-200"
          >
            Shop
          </Link>
          <Link 
            to="/faq" 
            className="hover:text-blue-200"
          >
            FAQ
          </Link>
          <Link 
            to="/terms" 
            className="hover:text-blue-200"
          >
            Terms
          </Link>
          
          {/* Cart Link with Counter */}
          <Link 
            to="/cart" 
            className="relative hover:text-blue-200 flex items-center space-x-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L21 18M7 13v6a2 2 0 002 2h7a2 2 0 002-2v-6" />
            </svg>
            {state.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {state.totalItems > 9 ? '9+' : state.totalItems}
              </span>
            )}
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Transport App. All rights reserved.</p>
      </footer>
    </div>
  );
}