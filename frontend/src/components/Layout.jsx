import React from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import logo from '../assets/logo.png';

const Layout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 flex justify-center items-stretch relative overflow-x-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyber-neonPurple/10 rounded-full blur-[100px] pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyber-neonBlue/10 rounded-full blur-[100px] pointer-events-none hidden md:block"></div>
      
      {/* Desktop Tech-mesh Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none hidden md:block"></div>
      
      {/* Centered Mobile Wrapper / Responsive Desktop Container */}
      <div className="w-full md:max-w-5xl lg:max-w-7xl bg-cyber-bg md:border-x border-cyber-border/40 min-h-screen flex flex-col pb-20 md:pb-8 shadow-2xl relative z-10">
        
        {/* Header */}
        {!isAdminPage && (
          <header className="sticky top-0 z-40 glass-panel border-b border-cyber-border/60 py-3 px-4 md:px-8 flex justify-between items-center shadow-sm safe-pt">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-white/95 px-2 py-1 rounded-xl shadow-inner">
                <img src={logo} alt="Innovision Logo" className="w-auto h-10 md:h-12 object-contain mix-blend-multiply" />
              </div>
              <div>
                <h1 className="font-display font-extrabold text-sm md:text-base tracking-wider text-gray-100 uppercase">
                  INNOVISION'26
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold">
              <NavLink to="/" className={({ isActive }) => isActive ? "text-cyber-neonBlue font-bold" : "text-gray-400 hover:text-cyber-neonBlue transition-colors duration-200"}>Home</NavLink>
              <NavLink to="/projects" className={({ isActive }) => isActive ? "text-cyber-neonBlue font-bold" : "text-gray-400 hover:text-cyber-neonBlue transition-colors duration-200"}>Projects</NavLink>
              <NavLink to="/papers" className={({ isActive }) => isActive ? "text-cyber-neonBlue font-bold" : "text-gray-400 hover:text-cyber-neonBlue transition-colors duration-200"}>Papers</NavLink>
              <NavLink to="/faq" className={({ isActive }) => isActive ? "text-cyber-neonBlue font-bold" : "text-gray-400 hover:text-cyber-neonBlue transition-colors duration-200"}>FAQ</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? "text-cyber-neonBlue font-bold" : "text-gray-400 hover:text-cyber-neonBlue transition-colors duration-200"}>Contact</NavLink>
            </nav>

            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-cyber-neonPurple font-bold px-2.5 py-0.5 rounded-full bg-cyber-neonPurple/10 border border-cyber-neonPurple/20 uppercase">
                ICET
              </span>
            </div>
          </header>
        )}

        {/* Content Outlet */}
        <main className="flex-grow p-4 md:p-8 flex flex-col">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        {!isAdminPage && <BottomNav />}
      </div>
    </div>
  );
};

export default Layout;
