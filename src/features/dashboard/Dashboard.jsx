import React, { useEffect, useState } from 'react';
import { Plus, Loader, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth'; // Assumes you have this hook
import { getUserProjects } from '@/services/inviteService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getUserProjects(user.uid)
        .then(setProjects)
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Your Events</h1>
          <p className="text-slate-500 mt-2">Manage your digital invitations</p>
        </div>
        <button onClick={logout} className="text-sm text-red-500 flex items-center gap-1 hover:underline">
          <LogOut size={16} /> Sign out
        </button>
      </header>

      {loading ? (
        <div className="flex justify-center py-20"><Loader className="animate-spin text-brand-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create New Card */}
          <button 
            onClick={() => navigate('/create')}
            className="group h-64 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center hover:border-brand-500 hover:bg-brand-50 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="text-brand-600" />
            </div>
            <span className="font-semibold text-gray-500 group-hover:text-brand-700">Create New</span>
          </button>

          {/* Project List */}
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow p-4 flex flex-col">
              <div className="flex-1 bg-gray-100 rounded-xl mb-4 relative overflow-hidden">
                {/* Simulated Thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-xs uppercase font-bold tracking-widest">
                  Preview
                </div>
              </div>
              <h3 className="font-bold text-slate-800">{proj.title}</h3>
              <p className="text-xs text-gray-400 mt-1">Edited {new Date(proj.createdAt?.seconds * 1000).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;