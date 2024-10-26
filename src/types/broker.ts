export interface Broker {
  id: string;
  name: string;
  logo: string;
  rating: number;
  minDeposit: number;
  tradingFees: {
    commission: number;
    spread: {
      eurusd: number;
      gbpusd: number;
      usdjpy: number;
    };
  };
  features: string[];
  platforms: string[];
  regulation: string[];
  customerSupport: {
    email: boolean;
    phone: boolean;
    livechat: boolean;
    languages: string[];
  };
  accountTypes: {
    name: string;
    minDeposit: number;
    spread: number;
    commission: number;
  }[];
  depositMethods: string[];
  withdrawalMethods: string[];
  website: string;
  reviews: {
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export interface BrokerFilters {
  minRating: number;
  maxMinDeposit: number;
  platforms: string[];
  regulation: string[];
  features: string[];
}