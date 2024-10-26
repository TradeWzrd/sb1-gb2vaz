export interface MarketData {
  pair: string;
  price: number;
  change: number;
  volume: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  currency: string;
  notifications: boolean;
}

export interface UserStats {
  tradesCount: number;
  winRate: number;
  totalPnL: number;
  avgTradeSize: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: UserPreferences;
  stats?: UserStats;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}