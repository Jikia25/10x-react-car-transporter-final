// src/components/CurrencySelector.tsx
import { useCurrency } from "../context/CurrencyContext";

export default function CurrencySelector() {
  const { currency, setCurrency, exchangeRate } = useCurrency();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600"></span>
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setCurrency("USD")}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currency === "USD"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          $
        </button>
        <button
          onClick={() => setCurrency("GEL")}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currency === "GEL"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-white-300"
          }`}
        >
          ₾
        </button>
      </div>
      {currency === "GEL" && (
        <span className="text-xs text-white-500">
          (1 USD = {exchangeRate} ₾)
        </span>
      )}
    </div>
  );
}
