// src/components/TransportCostCalculator.tsx
import { useState } from "react";
import { US_STATES, calculateTransportCost } from "../data/states_transport";

interface TransportCostCalculatorProps {
  carPrice?: number;
  selectedState?: string;
  onCalculate?: (result: any) => void;
  className?: string;
}

const TransportCostCalculator: React.FC<TransportCostCalculatorProps> = ({
  carPrice = 0,
  selectedState = "",
  onCalculate,
  className = ""
}) => {
  const [price, setPrice] = useState(carPrice);
  const [stateCode, setStateCode] = useState(selectedState);
  const [result, setResult] = useState<any>(null);

  function handleCalculate() {
    if (price <= 0 || !stateCode) return;
    
    const calculation = calculateTransportCost(stateCode, price);
    setResult(calculation);
    
    if (onCalculate) {
      onCalculate(calculation);
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        ტრანსპორტირების ღირებულების კალკულატორი
      </h3>

      <div className="space-y-4">
        {/* Car Price Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            მანქანის ღირებულება (USD)
          </label>
          <input
            type="number"
            value={price || ""}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="მაგ: 25000"
            min="0"
          />
        </div>

        {/* State Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            შტატი
          </label>
          <select
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">აირჩიეთ შტატი</option>
            {US_STATES.map((state) => (
              <option key={state.code} value={state.code}>
                {state.georgianName} ({state.name})
              </option>
            ))}
          </select>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={!price || !stateCode}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            price && stateCode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ღირებულების გამოთვლა
        </button>

        {/* Results */}
        {result && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3">გამოთვლის შედეგი:</h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">მანქანის ღირებულება:</span>
                <span className="font-medium">${price.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">ტრანსპორტირება {result.stateName}-დან:</span>
                <span className="font-medium text-orange-600">${result.transportCost.toLocaleString()}</span>
              </div>
              
              <div className="border-t border-blue-200 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-blue-900 font-semibold">სულ ღირებულება:</span>
                  <span className="font-bold text-lg text-blue-900">${result.totalCost.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-3">
                <span>მიღების დრო:</span>
                <span>{result.estimatedDays} დღე</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 p-3 bg-white rounded border border-blue-100">
              <p className="text-xs text-gray-600">
                <span className="font-medium">შენიშვნა:</span> ღირებულება შეიცავს ტრანსპორტირებას ნავით, 
                საბაჟო გასუფთავებას და მიწოდებას რუსთავამდე.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransportCostCalculator;