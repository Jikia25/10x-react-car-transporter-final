// src/components/InlinePrice.tsx
import { useCurrency } from '../context/CurrencyContext';

interface InlinePriceProps {
  price: number;
  originalPrice?: number;
  showCurrencyToggle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function InlinePrice({ 
  price, 
  originalPrice, 
  showCurrencyToggle = true, 
  size = 'md' 
}: InlinePriceProps) {
  const { currency, setCurrency, formatPrice, exchangeRate } = useCurrency();

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-3xl'
  };

  const toggleClasses = {
    sm: 'text-xs px-1 py-0.5',
    md: 'text-xs px-2 py-1', 
    lg: 'text-sm px-2 py-1',
    xl: 'text-sm px-3 py-1'
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col">
        <div className={`font-bold text-blue-600 ${sizeClasses[size]}`}>
          {formatPrice(price)}
        </div>
        {originalPrice && (
          <div className={`text-gray-500 line-through ${size === 'xl' ? 'text-lg' : 'text-sm'}`}>
            ორიგინალი: {formatPrice(originalPrice)}
          </div>
        )}
      </div>
      
      {showCurrencyToggle && (
        <div className="flex flex-col items-center space-y-1">
          <div className="flex bg-gray-100 rounded text-xs">
            <button
              onClick={() => setCurrency('USD')}
              className={`${toggleClasses[size]} rounded-l font-medium transition-colors ${
                currency === 'USD'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              $
            </button>
            <button
              onClick={() => setCurrency('GEL')}
              className={`${toggleClasses[size]} rounded-r font-medium transition-colors ${
                currency === 'GEL'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ₾
            </button>
          </div>
          {currency === 'GEL' && size !== 'sm' && (
            <span className="text-xs text-gray-400">
              1$={exchangeRate}₾
            </span>
          )}
        </div>
      )}
    </div>
  );
}