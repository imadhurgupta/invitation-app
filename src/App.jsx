import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '/features/dashboard/Dashboard';
import InviteEditorPage from '/pages/InviteEditorPage';
import { AuthPrivder } from '/contexts/AuthContext';

function App() {
  return (
    <AuthPrivder>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invite-editor" element={<InviteEditorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthPrivder>
  );
}

export default App;