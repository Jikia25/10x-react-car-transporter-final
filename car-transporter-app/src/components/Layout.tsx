// src/components/Layout.tsx - მარტივი cart counter მიდგომა
import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import AdvancedSearchModal from "./AdvancedSearchModal";
import { useUser } from "../context/UserContext";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showJoinFlow, setShowJoinFlow] = useState(false);
  const [searchVin, setSearchVin] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { testUser } = useUser();
  // Check if user is authenticated
  const token = localStorage.getItem("fake_token");
  const userProfile = localStorage.getItem("user_profile");

  // Sample cars data for search
  const carsData = [
    {
      id: "1",
      make: "Toyota",
      model: "Camry",
      year: 2022,
      vin: "4T1G11AK8NU123456",
      images: [
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=300&fit=crop",
      ],
      price: 25000,
    },
    {
      id: "2",
      make: "Honda",
      model: "Accord",
      year: 2021,
      vin: "1HGCV1F30MA123456",
      images: [
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop",
      ],
      price: 23500,
    },
    {
      id: "3",
      make: "BMW",
      model: "X5",
      year: 2020,
      vin: "5UXCR6C04L1234567",
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop",
      ],
      price: 45000,
    },
  ];

  // Cart count calculation
  const getCartCount = () => {
    try {
      const cartData = localStorage.getItem("cart_items");
      if (!cartData) return 0;

      const items = JSON.parse(cartData);
      if (!Array.isArray(items)) return 0;

      return items.reduce((total, item) => {
        if (item.car && typeof item.quantity === "number") {
          return total + item.quantity;
        }
        if (item.id && typeof item.quantity === "number") {
          return total + item.quantity;
        }
        return total + 1;
      }, 0);
    } catch {
      return 0;
    }
  };

  // Update cart count
  useEffect(() => {
    const updateCount = () => setCartCount(getCartCount());
    console.log(testUser);

    updateCount(); // Initial load

    // Listen for cart updates
    const interval = setInterval(updateCount, 500);

    return () => clearInterval(interval);
  }, [location.pathname]); // Update when route changes

  const handleLogout = () => {
    localStorage.removeItem("fake_token");
    localStorage.removeItem("user_profile");
    window.location.href = "/";
  };

  const handleJoinComplete = (profile: any) => {
    localStorage.setItem("fake_token", "new_user_token");
    localStorage.setItem("user_profile", JSON.stringify(profile));
    setShowJoinFlow(false);
    window.location.reload();
  };

  const handleVinSearch = (value: string) => {
    if (!value.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results = carsData.filter(
      (car) =>
        car.vin?.toLowerCase().includes(value.toLowerCase()) ||
        car.make.toLowerCase().includes(value.toLowerCase()) ||
        car.model.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchVin(value);
    handleVinSearch(value);
  };

  const handleSearchResultClick = (carId: string) => {
    setShowSearchResults(false);
    setSearchVin("");
    navigate(`/product/${carId}`);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navLinkClass = (path: string) => {
    return `hover:text-blue-200 transition-colors duration-200 ${
      isActivePath(path)
        ? "text-blue-200 font-semibold border-b-2 border-blue-200 pb-1"
        : ""
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
              <Link
                to="/"
                className="text-xl font-bold hover:text-blue-200 transition-colors"
              >
                🚛 Transport App
              </Link>
            </div>

            {/* Header Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchVin}
                  onChange={handleSearchInputChange}
                  placeholder="VIN კოდი ან მანქანის მოდელი..."
                  className="w-full px-4 py-2 pr-20 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />

                {/* Search Buttons Container */}
                <div className="absolute right-1 top-1 flex items-center gap-1">
                  {/* Advanced Search Button */}
                  <button
                    onClick={() => setShowAdvancedSearch(true)}
                    className="px-2 py-1 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors"
                    title="დეტალური ძიება"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                      />
                    </svg>
                  </button>

                  {/* Regular Search Button */}
                  <button
                    onClick={() => handleVinSearch(searchVin)}
                    className="px-2 py-1 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors"
                    title="ძიება"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Search Results Dropdown */}
                {showSearchResults && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        ძიების შედეგები:
                      </h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {searchResults.map((car) => (
                          <button
                            key={car.id}
                            onClick={() => handleSearchResultClick(car.id)}
                            className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded text-left"
                          >
                            <img
                              src={car.images[0]}
                              alt={`${car.make} ${car.model}`}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">
                                {car.year} {car.make} {car.model}
                              </p>
                              <p className="text-xs text-gray-500">
                                VIN: {car.vin}
                              </p>
                              <p className="text-xs font-medium text-green-600">
                                ${car.price.toLocaleString()}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6 items-center">
              <Link to="/about" className={navLinkClass("/about")}>
                About
              </Link>
              <Link to="/contact" className={navLinkClass("/contact")}>
                Contact
              </Link>
              <Link to="/services" className={navLinkClass("/services")}>
                Services
              </Link>
              <Link to="/shop" className={navLinkClass("/shop")}>
                Shop
              </Link>
              <Link to="/faq" className={navLinkClass("/faq")}>
                FAQ
              </Link>

              {/* Cart Link (only if authenticated) */}
              {token && (
                <Link
                  to="/cart"
                  className="relative hover:text-blue-200 flex items-center transition-all duration-200 hover:scale-110"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L21 18M7 13v6a2 2 0 002 2h7a2 2 0 002-2v-6"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Auth Links */}
              <div className="flex items-center gap-4 ml-4 border-l border-blue-500 pl-4">
                {token ? (
                  <>
                    {userProfile && (
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                          {JSON.parse(userProfile).type === "dealer"
                            ? "🏢"
                            : JSON.parse(userProfile).type === "shipper"
                            ? "🚛"
                            : "👤"}
                        </div>
                        <span className="text-sm text-blue-200">
                          {JSON.parse(userProfile).type === "dealer"
                            ? "Dealer"
                            : JSON.parse(userProfile).type === "shipper"
                            ? "Shipper"
                            : "Member"}
                        </span>
                      </div>
                    )}
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
                    {testUser ? <span>{testUser.role}</span> : "kristi"}
                    <Link
                      to="/login"
                      className="hover:text-blue-200 transition-colors"
                    >
                      Login
                    </Link>
                    <button
                      onClick={() => setShowJoinFlow(true)}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                      Join Now
                    </button>
                  </>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <div className="relative bg-white rounded-lg shadow-sm">
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchVin}
                  onChange={handleSearchInputChange}
                  placeholder="VIN კოდი ან მანქანის მოდელი..."
                  className="flex-1 px-4 py-3 text-gray-900 bg-transparent border-0 rounded-l-lg focus:ring-0 focus:outline-none"
                />

                {/* Mobile Advanced Search Button */}
                <button
                  onClick={() => setShowAdvancedSearch(true)}
                  className="px-3 py-3 text-gray-500 hover:text-blue-600 hover:bg-gray-50 transition-colors border-l border-gray-200"
                  title="დეტალური ძიება"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                </button>

                {/* Mobile Search Button */}
                <button
                  onClick={() => handleVinSearch(searchVin)}
                  className="px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-r-lg transition-colors"
                  title="ძიება"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Search Results */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      ძიების შედეგები:
                    </h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {searchResults.map((car) => (
                        <button
                          key={car.id}
                          onClick={() => handleSearchResultClick(car.id)}
                          className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded text-left"
                        >
                          <img
                            src={car.images[0]}
                            alt={`${car.make} ${car.model}`}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">
                              {car.year} {car.make} {car.model}
                            </p>
                            <p className="text-xs text-gray-500">
                              VIN: {car.vin}
                            </p>
                            <p className="text-xs font-medium text-green-600">
                              ${car.price.toLocaleString()}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-blue-500 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/about"
                  className={`${navLinkClass("/about")} block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`${navLinkClass("/contact")} block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/services"
                  className={`${navLinkClass("/services")} block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  to="/shop"
                  className={`${navLinkClass("/shop")} block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  to="/faq"
                  className={`${navLinkClass("/faq")} block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
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
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L21 18M7 13v6a2 2 0 002 2h7a2 2 0 002-2v-6"
                          />
                        </svg>
                        <span>Cart ({cartCount})</span>
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
                      <button
                        onClick={() => {
                          setShowJoinFlow(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block hover:text-blue-200 transition-colors text-left"
                      >
                        Join Now
                      </button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>

        {/* Member Benefits Banner */}
        {token && userProfile && (
          <div className="bg-blue-700 border-t border-blue-500">
            <div className="container mx-auto px-4 py-2">
              <div className="flex items-center justify-center text-sm">
                <span className="text-blue-200">
                  Welcome back! You're saving 15-25% on all transport services
                </span>
                <span className="ml-2">⭐</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Click outside handler for search results */}
      {showSearchResults && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowSearchResults(false)}
        />
      )}

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
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  📘 Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  📷 Instagram
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Shop Cars
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
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

      {/* Join Login Flow Modal */}
      {showJoinFlow && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowJoinFlow(false)}
          />
          <div className="relative flex items-center justify-center min-h-screen p-4">
            <div className="bg-white max-w-md mx-auto rounded-lg p-6">
              {/* Close button */}
              <button
                onClick={() => setShowJoinFlow(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h3 className="text-xl font-bold mb-4">შემოგვიერთდით</h3>
              <p className="text-gray-600 mb-6">
                აირჩიეთ რომელი ტიპის მომხმარებელი ხართ:
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    // handleJoinComplete({
                    //   type: "individual",
                    //   experience: "beginner",
                    // });
                    navigate("/register");
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  👤 ინდივიდუალური მომხმარებელი
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  🏢 დილერი
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  🚛 შიპერი
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Search Modal */}
      <AdvancedSearchModal
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
      />
    </div>
  );
}
