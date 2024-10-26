import React from 'react';
import { BarChart3, Globe2, Copy, BookOpen } from 'lucide-react';

const features = [
  {
    name: 'Market Sentiment Analysis',
    description: 'Real-time sentiment indicators based on news, social media, and market data.',
    icon: BarChart3,
  },
  {
    name: 'Global Market Coverage',
    description: 'Trade major currency pairs with comprehensive market analysis and insights.',
    icon: Globe2,
  },
  {
    name: 'Copy Trading',
    description: 'Follow and automatically copy trades from successful traders worldwide.',
    icon: Copy,
  },
  {
    name: 'Trade Journal',
    description: 'Track your performance with our advanced trade journaling system.',
    icon: BookOpen,
  },
];

function Features() {
  return (
    <div className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Everything you need to trade successfully
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            Our platform combines advanced technology with user-friendly tools to help you make informed trading decisions.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute h-12 w-12 rounded-md bg-indigo-500 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-white">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;