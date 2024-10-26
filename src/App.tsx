import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { ErrorBoundary } from './components/ErrorBoundary';
import MarketSentiment from './components/sentiment/MarketSentiment';
import CopyTrading from './components/copyTrading/CopyTrading';
import TradeJournal from './components/journal/TradeJournal';
import BrokerComparison from './components/brokers/BrokerComparison';
import EconomicCalendar from './components/analytics/EconomicCalendar';
import CurrencyCorrelation from './components/analytics/CurrencyCorrelation';
import SettingsPanel from './components/settings/SettingsPanel';
import HelpPanel from './components/help/HelpPanel';
import AuthPage from './components/auth/AuthPage';
import { Trade } from './types/journal';
import { useTradeStorage } from './hooks/useTradeStorage';
import { Menu } from 'lucide-react';
import { useSettings } from './context/SettingsContext';
import { useAuth } from './context/AuthContext';

// Default trades data
const defaultTrades: Trade[] = [
  {
    id: '1',
    pair: 'BTC/USD',
    type: 'long',
    entryPrice: 47250.80,
    exitPrice: 48500.20,
    stopLoss: 46800.00,
    takeProfit: 48500.00,
    size: 0.5,
    date: '2024-02-20',
    time: '14:30',
    pnl: 624.70,
    status: 'closed',
    strategy: 'Trend Following',
    marketType: 'crypto',
    exitType: 'tp',
    notes: 'Followed breakout pattern with strong volume confirmation',
    tags: ['breakout', 'trend']
  },
  {
    id: '2',
    pair: 'ETH/USD',
    type: 'short',
    entryPrice: 2850.30,
    exitPrice: 2750.80,
    stopLoss: 2900.00,
    takeProfit: 2750.00,
    size: 2,
    date: '2024-02-19',
    time: '10:15',
    pnl: 199.00,
    status: 'closed',
    strategy: 'Range Trading',
    marketType: 'crypto',
    exitType: 'tp',
    notes: 'Shorted at resistance with overbought RSI',
    tags: ['resistance', 'overbought']
  }
];

function App() {
  const { theme } = useSettings();
  const { isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [accountBalance, setAccountBalance] = useState(10000); // Initial balance
  
  const {
    trades,
    addTrade,
    updateTrade,
    deleteTrade,
    importTrades
  } = useTradeStorage(defaultTrades);

  const renderSection = () => {
    switch (activeSection) {
      case 'sentiment':
        return <MarketSentiment />;
      case 'copy-trading':
        return <CopyTrading />;
      case 'journal':
        return <TradeJournal 
          trades={trades}
          onAddTrade={addTrade}
          onUpdateTrade={updateTrade}
          onDeleteTrade={deleteTrade}
          onImportTrades={importTrades}
        />;
      case 'brokers':
        return <BrokerComparison />;
      case 'calendar':
        return <EconomicCalendar />;
      case 'correlation':
        return <CurrencyCorrelation />;
      case 'settings':
        return null; // Settings will be shown in panel
      case 'help':
        return null; // Help will be shown in panel
      default:
        return <Dashboard 
          trades={trades} 
          onViewAllTrades={() => setActiveSection('journal')}
          currentBalance={accountBalance}
        />;
    }
  };

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <ErrorBoundary>
      <div className={`main-layout ${theme}`}>
        <div className="bg-[#0f1117] text-white relative">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} className="text-white" />
          </button>

          <div className="content-layout">
            <aside className={`
              sidebar-layout w-64
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
              transition-transform duration-300 ease-in-out
            `}>
              <Sidebar 
                activeSection={activeSection} 
                onNavigate={(section) => {
                  if (section === 'settings') {
                    setSettingsOpen(true);
                  } else if (section === 'help') {
                    setHelpOpen(true);
                  } else {
                    setActiveSection(section);
                  }
                  setSidebarOpen(false);
                }} 
              />
            </aside>

            <main className="main-content">
              <TopBar 
                onOpenSettings={() => setSettingsOpen(true)}
                onOpenHelp={() => setHelpOpen(true)}
              />
              <div className="responsive-container py-6">
                {renderSection()}
              </div>
            </main>
          </div>

          {/* Mobile Sidebar Backdrop */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <SettingsPanel 
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            currentBalance={accountBalance}
            onBalanceChange={setAccountBalance}
          />

          <HelpPanel
            isOpen={helpOpen}
            onClose={() => setHelpOpen(false)}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;