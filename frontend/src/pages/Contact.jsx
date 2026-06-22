import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Globe, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [query, setQuery] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.name && query.email && query.message) {
      setFormSubmitted(true);
      setQuery({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="space-y-4 py-2">
      {/* Header */}
      <div className="flex items-center space-x-3 py-1">
        <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-cyber-accent flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <Phone size={20} />
        </div>
        <div>
          <h2 className="font-display font-black text-xl uppercase tracking-wide">Contact Us</h2>
          <p className="text-[10px] text-gray-400 font-mono tracking-wider">GET IN TOUCH WITH THE TEAM</p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="space-y-3">
        {/* Coordinators */}
        <div className="glass-panel rounded-xl p-4 border border-white/5 space-y-3">
          <h3 className="text-xs font-bold text-cyber-neonBlue uppercase tracking-wider font-mono">Event Coordinators</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] text-purple-400 font-bold font-mono">STAFF COORDINATOR</p>
              <p className="text-xs font-semibold">Prof. Shameer M.</p>
              <a href="tel:+919876543210" className="text-[11px] text-gray-300 flex items-center space-x-1 hover:text-cyber-neonBlue transition-colors duration-200">
                <Phone size={10} />
                <span>+91 98765 43210</span>
              </a>
            </div>
            
            <div className="space-y-1">
              <p className="text-[10px] text-purple-400 font-bold font-mono">STUDENT COORDINATOR</p>
              <p className="text-xs font-semibold">Anandhu S.</p>
              <a href="tel:+918765432109" className="text-[11px] text-gray-300 flex items-center space-x-1 hover:text-cyber-neonBlue transition-colors duration-200">
                <Phone size={10} />
                <span>+91 87654 32109</span>
              </a>
            </div>
          </div>
        </div>

        {/* Info list */}
        <div className="glass-panel rounded-xl p-4 border border-white/5 space-y-2.5">
          <div className="flex items-start space-x-3 text-xs">
            <MapPin size={16} className="text-cyber-neonPurple mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Ilahia College of Engineering and Technology</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Mulavoor P.O., Muvattupuzha, Ernakulam, Kerala - 686673</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs border-t border-white/5 pt-2.5">
            <Mail size={15} className="text-cyber-neonBlue flex-shrink-0" />
            <a href="mailto:innovision@icet.ac.in" className="text-gray-300 hover:text-cyber-neonBlue">
              innovision@icet.ac.in
            </a>
          </div>

          <div className="flex items-center space-x-3 text-xs border-t border-white/5 pt-2.5">
            <Globe size={15} className="text-cyber-neonBlue flex-shrink-0" />
            <a href="https://www.icet.ac.in" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyber-neonBlue">
              www.icet.ac.in
            </a>
          </div>
        </div>

        {/* Map Shortcut */}
        <div className="glass-panel rounded-xl p-2 border border-white/5 h-36 overflow-hidden relative">
          {/* Static mockup or styled map trigger */}
          <div className="absolute inset-0 bg-cyber-darkBlue/90 flex flex-col items-center justify-center p-4 text-center z-10">
            <MapPin size={22} className="text-cyber-neonBlue mb-2 animate-bounce" />
            <p className="text-xs font-semibold">Ilahia College Campus (ICET)</p>
            <p className="text-[9px] text-gray-400 mt-0.5">Muvattupuzha, Kerala</p>
            <a 
              href="https://maps.google.com/?q=Ilahia+College+of+Engineering+and+Technology" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2.5 px-3 py-1 rounded bg-cyber-neonBlue text-white text-[10px] font-bold uppercase tracking-wider transition-transform duration-300 hover:scale-105"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="glass-panel rounded-xl p-4 border border-white/5">
          <h3 className="text-xs font-bold text-cyber-neonBlue uppercase tracking-wider font-mono mb-3">Send a Message</h3>
          
          {formSubmitted ? (
            <div className="py-4 text-center space-y-2">
              <CheckCircle2 size={24} className="text-green-400 mx-auto" />
              <p className="text-xs font-bold text-green-400">Message Received!</p>
              <p className="text-[10px] text-gray-400">We will respond to your query at the provided email.</p>
              <button 
                onClick={() => setFormSubmitted(false)}
                className="text-[10px] text-cyber-neonBlue underline mt-1"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={query.name}
                  onChange={(e) => setQuery({ ...query, name: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={query.email}
                  onChange={(e) => setQuery({ ...query, email: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                />
              </div>
              <textarea
                placeholder="Type your inquiry here..."
                required
                rows={3}
                value={query.message}
                onChange={(e) => setQuery({ ...query, message: e.target.value })}
                className="w-full px-2.5 py-2 rounded-lg text-xs glass-input resize-none"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-cyber-neonBlue/10 hover:text-cyber-neonBlue hover:border-cyber-neonBlue/30 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300"
              >
                <span>Send Query</span>
                <Send size={12} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
