import React from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, X, Book, Video, MessageCircle,
  Mail, Phone, Globe, ArrowRight, FileText,
  Lightbulb, Rocket
} from 'lucide-react';
import { BackgroundGradient } from '../ui/BackgroundGradient';
import { ShimmerButton } from '../ui/ShimmerButton';

interface HelpPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpPanel({ isOpen, onClose }: HelpPanelProps) {
  const panelVariants = {
    open: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: { 
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const resources = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of TradeWzrd',
      icon: Rocket,
      link: '#'
    },
    {
      title: 'User Guide',
      description: 'Detailed platform documentation',
      icon: Book,
      link: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step visual guides',
      icon: Video,
      link: '#'
    },
    {
      title: 'Trading Tips',
      description: 'Best practices and strategies',
      icon: Lightbulb,
      link: '#'
    }
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Help Panel */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={panelVariants}
        className="fixed inset-y-0 right-0 w-96 bg-gray-900 border-l border-gray-800 shadow-xl z-50"
      >
        <BackgroundGradient className="h-full">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <HelpCircle className="text-indigo-500" size={24} />
                <h2 className="text-xl font-bold text-white">Help & Support</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="text-gray-400 hover:text-white" size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto">
              {/* Quick Help */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400">Quick Help</h3>
                <div className="grid grid-cols-2 gap-3">
                  {resources.map((resource) => (
                    <a
                      key={resource.title}
                      href={resource.link}
                      className="p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors group"
                    >
                      <resource.icon 
                        size={20} 
                        className="text-indigo-500 mb-2 group-hover:scale-110 transition-transform" 
                      />
                      <h4 className="text-white font-medium">{resource.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">{resource.description}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Options */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400">Contact Us</h3>
                <div className="space-y-3">
                  <button className="w-full p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageCircle size={20} className="text-green-500" />
                      <div className="text-left">
                        <div className="text-white font-medium">Live Chat</div>
                        <div className="text-sm text-gray-400">Available 24/7</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-gray-400" />
                  </button>

                  <button className="w-full p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail size={20} className="text-blue-500" />
                      <div className="text-left">
                        <div className="text-white font-medium">Email Support</div>
                        <div className="text-sm text-gray-400">Response within 24h</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-gray-400" />
                  </button>

                  <button className="w-full p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Phone size={20} className="text-purple-500" />
                      <div className="text-left">
                        <div className="text-white font-medium">Phone Support</div>
                        <div className="text-sm text-gray-400">Premium members only</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>

              {/* FAQ */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400">FAQ</h3>
                <div className="space-y-3">
                  <button className="w-full p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors text-left">
                    <h4 className="text-white font-medium">How do I connect my broker?</h4>
                    <p className="text-sm text-gray-400 mt-1">Learn about our broker integration options</p>
                  </button>

                  <button className="w-full p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors text-left">
                    <h4 className="text-white font-medium">What trading features are available?</h4>
                    <p className="text-sm text-gray-400 mt-1">Explore our trading tools and capabilities</p>
                  </button>

                  <button className="w-full p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors text-left">
                    <h4 className="text-white font-medium">How secure is my data?</h4>
                    <p className="text-sm text-gray-400 mt-1">Learn about our security measures</p>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <ShimmerButton onClick={onClose} className="w-full">
                Close Help
              </ShimmerButton>
            </div>
          </div>
        </BackgroundGradient>
      </motion.div>
    </>
  );
}