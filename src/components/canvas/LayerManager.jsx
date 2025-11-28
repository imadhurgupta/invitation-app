import React from 'react';
import { Layers, ArrowUp, ArrowDown } from 'lucide-react';

const LayerManager = ({ onBringForward, onSendBackward }) => {
  return (
    <div className="bg-white border-t border-gray-100 p-4">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <Layers size={14} /> Layer Order
      </h3>
      
      <div className="flex gap-2">
        <button 
          onClick={onBringForward}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-xs font-medium transition-colors border border-gray-200"
        >
          <ArrowUp size={14} />
          Bring Front
        </button>
        
        <button 
          onClick={onSendBackward}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-xs font-medium transition-colors border border-gray-200"
        >
          <ArrowDown size={14} />
          Send Back
        </button>
      </div>
    </div>
  );
};

export default LayerManager;