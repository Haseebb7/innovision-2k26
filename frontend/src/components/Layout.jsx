import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import logo from '../assets/logo.png';

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
              <img src={logo} alt="Innovision Logo" className="w-12 h-12 object-contain mix-blend-multiply" />
              <div>
                <h1 className="font-display font-bold text-sm tracking-wide text-black">
                  INNOVISION '26
                </h1>
              </div>
            </Link>

            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-cyber-neonPurple font-bold px-2.5 py-0.5 rounded-full bg-cyber-neonPurple/10 border border-cyber-neonPurple/20 uppercase">
                ICET
              </span>
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
