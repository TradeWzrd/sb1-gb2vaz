import React from 'react';
import { BarChart3, Globe2, Copy, BookOpen } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Master Forex Trading with</span>
          <span className="block text-indigo-600">Artificial Intelligence</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Advanced market analysis, real-time signals, and professional tools to enhance your trading strategy.
          Join thousands of successful traders who trust Trade Wzrd.
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent 
              text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg md:px-10"
          >
            Start Trading
          </button>
          <button className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-3 border 
            border-gray-300 text-base font-medium rounded-md text-gray-700 dark:text-white bg-white dark:bg-gray-800 
            hover:bg-gray-50 dark:hover:bg-gray-700 md:text-lg md:px-10"
          >
            Watch Demo
          </button>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1"></div>
          <div className="flex-1 w-full bg-gray-800"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <img
            className="relative rounded-lg shadow-lg"
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80"
            alt="Trading Platform Interface"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;