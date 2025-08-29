import { Outlet, Link } from "react-router-dom";

export default function Layout() {
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
