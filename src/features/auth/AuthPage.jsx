import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Importing from Context directly
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // UI State
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Get functions from our AuthContext
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        // "signup" matches the function name in AuthContext
        await signup(email, password, name);
      }
      navigate('/'); // Redirect to Dashboard on success
    } catch (err) {
      // Clean up Firebase error messages
      const msg = err.message.replace('Firebase: ', '').replace('auth/', '');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError("Google sign-in cancelled or failed.");
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900">
      
      {/* LEFT SIDE: Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-brand-900 relative items-center justify-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000')] bg-cover opacity-20 mix-blend-overlay"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white p-12 max-w-lg">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/10 backdrop-blur-md mb-8 border border-white/10 shadow-2xl">
            <Sparkles size={40} className="text-purple-300" />
          </div>
          <h2 className="text-5xl font-bold mb-6 tracking-tight leading-tight">
            Craft Digital <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-300">Masterpieces</span>
          </h2>
          <p className="text-purple-200 text-lg leading-relaxed">
            Create immersive invitations with Augmented Reality, AI text generation, and real-time guest tracking.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </h1>
            <p className="text-gray-500">
              {isLogin ? 'Enter your credentials to access your account.' : 'Create your account to start designing.'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-3 text-sm border border-red-100">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative group">
                <User className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-brand-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                />
              </div>
            )}
            
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-brand-600 transition-colors" />
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-brand-600 transition-colors" />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>

            <button 
              disabled={loading} 
              className="w-full bg-brand-600 text-white p-4 rounded-xl font-bold hover:bg-brand-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Processing...
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="relative flex py-8 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button 
            type="button" 
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 p-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Sign in with Google
          </button>

          <p className="mt-8 text-center text-gray-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-brand-600 font-bold hover:text-brand-700 hover:underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;