import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShieldAlert, LogIn, Lock } from 'lucide-react';
import BottomNav from './BottomNav';

const Layout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f3f0fa] via-[#f7f5fb] to-[#f0f4fc] text-gray-100 flex justify-center items-stretch relative overflow-x-hidden">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none hidden md:block"></div>
      
      {/* Desktop Tech-mesh Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6e4f3_1px,transparent_1px),linear-gradient(to_bottom,#e6e4f3_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 pointer-events-none hidden md:block"></div>
      
      {/* Centered Mobile Wrapper */}
      <div className="w-full md:max-w-md bg-cyber-bg border-x border-cyber-border/40 min-h-screen flex flex-col pb-20 shadow-2xl relative z-10">
        
        {/* Header */}
        {!isAdminPage && (
          <header className="sticky top-0 z-40 glass-panel border-b border-cyber-border/60 py-3 px-4 flex justify-between items-center shadow-sm safe-pt">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyber-neonBlue to-cyber-neonPurple flex items-center justify-center font-display font-extrabold text-sm text-white tracking-tighter shadow-md shadow-cyber-neonBlue/20">
                IN
              </div>
              <div>
                <h1 className="font-display font-bold text-sm tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyber-neonBlue to-cyber-neonPurple">
                  INNOVISION '26
                </h1>
              </div>
            </Link>

            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-cyber-neonPurple font-bold px-2.5 py-0.5 rounded-full bg-cyber-neonPurple/10 border border-cyber-neonPurple/20 uppercase">
                ICET
              </span>
              <Link 
                to="/admin/login" 
                title="Admin Panel"
                className="p-2 rounded-lg bg-cyber-darkBlue hover:bg-cyber-neonBlue/10 hover:text-cyber-neonBlue border border-cyber-border transition-all duration-300"
              >
                <Lock size={14} className="text-gray-400" />
              </Link>
            </div>
          </header>
        )}

        {/* Content Outlet */}
        <main className="flex-grow p-4 flex flex-col">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        {!isAdminPage && <BottomNav />}
      </div>
    </div>
  );
};

export default Layout;
