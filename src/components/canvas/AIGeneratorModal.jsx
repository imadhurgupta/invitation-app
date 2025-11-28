import React, { useState } from 'react';
import { functions } from '../../config/firebase'; 
import { httpsCallable } from 'firebase/functions';
import { Sparkles, Wand2, X, Copy } from 'lucide-react';

const AIGeneratorModal = ({ isOpen, onClose, onSelectText }) => {
  const [eventType, setEventType] = useState('Wedding');
  const [tone, setTone] = useState('Formal');
  const [details, setDetails] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Calls the 'generateInviteText' function in /firebase/functions/src/index.ts
      const generateText = httpsCallable(functions, 'generateInviteText');
      const response = await generateText({ type: eventType, tone, name: details });
      setResults(response.data.suggestions || []);
    } catch (error) {
      console.error("AI Error:", error);
      // Fallback for demo purposes if backend isn't deployed yet
      setResults([
        `Together with their families, ${details} invite you to celebrate their wedding.`,
        `You are cordially invited to the ${eventType} of ${details}.`
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-purple-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 flex justify-between items-center border-b border-purple-100">
          <div className="flex items-center gap-2">
            <div className="bg-white p-2 rounded-lg shadow-sm text-purple-600">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">AI Text Assistant</h3>
              <p className="text-xs text-gray-500">Generate professional invites in seconds</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 bg-white p-1 rounded-full"><X size={20}/></button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Event Type</label>
              <select 
                value={eventType} onChange={(e) => setEventType(e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-lg border border-gray-200 focus:border-purple-500 outline-none text-sm"
              >
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Corporate</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Tone</label>
              <select 
                value={tone} onChange={(e) => setTone(e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-lg border border-gray-200 focus:border-purple-500 outline-none text-sm"
              >
                <option>Formal</option>
                <option>Funny</option>
                <option>Modern</option>
                <option>Casual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Key Details (Names, Date)</label>
            <input 
              type="text" 
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 outline-none text-sm focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all"
              placeholder="e.g. Madhur & Tanisha, Dec 15th at The Grand Hotel"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3.5 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-200 disabled:opacity-70"
          >
            {loading ? <span className="animate-spin text-xl">◌</span> : <Wand2 size={18} />}
            {loading ? 'Writing...' : 'Generate Text'}
          </button>

          {/* Results Area */}
          {results.length > 0 && (
            <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
               <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Click to add to canvas</label>
              <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                {results.map((text, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => { onSelectText(text); onClose(); }}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 cursor-pointer group transition-all text-sm text-gray-600 leading-relaxed relative"
                  >
                    "{text}"
                    <div className="absolute top-2 right-2 bg-white p-1 rounded shadow-sm opacity-0 group-hover:opacity-100 text-purple-600 transition-opacity">
                      <Copy size={12} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGeneratorModal;