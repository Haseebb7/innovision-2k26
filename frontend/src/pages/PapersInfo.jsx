import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Info, ClipboardList, CheckCircle2, ChevronRight, AlertCircle, RefreshCw, Upload } from 'lucide-react';
import API from '../api';

const PapersInfo = () => {
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'form'
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      paperTitle: '',
      abstract: '',
      college: '',
      department: '',
      authorName: '',
      authorEmail: '',
      authorPhone: '',
      coAuthors: '',
      paymentMethod: 'UPI',
      transactionId: '',
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError('');
    if (file) {
      if (file.type !== 'application/pdf') {
        setFileError('Only PDF files are allowed.');
        setSelectedFile(null);
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setFileError('File size must be less than 10MB.');
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const onSubmit = async (data) => {
    if (!selectedFile) {
      setFileError('Please upload your paper PDF.');
      return;
    }

    setIsSubmitting(true);
    setApiError('');

    const formData = new FormData();
    formData.append('paperTitle', data.paperTitle);
    formData.append('abstract', data.abstract);
    formData.append('college', data.college);
    formData.append('department', data.department);
    formData.append('authorName', data.authorName);
    formData.append('authorEmail', data.authorEmail);
    formData.append('authorPhone', data.authorPhone);
    formData.append('coAuthors', data.coAuthors);
    formData.append('paymentMethod', data.paymentMethod);
    formData.append('transactionId', data.transactionId);
    formData.append('pdf', selectedFile);

    try {
      await API.post('/papers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubmitSuccess(true);
      setSelectedFile(null);
      reset();
    } catch (error) {
      console.error(error);
      setApiError(error.response?.data?.message || 'Something went wrong during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Tabs */}
      <div className="flex border border-cyber-border rounded-xl p-1 bg-white/5">
        <button
          onClick={() => setActiveTab('details')}
          className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 ${
            activeTab === 'details'
              ? 'bg-cyber-neonPurple text-white font-bold shadow-[0_4px_12px_rgba(139,92,246,0.15)]'
              : 'text-gray-400 hover:text-gray-100'
          }`}
        >
          Details &amp; Topics
        </button>
        <button
          onClick={() => {
            setActiveTab('form');
            setSubmitSuccess(false);
            setApiError('');
            setSelectedFile(null);
            setFileError('');
          }}
          className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 ${
            activeTab === 'form'
              ? 'bg-cyber-neonPurple text-white font-bold shadow-[0_4px_12px_rgba(139,92,246,0.15)]'
              : 'text-gray-400 hover:text-gray-100'
          }`}
        >
          Application Form
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'details' ? (
          <motion.div
            key="details-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Event Info Card */}
            <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3">
              <h3 className="font-display font-extrabold text-sm text-cyber-neonPurple flex items-center space-x-2">
                <Info size={16} />
                <span>Conference Overview</span>
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Innovision Paper Presentation invites research-driven minds to present their academic and industrial insights. Present your papers before an expert panel from research agencies and premium engineering institutions.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-gray-400 font-mono">PRIZE POOL</p>
                  <p className="text-sm font-bold text-cyber-neonPurple">₹15,000 + Trophies</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-mono">REGISTRATION FEE</p>
                  <p className="text-sm font-bold text-cyber-neonBlue">₹150 per Paper</p>
                </div>
              </div>
            </div>

            {/* Topics Card */}
            <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3">
              <h3 className="font-display font-extrabold text-sm text-cyber-neonBlue flex items-center space-x-2">
                <ClipboardList size={16} />
                <span>Topics of Interest</span>
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Authors are encouraged to submit papers in the fields of (but not limited to):
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300 pt-1 font-light">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-cyber-neonBlue rounded-full"></span>
                  <span>Artificial Intelligence</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-cyber-neonBlue rounded-full"></span>
                  <span>Cyber Security &amp; Privacy</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-cyber-neonBlue rounded-full"></span>
                  <span>Machine / Deep Learning</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-cyber-neonBlue rounded-full"></span>
                  <span>IoT &amp; Cloud Computing</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-cyber-neonPurple rounded-full"></span>
                  <span>Blockchains &amp; Cryptography</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-cyber-neonPurple rounded-full"></span>
                  <span>Big Data &amp; Data Mining</span>
                </div>
              </div>
            </div>

            {/* Presentation rules */}
            <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3">
              <h3 className="font-display font-extrabold text-sm text-gray-200">Guidelines</h3>
              <ul className="space-y-2 text-xs text-gray-300 list-none pl-1">
                <li className="flex items-start space-x-2 font-light">
                  <ChevronRight size={14} className="text-cyber-neonPurple mt-0.5 flex-shrink-0" />
                  <span>Maximum authors per paper: **3 authors**.</span>
                </li>
                <li className="flex items-start space-x-2 font-light">
                  <ChevronRight size={14} className="text-cyber-neonPurple mt-0.5 flex-shrink-0" />
                  <span>The paper must be submitted in standard **IEEE format** in PDF format (Max 10MB).</span>
                </li>
                <li className="flex items-start space-x-2 font-light">
                  <ChevronRight size={14} className="text-cyber-neonPurple mt-0.5 flex-shrink-0" />
                  <span>Presentation time: **8 minutes** for presentation and **2 minutes** for Q&amp;A.</span>
                </li>
              </ul>
            </div>

            {/* Quick CTA to Form */}
            <button
              onClick={() => setActiveTab('form')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-neonPurple to-cyber-neonBlue text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:brightness-110 active:scale-95 transition-all duration-300"
            >
              <span>Apply Now</span>
              <ChevronRight size={16} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {submitSuccess ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-panel rounded-2xl p-8 border border-green-500/20 text-center space-y-4 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display font-black text-lg text-green-400 uppercase">Paper Submitted!</h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  Your paper has been uploaded and registered successfully. The review panel will verify your abstract and payment details. You will receive an update regarding paper acceptance soon.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold tracking-wider transition-all duration-300"
                >
                  Submit Another Paper
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-6">
                
                {apiError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start space-x-2 font-mono">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{apiError}</span>
                  </div>
                )}

                {/* Section 1: Authorship */}
                <div className="glass-panel rounded-2xl p-4 border border-white/5 space-y-3">
                  <h4 className="text-xs font-bold text-cyber-neonPurple uppercase tracking-wider font-mono">1. Author Information</h4>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-mono uppercase">Primary Author Name *</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      {...register('authorName', { required: 'Author name is required' })}
                      className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                    />
                    {errors.authorName && <p className="text-[10px] text-red-400 font-mono">{errors.authorName.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 font-mono uppercase">Email Address *</label>
                      <input
                        type="email"
                        placeholder="author@gmail.com"
                        {...register('authorEmail', { 
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                        })}
                        className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                      />
                      {errors.authorEmail && <p className="text-[10px] text-red-400 font-mono">{errors.authorEmail.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 font-mono uppercase">Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        {...register('authorPhone', { required: 'Phone is required' })}
                        className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                      />
                      {errors.authorPhone && <p className="text-[10px] text-red-400 font-mono">{errors.authorPhone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-mono uppercase">Co-Author(s) (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe, Sarah Connor"
                      {...register('coAuthors')}
                      className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                    />
                  </div>
                </div>

                {/* Section 2: Paper Details */}
                <div className="glass-panel rounded-2xl p-4 border border-white/5 space-y-3">
                  <h4 className="text-xs font-bold text-cyber-neonPurple uppercase tracking-wider font-mono">2. Paper Details</h4>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-mono uppercase">Paper Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. An analysis of Zero Trust Architecture"
                      {...register('paperTitle', { required: 'Paper Title is required' })}
                      className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                    />
                    {errors.paperTitle && <p className="text-[10px] text-red-400 font-mono">{errors.paperTitle.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-mono uppercase">Abstract Overview *</label>
                    <textarea
                      rows={4}
                      placeholder="Summarize the core methodology, results, and significance of your paper (minimum 100 words)..."
                      {...register('abstract', { required: 'Abstract is required' })}
                      className="w-full px-3 py-2.5 rounded-xl text-xs glass-input resize-none"
                    />
                    {errors.abstract && <p className="text-[10px] text-red-400 font-mono">{errors.abstract.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 font-mono uppercase">College Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. ICET"
                        {...register('college', { required: 'College name is required' })}
                        className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                      />
                      {errors.college && <p className="text-[10px] text-red-400 font-mono">{errors.college.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 font-mono uppercase">Department *</label>
                      <input
                        type="text"
                        placeholder="e.g. Cyber Security"
                        {...register('department', { required: 'Department is required' })}
                        className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                      />
                      {errors.department && <p className="text-[10px] text-red-400 font-mono">{errors.department.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Section 3: File Upload */}
                <div className="glass-panel rounded-2xl p-4 border border-white/5 space-y-3">
                  <h4 className="text-xs font-bold text-cyber-neonPurple uppercase tracking-wider font-mono">3. Document Upload (PDF)</h4>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-mono uppercase">IEEE Format Full Paper *</label>
                    <div className="relative border border-dashed border-white/10 hover:border-cyber-neonPurple/50 rounded-xl p-4 bg-white/5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Upload size={24} className="text-gray-400 mb-2" />
                      {selectedFile ? (
                        <p className="text-xs text-cyber-neonPurple font-semibold max-w-[200px] truncate">
                          {selectedFile.name}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400">Tap to upload PDF file</p>
                      )}
                      <p className="text-[9px] text-gray-500 mt-1">PDF file format only (Max 10MB)</p>
                    </div>
                    {fileError && <p className="text-[10px] text-red-400 font-mono">{fileError}</p>}
                  </div>
                </div>

                {/* Section 4: Payment Details */}
                <div className="glass-panel rounded-2xl p-4 border border-white/5 space-y-3">
                  <h4 className="text-xs font-bold text-cyber-neonPurple uppercase tracking-wider font-mono">4. Payment &amp; Submission</h4>
                  
                  {/* Payment Instructions Placeholder */}
                  <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 space-y-2">
                    <p className="text-[10px] text-cyber-neonBlue font-bold uppercase font-mono">Payment Instructions</p>
                    <p className="text-[11px] text-gray-300 leading-normal font-light">
                      Transfer entry fee of **₹150** to the official event account:
                      <br />• **UPI ID**: `icet-innovision@upi` (or use code shared by department)
                      <br />• **Bank Transfer**: Account details can be acquired from department staff.
                    </p>
                    <p className="text-[9px] text-yellow-500/90 font-light font-mono leading-normal">
                      Note: Enter correct transaction ID. Registrations will be approved after validating bank entries.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 font-mono uppercase">Payment Method *</label>
                      <select
                        {...register('paymentMethod', { required: true })}
                        className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                      >
                        <option value="UPI" className="bg-white text-gray-800">UPI</option>
                        <option value="Bank Transfer" className="bg-white text-gray-800">Bank Transfer</option>
                        <option value="On-spot / Cash" className="bg-white text-gray-800">On-spot / Cash</option>
                        <option value="Other" className="bg-white text-gray-800">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 font-mono uppercase">Transaction / Ref ID *</label>
                      <input
                        type="text"
                        placeholder="UPI Ref # / Receipt #"
                        {...register('transactionId', { required: 'Transaction ID is required' })}
                        className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                      />
                      {errors.transactionId && <p className="text-[10px] text-red-400 font-mono">{errors.transactionId.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyber-neonPurple to-cyber-neonBlue text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Uploading Paper...</span>
                    </>
                  ) : (
                    <span>Submit Paper Presentation</span>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PapersInfo;
