import React from 'react';
import { 
  LayoutDashboard, 
  LineChart, 
  TrendingUp,
  Copy,
  BookOpen,
  Building2,
  Calendar,
  GitCompare,
  Users
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'market', icon: LineChart, label: 'Market Summary' },
  { id: 'sentiment', icon: TrendingUp, label: 'Market Sentiment' },
  { id: 'copy-trading', icon: Copy, label: 'Copy Trading' },
  { id: 'journal', icon: BookOpen, label: 'Trade Journal' },
  { id: 'brokers', icon: Building2, label: 'Broker Comparison' },
  { id: 'calendar', icon: Calendar, label: 'Economic Calendar' },
  { id: 'correlation', icon: GitCompare, label: 'Currency Correlation' },
  { id: 'community', icon: Users, label: 'Community' }
];

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 min-h-screen bg-[#0a0c10] border-r border-gray-800">
      <div className="p-4">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
          <span className="text-xl font-bold text-white">Trade Wzrd</span>
        </div>

        <nav className="mt-8 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                ${activeSection === item.id 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200'}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}