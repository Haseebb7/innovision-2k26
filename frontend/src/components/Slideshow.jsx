import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

import slide1 from '../assets/slideshow/slide1.jpg';
import slide2 from '../assets/slideshow/slide2.jpg';
import slide3 from '../assets/slideshow/slide3.jpg';
import slide4 from '../assets/slideshow/slide4.jpg';
import slide5 from '../assets/slideshow/slide5.jpg';

const slideshowItems = [
  {
    image: slide1,
    title: "Inaugural Ceremony",
    desc: "Opening of Innovision '25 with prestigious guests & students"
  },
  {
    image: slide2,
    title: "Project Expo '25 Team",
    desc: "The hands and brains behind this event."
  },
  {
    image: slide3,
    title: "Paper Presentation",
    desc: "Delegates and researchers presenting innovative papers"
  },
  {
    image: slide4,
    title: "Research Discourse",
    desc: "Scholars sharing research in AI, Cyber Security & tech"
  },
  {
    image: slide5,
    title: "Grand Finale & Awards",
    desc: "Celebrating creativity, hard work & academic success"
  }
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideshowItems.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideshowItems.length) % slideshowItems.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // High-end crossfade & scale animation variants
  const slideVariants = {
    initial: (dir) => ({
      opacity: 0,
      scale: 1.05,
      x: dir > 0 ? 30 : -30
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1]
      }
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 0.95,
      x: dir > 0 ? -30 : 30,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1]
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5 }}
      className="glass-panel rounded-2xl p-5 border border-white/5 space-y-4 relative overflow-hidden w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div className="flex justify-between items-center px-1">
        <h3 className="font-display font-extrabold text-sm tracking-wide text-gray-800 flex items-center space-x-2">
          <span className="w-1.5 h-3.5 bg-cyber-neonPurple rounded-full"></span>
          <span>Relive Innovision '25</span>
        </h3>

        {/* Play/Pause indicator */}
        <span className="text-[9px] font-mono text-gray-400 flex items-center space-x-1 uppercase tracking-wider bg-white/40 border border-cyber-border/40 px-2 py-0.5 rounded-full">
          {isPlaying ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping inline-block mr-1"></span>
              <span>Autoplay</span>
            </>
          ) : (
            <>
              <Pause size={8} className="inline mr-1 text-cyber-neonPurple" />
              <span>Paused</span>
            </>
          )}
        </span>
      </div>

      {/* Slide frame */}
      <div className="relative h-56 md:h-96 w-full rounded-xl overflow-hidden bg-slate-950 border border-cyber-border/30 group shadow-inner">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slideshowItems[currentIndex].image}
              className="w-full h-full object-cover"
              alt={slideshowItems[currentIndex].title}
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none"></div>

            {/* Info Overlay inside frame */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-left pointer-events-none">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-block text-[9px] font-bold text-cyber-neonPurple bg-cyber-neonPurple/20 border border-cyber-neonPurple/30 px-2 py-0.5 rounded-md mb-1.5 uppercase tracking-widest font-mono"
              >
                Innovision '25
              </motion.span>
              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-display font-bold text-white tracking-wide"
              >
                {slideshowItems[currentIndex].title}
              </motion.h4>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[10px] text-gray-300 font-light mt-0.5 leading-snug line-clamp-2"
              >
                {slideshowItems[currentIndex].desc}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons (Only visible on hover / touchscreen interaction) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 active:scale-90 text-white flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 cursor-pointer shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 active:scale-90 text-white flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 cursor-pointer shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Bullet Indicators & Play Pause Button */}
      <div className="flex justify-between items-center px-1">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1 rounded-lg text-gray-400 hover:text-cyber-neonPurple hover:bg-cyber-neonPurple/5 transition-all cursor-pointer active:scale-95"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} />}
        </button>

        <div className="flex space-x-1.5">
          {slideshowItems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex
                ? 'w-6 bg-cyber-neonPurple'
                : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Dummy spacing element to match layout symmetry */}
        <div className="w-5"></div>
      </div>
    </motion.div>
  );
};

export default Slideshow;
