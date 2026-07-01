import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Info, ClipboardList, ChevronRight } from 'lucide-react';
import { GOOGLE_FORMS } from '../config';

const ProjectsInfo = () => {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-center space-x-3 py-1">
        <div className="w-10 h-10 rounded-xl bg-cyber-neonBlue/15 text-cyber-neonBlue flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <Lightbulb size={22} className="animate-pulse" />
        </div>
        <div>
          <h2 className="font-display font-black text-xl uppercase tracking-wide">Project Exhibition</h2>
          <p className="text-[10px] text-gray-400 font-mono tracking-wider">INNOVISION '26 COMPETITION</p>
        </div>
      </div>

      <motion.div
        key="details-tab"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
      >
        {/* Left Column: Description & Rules */}
        <div className="md:col-span-2 space-y-4">
          {/* Description card */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3">
            <h3 className="font-display font-extrabold text-sm text-cyber-neonBlue flex items-center space-x-2">
              <Info size={16} />
              <span>Event Description</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              Innovision Project Exhibition provides engineering students an international platform to showcase their technical prowess.
            </p>
          </div>

          {/* Rules card */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3">
            <h3 className="font-display font-extrabold text-sm text-cyber-neonPurple flex items-center space-x-2">
              <ClipboardList size={16} />
              <span>Guidelines &amp; Rules</span>
            </h3>
            <ul className="space-y-2 text-xs text-gray-300 list-none pl-1">
              <li className="flex items-start space-x-2 font-light">
                <ChevronRight size={14} className="text-cyber-neonPurple mt-0.5 flex-shrink-0" />
                <span>A team can consist of <strong>1 to 4 members</strong> (including the team leader).</span>
              </li>
              <li className="flex items-start space-x-2 font-light">
                <ChevronRight size={14} className="text-cyber-neonPurple mt-0.5 flex-shrink-0" />
                <span>Students must carry their college identity cards during the expo.</span>
              </li>
              <li className="flex items-start space-x-2 font-light">
                <ChevronRight size={14} className="text-cyber-neonPurple mt-0.5 flex-shrink-0" />
                <span>Projects must be original fabrications/software. Working prototypes are mandatory for exhibition.</span>
              </li>
              <li className="flex items-start space-x-2 font-light">
                <ChevronRight size={14} className="text-cyber-neonPurple mt-0.5 flex-shrink-0" />
                <span>Exhibition booths, tables, power outlets, and Wi-Fi will be provided. Please bring extension boards if needed.</span>
              </li>
              <li className="flex items-start space-x-2 font-light">
                <ChevronRight size={14} className="text-cyber-neonPurple mt-0.5 flex-shrink-0" />
                <span>All participants will receive physical certificates counting for KTU Activity Points.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Registration Card & CTA */}
        <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-4 md:col-span-1 sticky top-24">
          <h3 className="font-display font-extrabold text-sm text-cyber-neonBlue flex items-center space-x-2">
            <Info size={16} />
            <span>Registration Details</span>
          </h3>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-3.5">
            <div>
              <p className="text-[10px] text-gray-400 font-mono">PRIZE POOL</p>
              <p className="text-base font-bold text-cyber-neonBlue">₹5,000</p>
            </div>
            <div className="border-t border-cyber-border/40 pt-3.5">
              <p className="text-[10px] text-gray-400 font-mono">REGISTRATION FEE</p>
              <p className="text-base font-bold text-cyber-neonPurple">₹400 per Team</p>
            </div>
          </div>

          <a
            href={GOOGLE_FORMS.PROJECTS}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-cyber-neonBlue text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:brightness-110 active:scale-95 transition-all duration-300 text-center shadow-md shadow-cyber-neonBlue/10"
          >
            <span>Apply Now</span>
            <ChevronRight size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsInfo;
