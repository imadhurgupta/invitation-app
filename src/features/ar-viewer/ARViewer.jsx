import React, { useState } from 'react';
import { Camera, X, Smartphone } from 'lucide-react';

const ARViewer = ({ onClose }) => {
  const [permissionGranted, setPermission] = useState(false);

  // Simulate camera permission request
  const handleStart = () => {
    setTimeout(() => setPermission(true), 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {!permissionGranted ? (
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Smartphone className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">AR Experience</h2>
          <p className="text-gray-400 mb-8">
            Point your camera at the physical invitation card to watch the couple's video come to life.
          </p>
          <button 
            onClick={handleStart}
            className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition"
          >
            Start Camera
          </button>
          <button onClick={onClose} className="mt-4 text-gray-500 text-sm">Cancel</button>
        </div>
      ) : (
        <div className="relative w-full h-full">
          {/* Mock Camera Feed Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2969&auto=format&fit=crop')] bg-cover opacity-60"></div>
          
          {/* The "AR" Content Overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-48 border-2 border-brand-500 rounded-lg shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <span className="text-white font-bold animate-bounce">Scanning Target...</span>
          </div>

          <button onClick={onClose} className="absolute top-8 right-8 text-white p-2 bg-black/20 rounded-full backdrop-blur">
            <X size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ARViewer;