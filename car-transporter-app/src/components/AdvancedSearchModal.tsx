// src/components/AdvancedSearchModal.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { carsData, type Car } from "../data/car_data";

interface SearchFilters {
  vin: string;
  make: string;
  model: string;
  yearFrom: string;
  yearTo: string;
  priceFrom: string;
  priceTo: string;
  mileageFrom: string;
  mileageTo: string;
  state: string;
  fuelType: string;
  transmission: string;
}

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdvancedSearchModal({
  isOpen,
  onClose,
}: AdvancedSearchModalProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    vin: "",
    make: "",
    model: "",
    yearFrom: "",
    yearTo: "",
    priceFrom: "",
    priceTo: "",
    mileageFrom: "",
    mileageTo: "",
    state: "",
    fuelType: "",
    transmission: "",
  });

  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // US States where cars come from
  const usStates = [
    "California",
    "Texas",
    "Florida",
    "New York",
    "Illinois",
    "Pennsylvania",
    "Ohio",
    "Georgia",
    "North Carolina",
    "Michigan",
    "New Jersey",
    "Virginia",
    "Washington",
    "Arizona",
    "Massachusetts",
    "Tennessee",
    "Indiana",
    "Missouri",
    "Maryland",
    "Wisconsin",
    "Colorado",
    "Minnesota",
    "South Carolina",
    "Alabama",
  ];

  const carMakes = [...new Set(carsData.map((car) => car.make))];
  const carModels = [...new Set(carsData.map((car) => car.model))];

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    let results = carsData;

    // Apply filters
    if (filters.vin) {
      results = results.filter((car) =>
        car.vin?.toLowerCase().includes(filters.vin.toLowerCase())
      );
    }

    if (filters.make) {
      results = results.filter((car) =>
        car.make.toLowerCase().includes(filters.make.toLowerCase())
      );
    }

    if (filters.model) {
      results = results.filter((car) =>
        car.model.toLowerCase().includes(filters.model.toLowerCase())
      );
    }

    if (filters.yearFrom) {
      results = results.filter((car) => car.year >= parseInt(filters.yearFrom));
    }

    if (filters.yearTo) {
      results = results.filter((car) => car.year <= parseInt(filters.yearTo));
    }

    if (filters.priceFrom) {
      results = results.filter(
        (car) => car.price >= parseInt(filters.priceFrom)
      );
    }

    if (filters.priceTo) {
      results = results.filter((car) => car.price <= parseInt(filters.priceTo));
    }

    if (filters.mileageFrom) {
      results = results.filter(
        (car) => car.mileage >= parseInt(filters.mileageFrom)
      );
    }

    if (filters.mileageTo) {
      results = results.filter(
        (car) => car.mileage <= parseInt(filters.mileageTo)
      );
    }

    if (filters.fuelType) {
      results = results.filter((car) => car.fuelType === filters.fuelType);
    }

    if (filters.transmission) {
      results = results.filter(
        (car) => car.transmission === filters.transmission
      );
    }

    if (filters.state) {
      results = results.filter((car) => car.location === filters.state);
    }

    setSearchResults(results);
    setHasSearched(true);
  };

  const clearFilters = () => {
    setFilters({
      vin: "",
      make: "",
      model: "",
      yearFrom: "",
      yearTo: "",
      priceFrom: "",
      priceTo: "",
      mileageFrom: "",
      mileageTo: "",
      state: "",
      fuelType: "",
      transmission: "",
    });
    setSearchResults([]);
    setHasSearched(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">დეტალური ძიება</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
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
          </div>
        </div>

        {/* Filters */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* VIN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VIN კოდი
              </label>
              <input
                type="text"
                value={filters.vin}
                onChange={(e) => handleFilterChange("vin", e.target.value)}
                placeholder="VIN ნომერი..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Make */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                მარკა
              </label>
              <select
                value={filters.make}
                onChange={(e) => handleFilterChange("make", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">ყველა მარკა</option>
                {carMakes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                მოდელი
              </label>
              <select
                value={filters.model}
                onChange={(e) => handleFilterChange("model", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">ყველა მოდელი</option>
                {carModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                წელი (დან)
              </label>
              <input
                type="number"
                value={filters.yearFrom}
                onChange={(e) => handleFilterChange("yearFrom", e.target.value)}
                placeholder="2000"
                min="1990"
                max="2025"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                წელი (მდე)
              </label>
              <input
                type="number"
                value={filters.yearTo}
                onChange={(e) => handleFilterChange("yearTo", e.target.value)}
                placeholder="2025"
                min="1990"
                max="2025"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ფასი (დან) $
              </label>
              <input
                type="number"
                value={filters.priceFrom}
                onChange={(e) =>
                  handleFilterChange("priceFrom", e.target.value)
                }
                placeholder="10000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ფასი (მდე) $
              </label>
              <input
                type="number"
                value={filters.priceTo}
                onChange={(e) => handleFilterChange("priceTo", e.target.value)}
                placeholder="100000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Mileage Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                გარბენი (დან)
              </label>
              <input
                type="number"
                value={filters.mileageFrom}
                onChange={(e) =>
                  handleFilterChange("mileageFrom", e.target.value)
                }
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                გარბენი (მდე)
              </label>
              <input
                type="number"
                value={filters.mileageTo}
                onChange={(e) =>
                  handleFilterChange("mileageTo", e.target.value)
                }
                placeholder="200000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                შტატი (USA)
              </label>
              <select
                value={filters.state}
                onChange={(e) => handleFilterChange("state", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">ყველა შტატი</option>
                {usStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                საწვავის ტიპი
              </label>
              <select
                value={filters.fuelType}
                onChange={(e) => handleFilterChange("fuelType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">ყველა ტიპი</option>
                <option value="ბენზინი">ბენზინი</option>
                <option value="დიზელი">დიზელი</option>
                <option value="ჰიბრიდი">ჰიბრიდი</option>
                <option value="ელექტრო">ელექტრო</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ტრანსმისია
              </label>
              <select
                value={filters.transmission}
                onChange={(e) =>
                  handleFilterChange("transmission", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">ყველა</option>
                <option value="ავტომატური">ავტომატური</option>
                <option value="მექანიკური">მექანიკური</option>
              </select>
            </div>
          </div>
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ადგილმდებარეობა
            </label>
            <select
              value={filters.state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">ყველა</option>
              <option value="ამერიკა">ამერიკა</option>
              <option value="რუსთავის ბაზარი">რუსთავის ბაზარი</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              ძიება
            </button>
            <button
              onClick={clearFilters}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium transition-colors"
            >
              გასუფთავება
            </button>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="border-t p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              ძიების შედეგები ({searchResults.length})
            </h3>

            {searchResults.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  მანქანები ვერ მოიძებნა მითითებული კრიტერიუმებით
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {searchResults.map((car) => (
                  <Link
                    key={car.id}
                    to={`/product/${car.id}`}
                    onClick={onClose}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={car.images[0]}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h4 className="font-bold text-gray-900 mb-1">
                      {car.year} {car.make} {car.model}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      ${car.price.toLocaleString()} •{" "}
                      {car.mileage.toLocaleString()} მაილი
                    </p>
                    <p className="text-xs text-gray-500">
                      VIN: {car.vin || "N/A"}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
