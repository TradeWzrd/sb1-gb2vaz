import { Broker } from '../../types/broker';

export const mockBrokers: Broker[] = [
  {
    id: 'tastyfx',
    name: 'TastyFX',
    logo: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.9,
    minDeposit: 500,
    region: 'US',
    tradingFees: {
      commission: 0,
      spread: {
        eurusd: 0.8,
        gbpusd: 1.0,
        usdjpy: 0.9
      }
    },
    features: ['CFTC Regulated', 'NFA Member', '80+ Forex Pairs', 'Advanced Platform'],
    platforms: ['Proprietary Platform', 'Mobile App'],
    regulation: ['CFTC', 'NFA'],
    customerSupport: {
      email: true,
      phone: true,
      livechat: true,
      languages: ['English']
    },
    accountTypes: [
      {
        name: 'Standard',
        minDeposit: 500,
        spread: 0.8,
        commission: 0
      }
    ],
    depositMethods: ['Bank Transfer', 'Credit Card', 'Wire Transfer'],
    withdrawalMethods: ['Bank Transfer', 'Wire Transfer'],
    website: 'https://tastyfx.com'
  },
  {
    id: 'plus500us',
    name: 'Plus500 US',
    logo: 'https://images.unsplash.com/photo-1613442301239-ea2478101ea7?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.8,
    minDeposit: 100,
    region: 'US',
    tradingFees: {
      commission: 0,
      spread: {
        eurusd: 0.9,
        gbpusd: 1.1,
        usdjpy: 1.0
      }
    },
    features: ['Futures Trading', 'WebTrader Platform', 'Micro Contracts', 'Educational Resources'],
    platforms: ['WebTrader', 'Mobile App'],
    regulation: ['CFTC', 'NFA'],
    customerSupport: {
      email: true,
      phone: true,
      livechat: true,
      languages: ['English']
    },
    accountTypes: [
      {
        name: 'Standard',
        minDeposit: 100,
        spread: 0.9,
        commission: 0
      }
    ],
    depositMethods: ['Bank Transfer', 'Credit Card'],
    withdrawalMethods: ['Bank Transfer', 'Credit Card'],
    website: 'https://plus500.com'
  },
  {
    id: 'exness',
    name: 'Exness',
    logo: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.8,
    minDeposit: 1,
    region: 'International',
    tradingFees: {
      commission: 7,
      spread: {
        eurusd: 0.1,
        gbpusd: 0.2,
        usdjpy: 0.2
      }
    },
    features: ['Ultra-Low Spreads', 'Instant Withdrawals', 'Copy Trading', 'Islamic Accounts'],
    platforms: ['MT4', 'MT5', 'Mobile App'],
    regulation: ['FCA', 'CySEC', 'FSCA'],
    customerSupport: {
      email: true,
      phone: true,
      livechat: true,
      languages: ['English', 'Arabic', 'Chinese', 'Spanish']
    },
    accountTypes: [
      {
        name: 'Standard',
        minDeposit: 1,
        spread: 0.3,
        commission: 0
      },
      {
        name: 'Raw Spread',
        minDeposit: 500,
        spread: 0.0,
        commission: 7
      }
    ],
    depositMethods: ['Bank Transfer', 'Credit Card', 'Crypto', 'E-wallets'],
    withdrawalMethods: ['Bank Transfer', 'Credit Card', 'Crypto', 'E-wallets'],
    website: 'https://exness.com'
  },
  {
    id: 'fxtm',
    name: 'FXTM',
    logo: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.7,
    minDeposit: 50,
    region: 'International',
    tradingFees: {
      commission: 6,
      spread: {
        eurusd: 0.1,
        gbpusd: 0.2,
        usdjpy: 0.2
      }
    },
    features: ['ECN Trading', 'Copy Trading', 'Advanced Research', 'Educational Resources'],
    platforms: ['MT4', 'MT5'],
    regulation: ['FCA', 'CySEC', 'FSCA'],
    customerSupport: {
      email: true,
      phone: true,
      livechat: true,
      languages: ['English', 'Chinese', 'Arabic', 'Hindi']
    },
    accountTypes: [
      {
        name: 'Standard',
        minDeposit: 50,
        spread: 1.2,
        commission: 0
      },
      {
        name: 'ECN',
        minDeposit: 500,
        spread: 0.0,
        commission: 6
      }
    ],
    depositMethods: ['Bank Transfer', 'Credit Card', 'E-wallets'],
    withdrawalMethods: ['Bank Transfer', 'Credit Card', 'E-wallets'],
    website: 'https://fxtm.com'
  },
  {
    id: 'octa',
    name: 'OCTA',
    logo: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.6,
    minDeposit: 100,
    region: 'International',
    tradingFees: {
      commission: 0,
      spread: {
        eurusd: 1.0,
        gbpusd: 1.2,
        usdjpy: 1.1
      }
    },
    features: ['Demo Account', 'Educational Resources', 'Market Analysis', 'Copy Trading'],
    platforms: ['MT4', 'MT5'],
    regulation: ['FSC', 'CySEC'],
    customerSupport: {
      email: true,
      phone: true,
      livechat: true,
      languages: ['English', 'Chinese', 'Thai', 'Vietnamese']
    },
    accountTypes: [
      {
        name: 'Micro',
        minDeposit: 100,
        spread: 1.0,
        commission: 0
      },
      {
        name: 'Pro',
        minDeposit: 500,
        spread: 0.6,
        commission: 0
      }
    ],
    depositMethods: ['Bank Transfer', 'Credit Card', 'Crypto'],
    withdrawalMethods: ['Bank Transfer', 'Credit Card', 'Crypto'],
    website: 'https://octa.com'
  }
];