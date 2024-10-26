import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, AlertTriangle, DollarSign } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'FOMC Statement',
    date: '2024-03-20',
    time: '18:00 GMT',
    impact: 'high',
    currency: 'USD',
    previous: '5.50%',
    forecast: '5.50%',
  },
  {
    id: 2,
    title: 'NFP',
    date: '2024-03-08',
    time: '13:30 GMT',
    impact: 'high',
    currency: 'USD',
    previous: '353K',
    forecast: '200K',
  },
  {
    id: 3,
    title: 'ECB Rate Decision',
    date: '2024-03-07',
    time: '12:45 GMT',
    impact: 'high',
    currency: 'EUR',
    previous: '4.50%',
    forecast: '4.50%',
  }
];

export default function TradingCalendar() {
  const [selectedCurrency, setSelectedCurrency] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');

  const filteredEvents = events.filter(event => {
    const matchesCurrency = selectedCurrency === 'all' || event.currency === selectedCurrency;
    const matchesImpact = selectedImpact === 'all' || event.impact === selectedImpact;
    return matchesCurrency && matchesImpact;
  });

  const getImpactColor = (impact: string) => {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex bg-gray-800/30 rounded-lg p-1">
          <button
            onClick={() => setSelectedCurrency('all')}
            className={`px-3 py-1 rounded-md text-sm ${
              selectedCurrency === 'all'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCurrency('USD')}
            className={`px-3 py-1 rounded-md text-sm ${
              selectedCurrency === 'USD'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            USD
          </button>
          <button
            onClick={() => setSelectedCurrency('EUR')}
            className={`px-3 py-1 rounded-md text-sm ${
              selectedCurrency === 'EUR'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            EUR
          </button>
        </div>

        <div className="flex bg-gray-800/30 rounded-lg p-1">
          <button
            onClick={() => setSelectedImpact('all')}
            className={`px-3 py-1 rounded-md text-sm ${
              selectedImpact === 'all'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Impact
          </button>
          <button
            onClick={() => setSelectedImpact('high')}
            className={`px-3 py-1 rounded-md text-sm ${
              selectedImpact === 'high'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            High Impact
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="glass-card p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getImpactColor(event.impact)}`}>
                  <AlertTriangle size={20} />
                </div>
                
                <div>
                  <h4 className="text-white font-medium">{event.title}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <CalendarIcon size={14} />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Clock size={14} />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <DollarSign size={14} />
                      {event.currency}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-400">Previous</div>
                <div className="text-white font-medium">{event.previous}</div>
                <div className="text-sm text-gray-400 mt-1">Forecast</div>
                <div className="text-white font-medium">{event.forecast}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}