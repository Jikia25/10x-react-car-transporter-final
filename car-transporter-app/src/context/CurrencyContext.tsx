// src/context/CurrencyContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';

type Currency = 'USD' | 'GEL';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
  exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Current USD to GEL exchange rate (you can make this dynamic later)
const USD_TO_GEL_RATE = 2.65;

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');

  const formatPrice = (priceInUSD: number): string => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(priceInUSD);
    } else {
      const priceInGEL = priceInUSD * USD_TO_GEL_RATE;
      return new Intl.NumberFormat('ka-GE', {
        style: 'currency',
        currency: 'GEL'
      }).format(priceInGEL);
    }
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      formatPrice,
      exchangeRate: USD_TO_GEL_RATE
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}