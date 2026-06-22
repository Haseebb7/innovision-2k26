import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertCircle, RefreshCw, ChevronLeft } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { admin, login } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (admin) {
      navigate('/admin/dashboard');
    }
  }, [admin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const result = await login(email, password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 py-6 flex flex-col justify-center min-h-[75vh]">
      {/* Back button */}
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors duration-200 self-start"
      >
        <ChevronLeft size={16} />
        <span>Back to Home</span>
      </button>

      {/* Login Card */}
      <div className="glass-panel rounded-2xl p-6 border border-cyber-neonBlue/20 shadow-[0_0_20px_rgba(0,240,255,0.1)] space-y-5">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-xl bg-cyber-neonBlue/10 text-cyber-neonBlue flex items-center justify-center mx-auto mb-2 border border-cyber-neonBlue/20">
            <Lock size={22} />
          </div>
          <h2 className="font-display font-black text-lg uppercase tracking-wide">Admin Portal</h2>
          <p className="text-[10px] text-gray-400 font-mono">SECURE ADMIN LOGIN</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start space-x-2 font-mono">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] text-gray-400 font-mono uppercase">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={14} />
              <input
                type="email"
                placeholder="admin@innovision.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-xs glass-input"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-gray-400 font-mono uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={14} />
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-xs glass-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-neonBlue to-cyber-neonPurple text-cyber-bg font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>Logging In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-white/5">
          <p className="text-[9px] text-gray-500 font-mono">
            Default credentials for testing:
            <br />
            Email: <span className="text-gray-400 font-semibold">admin@innovision.com</span>
            <br />
            Password: <span className="text-gray-400 font-semibold">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
