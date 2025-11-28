import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { fabric } from 'fabric';

/**
 * The Core Design Engine.
 * Wraps Fabric.js in a React component and exposes control methods via ref.
 */
const EditorCanvas = forwardRef(({ width = 375, height = 667, onSelectionChange }, ref) => {
  const canvasRef = useRef(null); // Ref for the HTML <canvas> element
  const fabricRef = useRef(null); // Ref for the Fabric.js instance

  // 1. Initialize Canvas
  useEffect(() => {
    // Prevent double initialization in React Strict Mode
    if (fabricRef.current) {
      fabricRef.current.dispose();
    }

    const canvas = new fabric.Canvas(canvasRef.current, {
      height: height,
      width: width,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true, // Keeps layer order when selecting
      selection: true, // Enable group selection
    });

    fabricRef.current = canvas;

    // --- Event Listeners ---
    
    // Update parent when selection changes (to show/hide context menus)
    const handleSelection = () => {
      const activeObj = canvas.getActiveObject();
      if (onSelectionChange) onSelectionChange(activeObj);
    };

    canvas.on('selection:created', handleSelection);
    canvas.on('selection:updated', handleSelection);
    canvas.on('selection:cleared', () => {
      if (onSelectionChange) onSelectionChange(null);
    });

    // Cleanup on unmount
    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
  }, []); // Run once on mount

  // 2. Handle Resizing (Mobile vs Desktop view)
  useEffect(() => {
    if (fabricRef.current) {
      fabricRef.current.setDimensions({ width, height });
      fabricRef.current.renderAll();
    }
  }, [width, height]);

  // 3. Expose Methods to Parent (InviteEditorPage.jsx)
  useImperativeHandle(ref, () => ({
    
    // --- Adding Objects ---

    addText: (content = "Double click to edit") => {
      const text = new fabric.IText(content, {
        left: width / 2 - 50,
        top: height / 2 - 20,
        fontFamily: 'Inter',
        fill: '#1e293b', // Slate 800
        fontSize: 24,
        fontWeight: 'bold',
        shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.1)', blur: 5, offsetX: 2, offsetY: 2 })
      });
      fabricRef.current.add(text);
      fabricRef.current.setActiveObject(text);
      fabricRef.current.renderAll();
    },

    addRectangle: () => {
      const rect = new fabric.Rect({
        left: width / 2 - 50,
        top: height / 2 - 50,
        fill: '#c4b5fd', // Brand Purple Light
        width: 100,
        height: 100,
        rx: 10, // Rounded corners
        ry: 10,
        stroke: '#7c3aed',
        strokeWidth: 2
      });
      fabricRef.current.add(rect);
      fabricRef.current.setActiveObject(rect);
      fabricRef.current.renderAll();
    },

    addImage: (url) => {
      fabric.Image.fromURL(url, (img) => {
        // Auto-scale huge images to fit canvas
        const scale = Math.min(
          (width * 0.8) / img.width, 
          (height * 0.8) / img.height
        );
        
        img.set({
          scaleX: scale,
          scaleY: scale,
          left: width / 2 - (img.width * scale) / 2,
          top: height / 2 - (img.height * scale) / 2
        });

        fabricRef.current.add(img);
        fabricRef.current.setActiveObject(img);
        fabricRef.current.renderAll();
      }, { crossOrigin: 'anonymous' }); // Crucial for saving images from external URLs
    },

    // --- Manipulation ---

    deleteSelected: () => {
      const activeObjects = fabricRef.current.getActiveObjects();
      if (activeObjects.length) {
        fabricRef.current.discardActiveObject();
        activeObjects.forEach((obj) => {
          fabricRef.current.remove(obj);
        });
        fabricRef.current.requestRenderAll();
      }
    },

    // --- Data / Export ---

    // Get JSON to save to Firebase
    toJSON: () => {
      return fabricRef.current.toJSON();
    },
    
    // Load JSON from Firebase
    loadFromJSON: (json) => {
      if (!json) return;
      fabricRef.current.loadFromJSON(json, () => {
        fabricRef.current.renderAll();
      });
    },

    // Export High-Res PNG
    downloadImage: () => {
      // 1. Deselect everything so selection box doesn't show in image
      fabricRef.current.discardActiveObject(); 
      fabricRef.current.renderAll();
      
      // 2. Export
      return fabricRef.current.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 2 // 2x resolution for retina/high-quality
      });
    }
  }));

  return (
    <div className="shadow-2xl rounded-sm overflow-hidden bg-white border border-gray-200">
      <canvas ref={canvasRef} />
    </div>
  );
});

export default EditorCanvas;