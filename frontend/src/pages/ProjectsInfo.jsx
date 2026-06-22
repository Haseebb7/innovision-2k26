import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Info, ClipboardList, Plus, Trash2, CheckCircle2, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
import API from '../api';

const ProjectsInfo = () => {
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'form'
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      teamName: '',
      projectTitle: '',
      projectDescription: '',
      college: '',
      department: '',
      leaderName: '',
      leaderEmail: '',
      leaderPhone: '',
      paymentMethod: 'UPI',
      transactionId: '',
      members: [], // [{ name: '', email: '', phone: '' }]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError('');
    try {
      await API.post('/projects', data);
      setSubmitSuccess(true);
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
        <div className="w-10 h-10 rounded-xl bg-cyber-neonBlue/15 text-cyber-neonBlue flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <Lightbulb size={22} className="animate-pulse" />
        </div>
        <div>
          <h2 className="font-display font-black text-xl uppercase tracking-wide">Project Exhibition</h2>
          <p className="text-[10px] text-gray-400 font-mono tracking-wider">INNOVISION '26 COMPETITION</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border border-cyber-border rounded-xl p-1 bg-white/5">
        <button
          onClick={() => setActiveTab('details')}
          className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 ${
            activeTab === 'details'
              ? 'bg-cyber-neonBlue text-white font-bold shadow-[0_4px_12px_rgba(2,132,199,0.15)]'
              : 'text-gray-400 hover:text-gray-100'
          }`}
        >
          Details &amp; Rules
        </button>
        <button
          onClick={() => {
            setActiveTab('form');
            setSubmitSuccess(false);
            setApiError('');
          }}
          className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 ${
            activeTab === 'form'
              ? 'bg-cyber-neonBlue text-white font-bold shadow-[0_4px_12px_rgba(2,132,199,0.15)]'
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
            {/* Description card */}
            <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3">
              <h3 className="font-display font-extrabold text-sm text-cyber-neonBlue flex items-center space-x-2">
                <Info size={16} />
                <span>Event Description</span>
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Innovision Project Exhibition provides engineering students a national platform to showcase their technical prowess. If you have engineered a solution using IoT, AI, Cyber Security, Blockchain, Web3, robotics, or sustainable technology, this is your stage.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-gray-400 font-mono">PRIZE POOL</p>
                  <p className="text-sm font-bold text-cyber-neonBlue">₹25,000 + Trophies</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-mono">REGISTRATION FEE</p>
                  <p className="text-sm font-bold text-cyber-neonPurple">₹200 per Team</p>
                </div>
              </div>
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
                  <span>A team can consist of **1 to 4 members** (including the team leader).</span>
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

            {/* Quick CTA to Form */}
            <button
              onClick={() => setActiveTab('form')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-neonBlue to-cyber-neonPurple text-cyber-bg font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:brightness-110 active:scale-95 transition-all duration-300"
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
                <h3 className="font-display font-black text-lg text-green-400 uppercase">Registration Successful!</h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  Your project exhibition application has been submitted successfully. The Admin team will review your registration and transaction ID. Keep an eye on your email for approval confirmation!
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold tracking-wider transition-all duration-300"
                >
                  Register Another Team
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

                {/* Section 1: Team & Project Info */}
                <div className="glass-panel rounded-2xl p-4 border border-white/5 space-y-3">
                  <h4 className="text-xs font-bold text-cyber-neonBlue uppercase tracking-wider font-mono">1. Project &amp; College Details</h4>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-mono uppercase">Team Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. CyberKnights"
                      {...register('teamName', { required: 'Team Name is required' })}
                      className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                    />
                    {errors.teamName && <p className="text-[10px] text-red-400 font-mono">{errors.teamName.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-mono uppercase">Project Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. AI-Powered Intrusion System"
                      {...register('projectTitle', { required: 'Project Title is required' })}
                      className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                    />
                    {errors.projectTitle && <p className="text-[10px] text-red-400 font-mono">{errors.projectTitle.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-mono uppercase">Project Description *</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your project's technology stack, objective, and solution..."
                      {...register('projectDescription', { required: 'Description is required' })}
                      className="w-full px-3 py-2.5 rounded-xl text-xs glass-input resize-none"
                    />
                    {errors.projectDescription && <p className="text-[10px] text-red-400 font-mono">{errors.projectDescription.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 font-mono uppercase">College Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. ICET"
                        {...register('college', { required: 'College is required' })}
                        className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                      />
                      {errors.college && <p className="text-[10px] text-red-400 font-mono">{errors.college.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 font-mono uppercase">Department *</label>
                      <input
                        type="text"
                        placeholder="e.g. AI &amp; CC"
                        {...register('department', { required: 'Department is required' })}
                        className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                      />
                      {errors.department && <p className="text-[10px] text-red-400 font-mono">{errors.department.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Section 2: Leader Details */}
                <div className="glass-panel rounded-2xl p-4 border border-white/5 space-y-3">
                  <h4 className="text-xs font-bold text-cyber-neonBlue uppercase tracking-wider font-mono">2. Team Leader (Primary Contact)</h4>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-mono uppercase">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Leader name"
                      {...register('leaderName', { required: 'Leader name is required' })}
                      className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                    />
                    {errors.leaderName && <p className="text-[10px] text-red-400 font-mono">{errors.leaderName.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 font-mono uppercase">Email Address *</label>
                      <input
                        type="email"
                        placeholder="leader@gmail.com"
                        {...register('leaderEmail', { 
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                        })}
                        className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                      />
                      {errors.leaderEmail && <p className="text-[10px] text-red-400 font-mono">{errors.leaderEmail.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 font-mono uppercase">Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        {...register('leaderPhone', { required: 'Phone is required' })}
                        className="w-full px-3 py-2.5 rounded-xl text-xs glass-input"
                      />
                      {errors.leaderPhone && <p className="text-[10px] text-red-400 font-mono">{errors.leaderPhone.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Section 3: Team Members */}
                <div className="glass-panel rounded-2xl p-4 border border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-cyber-neonBlue uppercase tracking-wider font-mono">3. Additional Team Members ({fields.length}/3)</h4>
                    {fields.length < 3 && (
                      <button
                        type="button"
                        onClick={() => append({ name: '', email: '', phone: '' })}
                        className="px-2.5 py-1 rounded-lg bg-cyber-neonBlue/10 hover:bg-cyber-neonBlue/20 text-cyber-neonBlue text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 border border-cyber-neonBlue/20 transition-all duration-300"
                      >
                        <Plus size={10} />
                        <span>Add Member</span>
                      </button>
                    )}
                  </div>

                  {fields.length === 0 && (
                    <p className="text-[10px] text-gray-500 font-light italic">No additional team members added. Team of 1 (just the leader) is fine.</p>
                  )}

                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <div key={field.id} className="p-3 rounded-xl border border-white/5 bg-white/5 space-y-2 relative">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-cyber-neonPurple font-bold uppercase font-mono">Member #{index + 1}</span>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="p-1 rounded bg-red-500/10 hover:bg-red-500/25 text-red-400 transition-all duration-300"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>

                        <div className="space-y-1">
                          <input
                            type="text"
                            placeholder="Full Name *"
                            {...register(`members.${index}.name`, { required: 'Name is required' })}
                            className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="email"
                            placeholder="Email"
                            {...register(`members.${index}.email`)}
                            className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                          />
                          <input
                            type="tel"
                            placeholder="Phone"
                            {...register(`members.${index}.phone`)}
                            className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Payment Details */}
                <div className="glass-panel rounded-2xl p-4 border border-white/5 space-y-3">
                  <h4 className="text-xs font-bold text-cyber-neonBlue uppercase tracking-wider font-mono">4. Payment &amp; Submission</h4>
                  
                  {/* Payment Instructions Placeholder */}
                  <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 space-y-2">
                    <p className="text-[10px] text-purple-400 font-bold uppercase font-mono">Payment Instructions</p>
                    <p className="text-[11px] text-gray-300 leading-normal font-light">
                      Transfer entry fee of **₹200** to the official event account:
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
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyber-neonBlue to-cyber-neonPurple text-cyber-bg font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : (
                    <span>Submit Project Application</span>
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

export default ProjectsInfo;
