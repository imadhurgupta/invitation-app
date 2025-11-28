import React from 'react';
import Sidebar from '../components/layout/Sidebar'; // Created in previous steps
import Dashboard from '../features/dashboard/Dashboard'; // Created in previous steps

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Hidden on mobile, handled via CSS in component */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 transition-all">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;