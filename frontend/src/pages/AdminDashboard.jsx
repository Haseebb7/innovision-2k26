import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Plus,
  ArrowUpDown,
  BookOpen,
  LayoutDashboard
} from 'lucide-react';
import API from '../api';

const AdminDashboard = () => {
  const { admin, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'papers'
  const [projects, setProjects] = useState([]);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected'

  // Expandable list items
  const [expandedId, setExpandedId] = useState(null);

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRecord, setEditRecord] = useState(null); // The record being edited
  const [editType, setEditType] = useState('projects'); // 'projects' | 'papers'

  // Verification block
  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
    }
  }, [admin, authLoading, navigate]);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [projRes, paperRes] = await Promise.all([
        API.get('/projects'),
        API.get('/papers')
      ]);
      setProjects(projRes.data);
      setPapers(paperRes.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch registration records. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) {
      fetchData();
    }
  }, [admin]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Toggle item expansion
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Quick status update
  const handleStatusUpdate = async (id, type, newStatus) => {
    try {
      if (type === 'projects') {
        const { data } = await API.put(`/projects/${id}`, { status: newStatus });
        setProjects(projects.map(p => p._id === id ? data : p));
      } else {
        const { data } = await API.put(`/papers/${id}`, { status: newStatus });
        setPapers(papers.map(p => p._id === id ? data : p));
      }
    } catch (err) {
      alert('Failed to update status: ' + (err.response?.data?.message || err.message));
    }
  };

  // Delete handler
  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type === 'projects' ? 'project exhibition' : 'paper submission'} registration? This action is permanent.`)) {
      return;
    }

    try {
      if (type === 'projects') {
        await API.delete(`/projects/${id}`);
        setProjects(projects.filter(p => p._id !== id));
      } else {
        await API.delete(`/papers/${id}`);
        setPapers(papers.filter(p => p._id !== id));
      }
    } catch (err) {
      alert('Failed to delete: ' + (err.response?.data?.message || err.message));
    }
  };

  // Open Edit Modal
  const openEditModal = (record, type) => {
    setEditRecord({ ...record });
    setEditType(type);
    setShowEditModal(true);
  };

  // Save changes from Edit Modal
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      if (editType === 'projects') {
        const { data } = await API.put(`/projects/${editRecord._id}`, editRecord);
        setProjects(projects.map(p => p._id === editRecord._id ? data : p));
      } else {
        const { data } = await API.put(`/papers/${editRecord._id}`, editRecord);
        setPapers(papers.map(p => p._id === editRecord._id ? data : p));
      }
      setShowEditModal(false);
      setEditRecord(null);
    } catch (err) {
      alert('Failed to save changes: ' + (err.response?.data?.message || err.message));
    }
  };

  // Helper: Status badge color styles
  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    }
  };

  // Filter lists based on Search & statusFilter
  const getFilteredData = () => {
    const data = activeTab === 'projects' ? projects : papers;
    return data.filter(item => {
      // Status filter
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      
      // Search term
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();

      if (activeTab === 'projects') {
        return (
          item.teamName.toLowerCase().includes(search) ||
          item.projectTitle.toLowerCase().includes(search) ||
          item.leaderName.toLowerCase().includes(search) ||
          item.leaderEmail.toLowerCase().includes(search) ||
          item.college.toLowerCase().includes(search) ||
          item.transactionId.toLowerCase().includes(search)
        );
      } else {
        return (
          item.paperTitle.toLowerCase().includes(search) ||
          item.authorName.toLowerCase().includes(search) ||
          item.authorEmail.toLowerCase().includes(search) ||
          item.college.toLowerCase().includes(search) ||
          item.transactionId.toLowerCase().includes(search)
        );
      }
    });
  };

  const filteredData = getFilteredData();

  // Stats calculation
  const stats = {
    totalProjects: projects.length,
    totalPapers: papers.length,
    pendingCount: projects.filter(p => p.status === 'pending').length + papers.filter(p => p.status === 'pending').length,
    approvedCount: projects.filter(p => p.status === 'approved').length + papers.filter(p => p.status === 'approved').length,
  };

  // Export CSV
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    if (activeTab === 'projects') {
      csvContent += "Team Name,Project Title,Leader Name,Leader Email,Leader Phone,College,Department,Members Count,Payment Method,Transaction ID,Status,Created At\n";
      filteredData.forEach(item => {
        const membersSerialized = item.members?.map(m => m.name).join('; ') || '';
        const row = [
          `"${item.teamName.replace(/"/g, '""')}"`,
          `"${item.projectTitle.replace(/"/g, '""')}"`,
          `"${item.leaderName.replace(/"/g, '""')}"`,
          `"${item.leaderEmail}"`,
          `"${item.leaderPhone}"`,
          `"${item.college.replace(/"/g, '""')}"`,
          `"${item.department.replace(/"/g, '""')}"`,
          item.members?.length || 0,
          `"${item.paymentMethod}"`,
          `"${item.transactionId}"`,
          `"${item.status}"`,
          `"${item.createdAt}"`
        ].join(",");
        csvContent += row + "\n";
      });
    } else {
      csvContent += "Paper Title,Primary Author,Author Email,Author Phone,Co-Authors,College,Department,PDF Path,Payment Method,Transaction ID,Status,Created At\n";
      filteredData.forEach(item => {
        const row = [
          `"${item.paperTitle.replace(/"/g, '""')}"`,
          `"${item.authorName.replace(/"/g, '""')}"`,
          `"${item.authorEmail}"`,
          `"${item.authorPhone}"`,
          `"${(item.coAuthors || '').replace(/"/g, '""')}"`,
          `"${item.college.replace(/"/g, '""')}"`,
          `"${item.department.replace(/"/g, '""')}"`,
          `"${item.pdfUrl}"`,
          `"${item.paymentMethod}"`,
          `"${item.transactionId}"`,
          `"${item.status}"`,
          `"${item.createdAt}"`
        ].join(",");
        csvContent += row + "\n";
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `innovision_${activeTab}_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <RefreshCw size={24} className="text-cyber-neonBlue animate-spin" />
        <p className="text-xs text-gray-400 font-mono">Verifying authorization...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-2">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center bg-white/5 border border-white/5 p-3.5 rounded-xl">
        <div className="flex items-center space-x-2">
          <LayoutDashboard className="text-cyber-neonBlue" size={18} />
          <div>
            <h2 className="font-display font-black text-sm uppercase tracking-wider">Admin Dashboard</h2>
            <p className="text-[9px] text-gray-400 font-mono font-medium">LOGGED IN: {admin?.name || 'ADMIN'}</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 transition-all duration-300 flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider"
        >
          <LogOut size={12} />
          <span>Logout</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2 text-left">
        <div className="glass-panel p-3.5 rounded-xl border border-white/5 space-y-1">
          <p className="text-[8px] text-gray-400 font-mono uppercase tracking-wider">Project Teams</p>
          <h3 className="text-2xl font-black font-display text-cyber-neonBlue">{stats.totalProjects}</h3>
        </div>
        <div className="glass-panel p-3.5 rounded-xl border border-white/5 space-y-1">
          <p className="text-[8px] text-gray-400 font-mono uppercase tracking-wider">Research Papers</p>
          <h3 className="text-2xl font-black font-display text-cyber-neonPurple">{stats.totalPapers}</h3>
        </div>
        <div className="glass-panel p-3.5 rounded-xl border border-white/5 space-y-1">
          <p className="text-[8px] text-yellow-500/80 font-mono uppercase tracking-wider">Pending Verification</p>
          <h3 className="text-2xl font-black font-display text-yellow-400">{stats.pendingCount}</h3>
        </div>
        <div className="glass-panel p-3.5 rounded-xl border border-white/5 space-y-1">
          <p className="text-[8px] text-green-500/80 font-mono uppercase tracking-wider">Approved Entries</p>
          <h3 className="text-2xl font-black font-display text-green-400">{stats.approvedCount}</h3>
        </div>
      </div>

      {/* Tab Select & Refresh */}
      <div className="flex justify-between items-center border border-white/5 rounded-xl p-1 bg-white/5">
        <div className="flex flex-1 space-x-1">
          <button
            onClick={() => { setActiveTab('projects'); setExpandedId(null); }}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
              activeTab === 'projects'
                ? 'bg-cyber-neonBlue text-white shadow-md'
                : 'text-gray-400 hover:text-gray-100'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => { setActiveTab('papers'); setExpandedId(null); }}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
              activeTab === 'papers'
                ? 'bg-cyber-neonPurple text-white shadow-md'
                : 'text-gray-400 hover:text-gray-100'
            }`}
          >
            Papers
          </button>
        </div>
        <button
          onClick={fetchData}
          title="Refresh Data"
          className="p-2 ml-1.5 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-white/5 border border-white/5 transition-all duration-300"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin text-cyber-neonBlue' : ''} />
        </button>
      </div>

      {/* Controls: Search, Status Filter, CSV */}
      <div className="space-y-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search name, title, college, txn ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs glass-input"
          />
        </div>

        <div className="flex space-x-2">
          <div className="flex-grow flex items-center space-x-1.5 bg-white/5 border border-white/5 rounded-xl px-2.5 py-1">
            <Filter size={12} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-gray-300 w-full focus:outline-none border-none py-1.5"
            >
              <option value="all" className="bg-white text-gray-800">All Statuses</option>
              <option value="pending" className="bg-white text-yellow-600 font-semibold">Pending</option>
              <option value="approved" className="bg-white text-green-600 font-semibold">Approved</option>
              <option value="rejected" className="bg-white text-red-600 font-semibold">Rejected</option>
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-cyber-neonBlue/10 hover:text-cyber-neonBlue border border-white/10 flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300"
          >
            <Download size={14} />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Records Count */}
      <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono px-1">
        <span>Showing {filteredData.length} records</span>
        {searchTerm && <span className="text-cyber-neonBlue">Search filter active</span>}
      </div>

      {/* Error or Empty state */}
      {error && (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-center text-xs text-red-400">
          <p>{error}</p>
          <button 
            onClick={fetchData}
            className="mt-2.5 px-4 py-1.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all"
          >
            Retry Connections
          </button>
        </div>
      )}

      {/* List Container */}
      {!loading && !error && (
        <div className="space-y-2 pb-10">
          {filteredData.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-dashed border-white/10 text-xs text-gray-500 italic">
              No registrations found matching the filters.
            </div>
          ) : (
            filteredData.map((item) => {
              const isExpanded = expandedId === item._id;
              
              // Display labels
              const primaryTitle = activeTab === 'projects' ? item.projectTitle : item.paperTitle;
              const subTitle = activeTab === 'projects' ? `Team: ${item.teamName}` : `Author: ${item.authorName}`;
              
              return (
                <div 
                  key={item._id}
                  className={`glass-panel rounded-xl overflow-hidden border transition-all duration-300 ${
                    isExpanded 
                      ? activeTab === 'projects' 
                        ? 'border-cyber-neonBlue/40 shadow-[0_0_15px_rgba(0,240,255,0.08)]' 
                        : 'border-cyber-neonPurple/40 shadow-[0_0_15px_rgba(168,85,247,0.08)]' 
                      : 'border-white/5'
                  }`}
                >
                  {/* Summary Block */}
                  <div 
                    onClick={() => toggleExpand(item._id)}
                    className="p-3.5 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors duration-200"
                  >
                    <div className="space-y-1 max-w-[70%]">
                      <h4 className="text-xs font-semibold text-gray-100 truncate">{primaryTitle}</h4>
                      <p className="text-[10px] text-gray-400 font-mono truncate">{subTitle}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wider font-mono font-semibold ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                      {isExpanded ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                    </div>
                  </div>

                  {/* Expanded Block */}
                  {isExpanded && (
                    <div className="px-3.5 pb-4 pt-2 border-t border-white/5 bg-white/5 space-y-3.5 text-xs text-gray-300 font-light">
                      
                      {/* Grid details */}
                      <div className="grid grid-cols-2 gap-3 bg-white/5 p-3 rounded-xl border border-white/5 font-mono text-[10px]">
                        <div>
                          <p className="text-gray-500 uppercase">College</p>
                          <p className="text-gray-200 font-semibold">{item.college}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 uppercase">Department</p>
                          <p className="text-gray-200 font-semibold">{item.department}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 uppercase">Contact Phone</p>
                          <p className="text-gray-200 font-semibold">
                            {activeTab === 'projects' ? item.leaderPhone : item.authorPhone}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 uppercase">Contact Email</p>
                          <p className="text-gray-200 font-semibold truncate">
                            {activeTab === 'projects' ? item.leaderEmail : item.authorEmail}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 uppercase">Payment Option</p>
                          <p className="text-gray-200 font-semibold">{item.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 uppercase">Transaction ID</p>
                          <p className="text-yellow-500 font-bold break-all select-all">{item.transactionId}</p>
                        </div>
                      </div>

                      {/* Event Specifics */}
                      {activeTab === 'projects' ? (
                        <div className="space-y-1.5">
                          <p className="text-[10px] text-gray-400 font-mono uppercase font-bold">Project Details</p>
                          <p className="text-xs text-gray-300 leading-normal font-light bg-black/10 p-2.5 rounded-lg border border-white/5">
                            {item.projectDescription}
                          </p>

                          {/* Members List */}
                          {item.members && item.members.length > 0 && (
                            <div className="space-y-1 pt-1.5">
                              <p className="text-[10px] text-gray-400 font-mono uppercase font-bold">Additional Members ({item.members.length})</p>
                              <div className="space-y-1">
                                {item.members.map((m, idx) => (
                                  <div key={idx} className="flex justify-between items-center bg-white/5 px-2 py-1.5 rounded text-[10px] font-mono">
                                    <span className="text-gray-200">{m.name}</span>
                                    <span className="text-gray-400 text-[9px]">{m.phone} | {m.email || 'N/A'}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="space-y-1">
                            <p className="text-[10px] text-gray-400 font-mono uppercase font-bold">Co-Authors</p>
                            <p className="text-xs text-gray-200 italic">{item.coAuthors || 'None listed'}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-[10px] text-gray-400 font-mono uppercase font-bold">Abstract</p>
                            <p className="text-xs text-gray-300 leading-normal font-light bg-black/10 p-2.5 rounded-lg border border-white/5">
                              {item.abstract}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2 pt-1">
                            <p className="text-[10px] text-gray-400 font-mono uppercase font-bold">Paper Document</p>
                            {/* Make URL build dynamically */}
                            <a 
                              href={API.defaults.baseURL.replace('/api', '') + item.pdfUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded bg-cyber-neonPurple/15 text-cyber-neonPurple hover:bg-cyber-neonPurple/30 border border-cyber-neonPurple/20 transition-all duration-300 flex items-center space-x-1 text-[10px] font-bold uppercase font-mono tracking-wider"
                            >
                              <ExternalLink size={10} />
                              <span>View / Download PDF</span>
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        
                        {/* Quick Approve/Reject Status */}
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleStatusUpdate(item._id, activeTab, 'approved')}
                            title="Approve registration"
                            className="p-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 transition-all"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(item._id, activeTab, 'rejected')}
                            title="Reject registration"
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
                          >
                            <X size={14} />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(item._id, activeTab, 'pending')}
                            title="Set status to pending"
                            className="px-2 py-1.5 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 text-[9px] font-bold uppercase transition-all"
                          >
                            Reset
                          </button>
                        </div>

                        {/* Edit & Delete */}
                        <div className="flex space-x-1.5">
                          <button
                            onClick={() => openEditModal(item, activeTab)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 transition-all flex items-center space-x-1 text-[10px]"
                          >
                            <Edit size={12} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(item._id, activeTab)}
                            className="p-1.5 rounded-lg bg-red-500/5 hover:bg-red-500/15 text-red-400 border border-red-500/10 transition-all"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Edit Record Modal */}
      {showEditModal && editRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="w-full max-w-sm glass-panel-heavy rounded-2xl border border-white/15 p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <h3 className="font-display font-black text-sm uppercase tracking-wide text-gray-100 border-b border-white/5 pb-2">
              Edit Registration Data
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs text-gray-300">
              
              {editType === 'projects' ? (
                <>
                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 font-mono uppercase">Team Name</label>
                    <input 
                      type="text" 
                      value={editRecord.teamName || ''} 
                      onChange={(e) => setEditRecord({...editRecord, teamName: e.target.value})}
                      className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 font-mono uppercase">Project Title</label>
                    <input 
                      type="text" 
                      value={editRecord.projectTitle || ''} 
                      onChange={(e) => setEditRecord({...editRecord, projectTitle: e.target.value})}
                      className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 font-mono uppercase">Leader Name</label>
                    <input 
                      type="text" 
                      value={editRecord.leaderName || ''} 
                      onChange={(e) => setEditRecord({...editRecord, leaderName: e.target.value})}
                      className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] text-gray-400 font-mono uppercase">Leader Phone</label>
                      <input 
                        type="text" 
                        value={editRecord.leaderPhone || ''} 
                        onChange={(e) => setEditRecord({...editRecord, leaderPhone: e.target.value})}
                        className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-gray-400 font-mono uppercase">Leader Email</label>
                      <input 
                        type="email" 
                        value={editRecord.leaderEmail || ''} 
                        onChange={(e) => setEditRecord({...editRecord, leaderEmail: e.target.value})}
                        className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 font-mono uppercase">Paper Title</label>
                    <input 
                      type="text" 
                      value={editRecord.paperTitle || ''} 
                      onChange={(e) => setEditRecord({...editRecord, paperTitle: e.target.value})}
                      className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 font-mono uppercase">Primary Author</label>
                    <input 
                      type="text" 
                      value={editRecord.authorName || ''} 
                      onChange={(e) => setEditRecord({...editRecord, authorName: e.target.value})}
                      className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] text-gray-400 font-mono uppercase">Author Phone</label>
                      <input 
                        type="text" 
                        value={editRecord.authorPhone || ''} 
                        onChange={(e) => setEditRecord({...editRecord, authorPhone: e.target.value})}
                        className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-gray-400 font-mono uppercase">Author Email</label>
                      <input 
                        type="email" 
                        value={editRecord.authorEmail || ''} 
                        onChange={(e) => setEditRecord({...editRecord, authorEmail: e.target.value})}
                        className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 font-mono uppercase">Co-Authors</label>
                    <input 
                      type="text" 
                      value={editRecord.coAuthors || ''} 
                      onChange={(e) => setEditRecord({...editRecord, coAuthors: e.target.value})}
                      className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-400 font-mono uppercase">College</label>
                  <input 
                    type="text" 
                    value={editRecord.college || ''} 
                    onChange={(e) => setEditRecord({...editRecord, college: e.target.value})}
                    className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-400 font-mono uppercase">Department</label>
                  <input 
                    type="text" 
                    value={editRecord.department || ''} 
                    onChange={(e) => setEditRecord({...editRecord, department: e.target.value})}
                    className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-400 font-mono uppercase">Transaction ID</label>
                  <input 
                    type="text" 
                    value={editRecord.transactionId || ''} 
                    onChange={(e) => setEditRecord({...editRecord, transactionId: e.target.value})}
                    className="w-full px-2.5 py-2 rounded-lg text-xs glass-input text-yellow-500 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-400 font-mono uppercase">Status</label>
                  <select 
                    value={editRecord.status || 'pending'} 
                    onChange={(e) => setEditRecord({...editRecord, status: e.target.value})}
                    className="w-full px-2.5 py-2 rounded-lg text-xs glass-input"
                  >
                    <option value="pending" className="bg-white text-yellow-600 font-semibold">Pending</option>
                    <option value="approved" className="bg-white text-green-600 font-semibold">Approved</option>
                    <option value="rejected" className="bg-white text-red-600 font-semibold">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setEditRecord(null); }}
                  className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10 font-bold uppercase tracking-wider text-[10px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-cyber-neonBlue text-cyber-bg font-bold uppercase tracking-wider text-[10px] shadow-[0_0_10px_rgba(0,240,255,0.25)]"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
