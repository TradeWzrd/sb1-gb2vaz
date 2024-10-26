import React, { useState } from 'react';
import { Calendar, Globe, AlertTriangle, Filter, Clock, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import CurrencyCorrelation from './CurrencyCorrelation';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  country: string;
  currency: string;
  impact: 'high' | 'medium' | 'low';
  actual?: string;
  forecast?: string;
  previous?: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Federal Reserve Interest Rate Decision',
    date: '2024-03-20',
    time: '18:00 GMT',
    country: 'United States',
    currency: 'USD',
    impact: 'high',
    actual: '5.50%',
    forecast: '5.50%',
    previous: '5.50%'
  },
  {
    id: '2',
    title: 'Non-Farm Payrolls',
    date: '2024-03-08',
    time: '13:30 GMT',
    country: 'United States',
    currency: 'USD',
    impact: 'high',
    actual: '353K',
    forecast: '180K',
    previous: '216K'
  },
  {
    id: '3',
    title: 'ECB Monetary Policy Statement',
    date: '2024-03-07',
    time: '12:45 GMT',
    country: 'European Union',
    currency: 'EUR',
    impact: 'high',
    actual: '4.50%',
    forecast: '4.50%',
    previous: '4.50%'
  }
];

export default function EconomicCalendar() {
  const [selectedCurrency, setSelectedCurrency] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState<'calendar' | 'correlation'>('calendar');

  const getImpactStyle = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-500 bg-red-500/10';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'low':
        return 'text-green-500 bg-green-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesCurrency = selectedCurrency === 'all' || event.currency === selectedCurrency;
    const matchesImpact = selectedImpact === 'all' || event.impact === selectedImpact;
    const matchesDate = event.date === selectedDate;
    return matchesCurrency && matchesImpact && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Market Analysis</h2>
          <p className="text-gray-400">Economic events and currency correlations</p>
        </div>

        <div className="flex bg-gray-800/30 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
              activeTab === 'calendar'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Calendar size={18} />
            Economic Calendar
          </button>
          <button
            onClick={() => setActiveTab('correlation')}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
              activeTab === 'correlation'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp size={18} />
            Currency Correlation
          </button>
        </div>
      </div>

      {activeTab === 'calendar' ? (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-gray-800/30 text-gray-300 px-3 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Currency</label>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-gray-800/30 text-gray-300 px-3 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Currencies</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Impact</label>
              <select
                value={selectedImpact}
                onChange={(e) => setSelectedImpact(e.target.value)}
                className="bg-gray-800/30 text-gray-300 px-3 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Impact</option>
                <option value="high">High Impact</option>
                <option value="medium">Medium Impact</option>
                <option value="low">Low Impact</option>
              </select>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div key={event.id} className="glass-card p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${getImpactStyle(event.impact)}`}>
                      <AlertTriangle size={20} />
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium">{event.title}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Clock size={14} />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Globe size={14} />
                          {event.country}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <DollarSign size={14} />
                          {event.currency}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    {event.actual && (
                      <div>
                        <div className="text-xs text-gray-400">Actual</div>
                        <div className="text-white font-medium">{event.actual}</div>
                      </div>
                    )}
                    {event.forecast && (
                      <div>
                        <div className="text-xs text-gray-400">Forecast</div>
                        <div className="text-white font-medium">{event.forecast}</div>
                      </div>
                    )}
                    {event.previous && (
                      <div>
                        <div className="text-xs text-gray-400">Previous</div>
                        <div className="text-white font-medium">{event.previous}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredEvents.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                No events found for the selected filters
              </div>
            )}
          </div>
        </>
      ) : (
        <CurrencyCorrelation />
      )}
    </div>
  );
}