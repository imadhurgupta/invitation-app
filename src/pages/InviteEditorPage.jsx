import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Download, ChevronLeft, Sparkles, Share2, Layers, Monitor, Smartphone } from 'lucide-react';
import { saveAs } from 'file-saver';

// Components
import Toolbar from '../components/canvas/Toolbar';
import EditorCanvas from '../components/canvas/EditorCanvas';
import AIGeneratorModal from '../components/canvas/AIGeneratorModal';

// Hooks & Services
import { useAuth } from '../context/AuthContext';
import { saveProject } from '../services/inviteService';

const InviteEditorPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Refs to access Canvas methods
  const canvasRef = useRef(null);
  
  // Local State
  const [isSaving, setIsSaving] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [viewMode, setViewMode] = useState('mobile'); // 'mobile' or 'desktop'

  // --- Handlers ---

  // 1. Add Text/Shapes (Bridge between Toolbar and Canvas)
  const handleAddText = (text = "Double click to edit") => {
    canvasRef.current?.addText(text);
  };

  const handleAddRect = () => canvasRef.current?.addRectangle();
  
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (f) => canvasRef.current?.addImage(f.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => canvasRef.current?.deleteSelected();

  // 2. AI Magic Handler
  const handleAISelection = (generatedText) => {
    handleAddText(generatedText); // Add the AI text directly to canvas
    setShowAIModal(false);
  };

  // 3. Save to Firebase
  const handleSaveProject = async () => {
    if (!currentUser) return alert("Please login to save.");
    
    setIsSaving(true);
    try {
      const canvasJson = canvasRef.current?.toJSON(); // Get raw FabricJS data
      const thumbnail = canvasRef.current?.downloadImage(); // Get DataURL
      
      await saveProject(currentUser.uid, {
        title: "My Awesome Invite", // You could add a title input prompt here
        thumbnailUrl: thumbnail // In real app, upload this to Storage first, then save URL
      }, canvasJson);
      
      alert("Project saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save project.");
    } finally {
      setIsSaving(false);
    }
  };

  // 4. Download as Image
  const handleDownload = () => {
    const dataUrl = canvasRef.current?.downloadImage();
    saveAs(dataUrl, 'invitation.png');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden font-sans">
      
      {/* --- Header --- */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="font-bold text-gray-800 text-lg leading-tight">Untitled Design</h1>
            <span className="text-xs text-gray-400">Saving changes locally...</span>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="hidden md:flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setViewMode('desktop')}
            className={`p-1.5 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-white shadow text-brand-600' : 'text-gray-400'}`}
          >
            <Monitor size={18} />
          </button>
          <button 
            onClick={() => setViewMode('mobile')}
            className={`p-1.5 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-white shadow text-brand-600' : 'text-gray-400'}`}
          >
            <Smartphone size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAIModal(true)}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold border border-purple-200 hover:shadow-md transition-all"
          >
            <Sparkles size={16} /> Magic Write
          </button>

          <div className="h-8 w-px bg-gray-200 mx-2"></div>

          <button 
            onClick={handleDownload}
            className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
            title="Download PNG"
          >
            <Download size={20} />
          </button>
          
          <button 
            onClick={handleSaveProject}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20 disabled:opacity-70"
          >
            {isSaving ? 'Saving...' : (
              <>
                <Save size={18} /> Save
              </>
            )}
          </button>
        </div>
      </header>

      {/* --- Main Workspace --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Toolbar */}
        <Toolbar 
          onAddText={() => handleAddText()}
          onAddRect={handleAddRect}
          onAddImage={handleAddImage}
          onDelete={handleDelete}
          onOpenAI={() => setShowAIModal(true)} // Mobile trigger for AI
        />

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-100 relative overflow-auto flex items-center justify-center p-8 canvas-container">
          
          <div className={`transition-all duration-300 shadow-2xl ${
            viewMode === 'mobile' ? 'w-[375px] h-[667px]' : 'w-[800px] h-[600px]'
          }`}>
             {/* We pass dimensions based on the View Mode. 
                The key prop forces re-render if mode changes 
             */}
            <EditorCanvas 
              ref={canvasRef} 
              width={viewMode === 'mobile' ? 375 : 800} 
              height={viewMode === 'mobile' ? 667 : 600} 
              key={viewMode}
            />
          </div>

        </div>

        {/* Right Sidebar (Layers / Properties) - Placeholder for future expansion */}
        <div className="w-64 bg-white border-l border-gray-200 hidden lg:flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <Layers size={16} /> Layers
            </h3>
          </div>
          <div className="p-4 text-center text-gray-400 text-sm mt-10">
            <p>Select an object to edit properties</p>
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      <AIGeneratorModal 
        isOpen={showAIModal} 
        onClose={() => setShowAIModal(false)}
        onSelectText={handleAISelection}
      />

    </div>
  );
};

export default InviteEditorPage;