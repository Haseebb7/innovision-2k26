import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Calendar, MapPin, Cpu, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import innovisionHero from '../assets/innovision_hero.png';
import Slideshow from '../components/Slideshow';

const Home = () => {
  return (
    <div className="space-y-6 py-2">
      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col md:grid md:grid-cols-12 md:gap-8 items-center text-center md:text-left space-y-4 md:space-y-0 border border-cyber-neonBlue/20 shadow-[0_0_30px_rgba(0,240,255,0.15)]"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-neonBlue/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyber-neonPurple/10 rounded-full blur-3xl -z-10"></div>

        {/* Left Column (Details) */}
        <div className="flex flex-col items-center md:items-start space-y-4 md:col-span-7 order-2 md:order-1 w-full">
          <span className="text-[10px] text-cyber-neonBlue uppercase tracking-[0.25em] font-mono px-3 py-1 rounded-full bg-cyber-neonBlue/10 border border-cyber-neonBlue/20">
            International Level Symposium
          </span>

          <h1 className="font-display font-extrabold text-xl lg:text-2xl text-gray-100 leading-tight">
            Projects for People, Planet and Progress
          </h1>

          {/* Date & Location */}
          <div className="grid grid-cols-2 gap-2 w-full pt-2">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-xl p-3 text-left">
              <Calendar className="text-cyber-neonBlue" size={16} />
              <div>
                <p className="text-[10px] text-gray-400 font-mono">DATE</p>
                <p className="text-xs font-semibold">23rd &amp; 24th July 2026</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-xl p-3 text-left">
              <MapPin className="text-cyber-neonPurple" size={16} />
              <div>
                <p className="text-[10px] text-gray-400 font-mono">VENUE</p>
                <p className="text-xs font-semibold truncate">Auditorium, ICET</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-y-0 sm:space-x-3 space-y-2 w-full pt-2">
            <Link
              to="/projects"
              className="flex-1 py-3 rounded-xl bg-cyber-neonBlue text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-cyber-neonBlue/20 hover:brightness-105 active:scale-95 transition-all duration-300"
            >
              <span>Project Exhibition Form</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/papers"
              className="flex-1 py-3 rounded-xl bg-cyber-darkBlue hover:bg-cyber-neonPurple hover:text-white border border-cyber-neonPurple/20 text-cyber-neonPurple font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 shadow-sm"
            >
              <span>Paper Presentation Form</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Right Column (Hero Graphic) */}
        <div className="flex justify-center items-center md:col-span-5 order-1 md:order-2 w-full">
          <img
            src={innovisionHero}
            alt="Innovision 2k26 - Project for People, Planet and Progress"
            className="w-full max-w-[240px] md:max-w-full h-auto object-contain my-2 filter dark:invert-0"
          />
        </div>
      </motion.div>

      {/* Slideshow of Innovision '25 */}
      <Slideshow />

      {/* Mini Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="glass-panel rounded-2xl p-4 md:p-6 grid grid-cols-3 gap-2 text-center"
      >
        <div>
          <h4 className="text-xl md:text-2xl font-bold font-display text-cyber-neonBlue">10k+</h4>
          <p className="text-[8px] md:text-[10px] text-gray-400 font-mono uppercase tracking-wider">Prize Pool</p>
        </div>
        <div className="border-x border-white/10">
          <h4 className="text-xl md:text-2xl font-bold font-display text-cyber-neonPurple">2</h4>
          <p className="text-[8px] md:text-[10px] text-gray-400 font-mono uppercase tracking-wider">Major Events</p>
        </div>
        <div>
          <h4 className="text-xl md:text-2xl font-bold font-display text-pink-500">50+</h4>
          <p className="text-[8px] md:text-[10px] text-gray-400 font-mono uppercase tracking-wider">Teams</p>
        </div>
      </motion.div>

      {/* Main Highlights */}
      <div className="grid grid-cols-2 gap-3 md:gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="glass-panel p-4 md:p-6 rounded-xl flex flex-col space-y-2 border border-cyber-neonBlue/10 hover:border-cyber-neonBlue/30 transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-lg bg-cyber-neonBlue/10 text-cyber-neonBlue flex items-center justify-center">
            <Trophy size={16} />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm md:text-base">Cash Prizes</h3>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1 leading-relaxed">
              Exciting cash prizes and recognition certificates for winners &amp; runners.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="glass-panel p-4 md:p-6 rounded-xl flex flex-col space-y-2 border border-cyber-neonPurple/10 hover:border-cyber-neonPurple/30 transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-lg bg-cyber-neonPurple/10 text-cyber-neonPurple flex items-center justify-center">
            <Star size={16} />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm md:text-base">Certificate</h3>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1 leading-relaxed">
              Official KTU Activity Points eligible certificate for all active participants.
            </p>
          </div>
        </motion.div>
      </div>

      {/* About Department Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="glass-panel rounded-2xl p-5 md:p-8 border border-white/5 space-y-3 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Cpu size={80} className="text-white" />
        </div>

        <h2 className="font-display font-extrabold text-base md:text-lg tracking-wide flex items-center space-x-2">
          <ShieldCheck className="text-cyber-neonBlue" size={18} />
          <span>Department of AI &amp; CC</span>
        </h2>

        <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
          The Department of <strong>Artificial Intelligence and Cyber Security (AI&amp;CC)</strong> at <strong>Ilahia College of Engineering and Technology (ICET)</strong> stands at the forefront of modern engineering education.
        </p>
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
          We empower students to solve real-world problems in machine learning, computer vision, data analysis, ethical hacking, and network forensics through practical workshops, lab exposure, and international-level technology expos like Innovision.
        </p>
      </motion.div>
    </div>
  );
};

export default Home;
