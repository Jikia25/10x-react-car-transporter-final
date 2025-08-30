import { Outlet, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Layout() {
    const { state } = useCart();

  return (
    <div>
      {/* Header / Navigation */}
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-lg font-bold">Transport App</h1>
        <nav className="flex gap-4">
          <Link to="/about" className="hover:text-blue-100">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-100">
            Contact
          </Link>
          <Link to="/faq" className="hover:text-blue-100">
            FAQ
          </Link>
          <Link to="/terms" className="hover:text-blue-100">
            Terms
          </Link>
          <Link to="/services" className="hover:text-blue-100">
            Services
          </Link>
          <Link to="/shop" className="hover:text-blue-100">
            Shop
          </Link>
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

      <main className="p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-6">
        © {new Date().getFullYear()} Transport App. All rights reserved.
      </footer>
    </div>
  );
}
