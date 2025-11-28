import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '@/features/dashboard/Dashboard';
import InviteEditorPage from '@/pages/InviteEditorPage'; // From previous turn
import { AuthProvider } from '@/context/AuthContext'; // Basic Context Wrapper

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<InviteEditorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;