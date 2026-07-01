import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Lightbulb, FileText, HelpCircle, PhoneCall } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/projects', label: 'Projects', icon: Lightbulb },
    { path: '/papers', label: 'Papers', icon: FileText },
    { path: '/faq', label: 'FAQ', icon: HelpCircle },
    { path: '/contact', label: 'Contact', icon: PhoneCall },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel-heavy border-t border-cyber-border rounded-t-2xl safe-pb shadow-[0_-8px_30px_rgba(168,85,247,0.06)] md:hidden">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full py-2 text-xs transition-all duration-300 ${
                  isActive
                    ? 'text-cyber-neonBlue scale-110 font-medium'
                    : 'text-gray-400 hover:text-gray-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1 rounded-xl transition-all duration-300 ${
                    isActive ? 'bg-cyber-neonBlue/10 text-cyber-neonBlue shadow-[0_0_10px_rgba(0,240,255,0.2)]' : ''
                  }`}>
                    <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                  </div>
                  <span className="mt-1 text-[10px] tracking-wide">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
