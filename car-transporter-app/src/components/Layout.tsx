// src/components/Layout.tsx
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Layout() {
  const { state } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Check if user is authenticated
  const token = localStorage.getItem("fake_token");
  
  const handleLogout = () => {
    localStorage.removeItem("fake_token");
    window.location.href = "/";
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navLinkClass = (path: string) => {
    return `hover:text-blue-200 transition-colors duration-200 ${
      isActivePath(path) ? 'text-blue-200 font-semibold border-b-2 border-blue-200 pb-1' : ''
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link to="/" className="text-xl font-bold hover:text-blue-200 transition-colors">
                🚛 Transport App
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6 items-center">
              <Link to="/about" className={navLinkClass('/about')}>
                About
              </Link>
              <Link to="/contact" className={navLinkClass('/contact')}>
                Contact
              </Link>
              <Link to="/services" className={navLinkClass('/services')}>
                Services
              </Link>
              <Link to="/shop" className={navLinkClass('/shop')}>
                Shop
              </Link>
              <Link to="/faq" className={navLinkClass('/faq')}>
                FAQ
              </Link>
              <Link to="/terms" className={navLinkClass('/terms')}>
                Terms
              </Link>
              
              {/* Cart Link (only if authenticated) */}
              {token && (
                <Link 
                  to="/cart" 
                  className="relative hover:text-blue-200 flex items-center transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L21 18M7 13v6a2 2 0 002 2h7a2 2 0 002-2v-6" />
                  </svg>
                  {state.totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {state.totalItems > 9 ? '9+' : state.totalItems}
                    </span>
                  )}
                </Link>
              )}

              {/* Auth Links */}
              <div className="flex items-center gap-4 ml-4 border-l border-blue-500 pl-4">
                {token ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="hover:text-blue-200 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="hover:text-blue-200 transition-colors"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-blue-500 py-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/about" 
                  className={`${navLinkClass('/about')} block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className={`${navLinkClass('/contact')} block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link 
                  to="/services" 
                  className={`${navLinkClass('/services')} block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  to="/shop" 
                  className={`${navLinkClass('/shop')} block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link 
                  to="/faq" 
                  className={`${navLinkClass('/faq')} block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link 
                  to="/terms" 
                  className={`${navLinkClass('/terms')} block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Terms
                </Link>
                
                {/* Mobile Cart & Auth */}
                <div className="border-t border-blue-500 pt-4 space-y-4">
                  {token ? (
                    <>
                      <Link 
                        to="/cart" 
                        className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L21 18M7 13v6a2 2 0 002 2h7a2 2 0 002-2v-6" />
                        </svg>
                        <span>Cart ({state.totalItems})</span>
                      </Link>
                      <Link 
                        to="/dashboard" 
                        className="block hover:text-blue-200 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left hover:text-blue-200 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        className="block hover:text-blue-200 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link 
                        to="/register" 
                        className="block hover:text-blue-200 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-140px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">🚛 Transport App</h3>
              <p className="text-gray-300 mb-4">
                Professional car transport services from America to Georgia. 
                Quality vehicles, reliable delivery.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  📘 Facebook
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  📷 Instagram
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Shop Cars</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <p>📍 Rustavi, Georgia</p>
                <p>📞 +995 XXX XXX XXX</p>
                <p>✉️ info@transportapp.ge</p>
                <p>🕒 Mon-Fri: 9:00-18:00</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>© 2025 Transport App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}