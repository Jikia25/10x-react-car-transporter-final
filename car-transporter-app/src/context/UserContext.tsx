// src/context/UserContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  dateJoined: string;
  avatar?: string;
  preferences: {
    currency: "USD" | "GEL";
    language: "ka" | "en";
    notifications: {
      email: boolean;
      sms: boolean;
      orderUpdates: boolean;
    };
  };
}

export interface TestUser {
  role: string;
  username: string;
  password: string;
}

interface UserContextType {
  user: UserProfile | null;
  updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
  isLoading: boolean;
  // make testUser nullable to match state
  testUser: TestUser | null;
  // include the setter in the context type
  setTestUser: React.Dispatch<React.SetStateAction<TestUser | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Sample user data
const sampleUser: UserProfile = {
  id: "user_1",
  fullName: "ქრისტინა ჯიქია",
  email: "Kristina@example.com",
  phone: "+995 555 123 456",
  address: "რუსთაველის გამზირი 25",
  city: "თბილისი",
  zipCode: "0108",
  dateJoined: "2024-01-15T10:00:00Z",
  preferences: {
    currency: "USD",
    language: "ka",
    notifications: {
      email: true,
      sms: false,
      orderUpdates: true,
    },
  },
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(sampleUser);
  const [isLoading, setIsLoading] = useState(false);
  const [testUser, setTestUser] = useState<TestUser | null>(null);

  const updateProfile = async (
    updates: Partial<UserProfile>
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (user) {
        setUser({ ...user, ...updates });
      }

      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  // If you want to log testUser when it changes, use this:

  return (
    <UserContext.Provider
      value={{
        user,
        updateProfile,
        isLoading,
        testUser,
        setTestUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
