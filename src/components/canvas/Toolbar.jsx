import React from 'react';
import { Type, Square, Image as ImageIcon, Sparkles, Trash2, MousePointer2 } from 'lucide-react';

const Toolbar = ({ onAddText, onAddRect, onAddImage, onDelete, onOpenAI }) => {
  
  const ToolButton = ({ onClick, icon: Icon, label, danger, special }) => (
    <button 
      onClick={onClick}
      className={`
        group relative flex flex-col items-center justify-center w-16 h-16 mb-3 rounded-xl transition-all
        ${danger 
          ? 'text-red-400 hover:bg-red-50 hover:text-red-600' 
          : special 
            ? 'text-purple-600 bg-purple-50 hover:bg-purple-100 hover:shadow-md'
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
        }
      `}
    >
      <Icon size={24} strokeWidth={2} />
      <span className="text-[10px] font-medium mt-1">{label}</span>
      
      {/* Tooltip */}
      <div className="absolute left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 ml-2">
        {label}
      </div>
    </button>
  );

  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 z-10 h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      
      {/* Main Tools */}
      <div className="space-y-1">
        <ToolButton icon={MousePointer2} label="Select" />
        <ToolButton icon={Type} label="Text" onClick={() => onAddText()} />
        <ToolButton icon={Square} label="Shape" onClick={onAddRect} />
        
        {/* Magic AI Button */}
        <ToolButton icon={Sparkles} label="Magic AI" special onClick={onOpenAI} />
        
        {/* Image Upload Input Wrapper */}
        <label className="cursor-pointer group relative flex flex-col items-center justify-center w-16 h-16 mb-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all">
          <input type="file" accept="image/*" className="hidden" onChange={onAddImage} />
          <ImageIcon size={24} />
          <span className="text-[10px] font-medium mt-1">Upload</span>
        </label>
      </div>

      <div className="flex-grow" />

      {/* Bottom Actions */}
      <ToolButton icon={Trash2} label="Delete" danger onClick={onDelete} />
    </div>
  );
};

export default Toolbar;