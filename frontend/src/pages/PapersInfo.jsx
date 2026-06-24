import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Info, ChevronRight } from 'lucide-react';
import { GOOGLE_FORMS } from '../config';

const PapersInfo = () => {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-center space-x-3 py-1">
        <div className="w-10 h-10 rounded-xl bg-cyber-neonPurple/15 text-cyber-neonPurple flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.1)]">
          <FileText size={22} className="animate-pulse" />
        </div>
        <div>
          <h2 className="font-display font-black text-xl uppercase tracking-wide">Paper Presentation</h2>
          <p className="text-[10px] text-gray-400 font-mono tracking-wider">INNOVISION '26 CONFERENCE</p>
        </div>
      </div>

      <motion.div
        key="details-tab"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Event Info Card */}
        <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3">
          <h3 className="font-display font-extrabold text-sm text-cyber-neonPurple flex items-center space-x-2">
            <Info size={16} />
            <span>Conference Overview</span>
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed font-light">
            Innovision Paper Presentation invites research-driven minds to present their academic and industrial insights.
          </p>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-gray-400 font-mono">PRIZE POOL</p>
              <p className="text-sm font-bold text-cyber-neonPurple">₹5,000</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-mono">REGISTRATION FEE</p>
              <p className="text-sm font-bold text-cyber-neonBlue">₹250 per Paper</p>
            </div>
          </div>
        </div>

        {/* Presentation rules */}
        <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3">
          <h3 className="font-display font-extrabold text-sm text-gray-200">Guidelines</h3>
          <ul className="space-y-2 text-xs text-gray-300 list-none pl-1">
            <li className="flex items-start space-x-2 font-light">
              <ChevronRight size={14} className="text-cyber-neonPurple mt-0.5 flex-shrink-0" />
              <span>The paper must be submitted in standard <strong>IEEE format</strong> in PDF format (Max 10MB).</span>
            </li>
            <li className="flex items-start space-x-2 font-light">
              <ChevronRight size={14} className="text-cyber-neonPurple mt-0.5 flex-shrink-0" />
              <span>Presentation time: <strong>8 minutes</strong> for presentation and <strong>2 minutes</strong> for Q&amp;A.</span>
            </li>
          </ul>
        </div>

        {/* Quick CTA to Form */}
        <a
          href={GOOGLE_FORMS.PAPERS}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-neonPurple to-cyber-neonBlue text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:brightness-110 active:scale-95 transition-all duration-300 text-center"
        >
          <span>Apply Now</span>
          <ChevronRight size={16} />
        </a>
      </motion.div>
    </div>
  );
};

export default PapersInfo;
