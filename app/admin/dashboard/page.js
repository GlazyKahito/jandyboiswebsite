'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Sparkles, 
  Award, 
  FolderDown, 
  Mail, 
  Globe, 
  FileDown, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  ExternalLink,
  Eye,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

  // Data states
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [resources, setResources] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [translations, setTranslations] = useState({});

  // Form modals / editing states
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  // Load all admin data
  const loadData = async () => {
    setLoading(true);
    try {
      // Check session
      const meRes = await fetch('/api/auth/me');
      if (!meRes.ok) {
        router.push('/admin');
        return;
      }

      // Fetch profile
      const [profRes, eduRes, expRes, skillRes, achRes, resRes, enqRes, transRes] = await Promise.all([
        fetch('/api/admin/profile'),
        fetch('/api/admin/education'),
        fetch('/api/admin/experience'),
        fetch('/api/admin/skills'),
        fetch('/api/admin/achievements'),
        fetch('/api/admin/resources'),
        fetch('/api/admin/enquiries'),
        fetch('/api/admin/translations'),
      ]);

      if (profRes.ok) setProfile(await profRes.json());
      if (eduRes.ok) setEducation(await eduRes.json());
      if (expRes.ok) setExperience(await expRes.json());
      if (skillRes.ok) setSkills(await skillRes.json());
      if (achRes.ok) setAchievements(await achRes.json());
      if (resRes.ok) setResources(await resRes.json());
      if (enqRes.ok) setEnquiries(await enqRes.json());
      if (transRes.ok) setTranslations(await transRes.json());
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (msg) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(''), 3500);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  // --- Handlers for Profile ---
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        showNotification('Profile dossier successfully preserved in archive.');
      }
    } catch {
      alert('Failed to save profile.');
    }
  };

  // --- Handlers for Resource File Upload ---
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        showNotification(`File uploaded: ${data.filename}`);
        if (editingItem) {
          setEditingItem({
            ...editingItem,
            fileUrl: data.url,
            fileSize: data.size,
            fileType: data.filename.endsWith('.pdf') ? 'PDF' : 'Image',
          });
        }
      } else {
        alert(data.error || 'Upload failed.');
      }
    } catch {
      alert('Upload failed.');
    } finally {
      setUploadingFile(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#191715] text-[#E8DCC5] flex items-center justify-center font-serif">
        <div className="flex items-center gap-3">
          <RefreshCw size={18} className="animate-spin text-[#A67C52]" />
          <span>Accessing Faculty Registry...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#191715] text-[#E8DCC5] flex flex-col font-serif">
      {/* Top Bar */}
      <header className="bg-[#211711] border-b border-[#A67C52]/40 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#302117] border border-[#C1A477] flex items-center justify-center text-[#C1A477] font-bold text-xs">
            J
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wide text-[#F2E9D7] leading-none">
              Faculty CMS • Janardhan Aghav (Jandy)
            </h1>
            <span className="text-[10px] text-[#A67C52] font-mono uppercase">
              SRJC Thane — Life Sciences Wing
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveMessage && (
            <div className="px-3 py-1 bg-[#302117] border border-[#A67C52] text-[#C1A477] rounded text-xs flex items-center gap-1.5 animate-fade-in font-mono">
              <CheckCircle size={13} />
              <span>{saveMessage}</span>
            </div>
          )}

          <a
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#302117] hover:bg-[#A67C52]/20 border border-[#A67C52]/40 text-[#E8DCC5] rounded text-xs transition-colors"
          >
            <Eye size={13} />
            <span>View Public Site</span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-200 rounded text-xs transition-colors font-mono"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-[#211711] border-r border-[#A67C52]/30 p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A67C52] px-3 py-2 block">
            Navigation Desks
          </span>

          {[
            { id: 'overview', label: 'Dashboard Overview', icon: Sparkles },
            { id: 'profile', label: 'Faculty Profile', icon: User },
            { id: 'education', label: 'Education & Degrees', icon: GraduationCap },
            { id: 'experience', label: 'Teaching Chronicles', icon: Briefcase },
            { id: 'skills', label: 'Domains of Mastery', icon: Sparkles },
            { id: 'achievements', label: 'Milestones & Awards', icon: Award },
            { id: 'resources', label: 'Teaching Resources', icon: FolderDown },
            { id: 'enquiries', label: `Correspondence (${enquiries.filter(e => e.status === 'unread').length})`, icon: Mail },
            { id: 'translations', label: 'Multilingual Dictionary', icon: Globe },
            { id: 'resume', label: 'Curriculum Vitae Studio', icon: FileDown },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setEditingItem(null); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-serif transition-colors text-left ${
                activeTab === tab.id
                  ? 'bg-[#A67C52] text-[#211711] font-bold shadow'
                  : 'text-[#E8DCC5]/80 hover:bg-[#302117] hover:text-[#F2E9D7]'
              }`}
            >
              <tab.icon size={15} className="shrink-0" />
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-8 bg-grain overflow-y-auto max-w-5xl">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#F2E9D7]">Faculty Chamber Overview</h2>
                <p className="text-xs text-[#A67C52] font-mono uppercase">
                  Current Status of Published Portfolio
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="academic-panel p-4 rounded">
                  <span className="text-xs text-[#A67C52] font-mono uppercase block">Profile Visibility</span>
                  <span className="text-lg font-bold text-[#F2E9D7] capitalize">{profile?.status || 'Published'}</span>
                </div>
                <div className="academic-panel p-4 rounded">
                  <span className="text-xs text-[#A67C52] font-mono uppercase block">Teaching Folios</span>
                  <span className="text-lg font-bold text-[#F2E9D7]">{resources.length} Materials</span>
                </div>
                <div className="academic-panel p-4 rounded">
                  <span className="text-xs text-[#A67C52] font-mono uppercase block">Pending Enquiries</span>
                  <span className="text-lg font-bold text-[#C1A477]">{enquiries.filter(e => e.status === 'unread').length} Unread</span>
                </div>
                <div className="academic-panel p-4 rounded">
                  <span className="text-xs text-[#A67C52] font-mono uppercase block">Languages Enabled</span>
                  <span className="text-lg font-bold text-[#F2E9D7]">EN / MR / HI</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="academic-panel p-6 rounded space-y-4">
                <h3 className="text-lg font-bold text-[#F2E9D7]">Curricular Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('resources')}
                    className="px-4 py-2 bg-[#A67C52] text-[#211711] font-bold text-xs uppercase rounded hover:bg-[#C1A477] transition-all"
                  >
                    + Upload New Resource (PDF)
                  </button>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="px-4 py-2 bg-[#302117] text-[#E8DCC5] border border-[#A67C52] text-xs uppercase rounded hover:bg-[#A67C52]/20 transition-all"
                  >
                    Review Inbound Correspondence
                  </button>
                  <a
                    href="/api/resume/download"
                    className="px-4 py-2 bg-[#302117] text-[#C1A477] border border-[#A67C52] text-xs uppercase rounded hover:bg-[#A67C52]/20 transition-all flex items-center gap-1.5"
                  >
                    <FileDown size={14} />
                    <span>Download Fresh CV</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === 'profile' && profile && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#F2E9D7]">Faculty Profile Dossier</h2>
                <p className="text-xs text-[#A67C52] font-mono uppercase">
                  Edit Jandy's academic biography, philosophy, and institutional affiliation
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="academic-panel p-6 rounded space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Official Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs sm:text-sm text-[#E8DCC5]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Informal Display Name</label>
                    <input
                      type="text"
                      value={profile.displayName}
                      onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs sm:text-sm text-[#E8DCC5]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Professional Title</label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs sm:text-sm text-[#E8DCC5]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Institution</label>
                    <input
                      type="text"
                      value={profile.institution}
                      onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs sm:text-sm text-[#E8DCC5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Professional Biography</label>
                  <textarea
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs sm:text-sm text-[#E8DCC5]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Teaching Philosophy</label>
                  <textarea
                    rows={3}
                    value={profile.philosophy}
                    onChange={(e) => setProfile({ ...profile, philosophy: e.target.value })}
                    className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs sm:text-sm text-[#E8DCC5]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Signature Scholarly Quote</label>
                  <input
                    type="text"
                    value={profile.quote}
                    onChange={(e) => setProfile({ ...profile, quote: e.target.value })}
                    className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs sm:text-sm text-[#E8DCC5]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs sm:text-sm text-[#E8DCC5]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Telephone</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs sm:text-sm text-[#E8DCC5]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Status</label>
                    <select
                      value={profile.status}
                      onChange={(e) => setProfile({ ...profile, status: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs sm:text-sm text-[#E8DCC5]"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#A67C52] text-[#211711] font-bold text-xs uppercase tracking-wider rounded hover:bg-[#C1A477] transition-all flex items-center gap-2"
                >
                  <Save size={14} />
                  <span>Preserve Profile Changes</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 7: TEACHING RESOURCES */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#F2E9D7]">Teaching Resources Folio</h2>
                  <p className="text-xs text-[#A67C52] font-mono uppercase">
                    Upload and publish biology study materials, notes, worksheets &amp; diagrams
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsNew(true);
                    setEditingItem({
                      title: '',
                      description: '',
                      category: 'Biology Notes',
                      topic: 'Plant Physiology',
                      classLevel: 'Class XII',
                      language: 'English',
                      fileUrl: '/api/resources/download/photosynthesis-master-folio.pdf',
                      fileType: 'PDF',
                      fileSize: '1.2 MB',
                      status: 'published',
                      isDemo: false,
                    });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#A67C52] text-[#211711] rounded text-xs font-bold uppercase tracking-wider hover:bg-[#C1A477] transition-all"
                >
                  <Plus size={14} />
                  <span>Add Resource</span>
                </button>
              </div>

              {/* Resource Form (Modal or Inline) */}
              {editingItem && (
                <div className="academic-panel p-6 rounded space-y-4 border-2 border-[#C1A477]">
                  <h3 className="text-lg font-bold text-[#F2E9D7]">
                    {isNew ? 'Catalog New Resource' : 'Edit Resource'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Title *</label>
                      <input
                        type="text"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs text-[#E8DCC5]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Category</label>
                      <select
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs text-[#E8DCC5]"
                      >
                        <option value="Biology Notes">Biology Notes</option>
                        <option value="Study Materials">Study Materials</option>
                        <option value="Worksheets">Worksheets</option>
                        <option value="Diagrams & Lab Sheets">Diagrams &amp; Lab Sheets</option>
                        <option value="Presentations & Question Banks">Presentations &amp; Question Banks</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Topic</label>
                      <input
                        type="text"
                        value={editingItem.topic}
                        onChange={(e) => setEditingItem({ ...editingItem, topic: e.target.value })}
                        className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs text-[#E8DCC5]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Academic Level</label>
                      <select
                        value={editingItem.classLevel}
                        onChange={(e) => setEditingItem({ ...editingItem, classLevel: e.target.value })}
                        className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs text-[#E8DCC5]"
                      >
                        <option value="Class XI">Class XI</option>
                        <option value="Class XII">Class XII</option>
                        <option value="NEET-UG">NEET-UG</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Language</label>
                      <select
                        value={editingItem.language}
                        onChange={(e) => setEditingItem({ ...editingItem, language: e.target.value })}
                        className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs text-[#E8DCC5]"
                      >
                        <option value="English">English</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Hindi">Hindi</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-[#A67C52] block mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs text-[#E8DCC5]"
                    />
                  </div>

                  {/* File Upload Control */}
                  <div className="p-4 bg-[#191715] border border-[#A67C52]/40 rounded space-y-2">
                    <label className="text-xs font-mono uppercase text-[#C1A477] block">
                      Upload Document File (PDF / Image)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={handleFileUpload}
                        className="text-xs text-[#E8DCC5] file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-mono file:bg-[#A67C52] file:text-[#211711] file:cursor-pointer"
                      />
                      {uploadingFile && <span className="text-xs text-[#A67C52] animate-pulse font-mono">Uploading...</span>}
                    </div>
                    <div className="text-[11px] font-mono text-[#73734E]">
                      Current Path: {editingItem.fileUrl} ({editingItem.fileSize})
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs font-mono text-[#E8DCC5]">
                      <input
                        type="checkbox"
                        checked={editingItem.status === 'published'}
                        onChange={(e) => setEditingItem({ ...editingItem, status: e.target.checked ? 'published' : 'draft' })}
                      />
                      <span>Publish Immediately on Public Website</span>
                    </label>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={async () => {
                        if (!editingItem.title) return alert('Title required');
                        const url = '/api/admin/resources';
                        const method = isNew ? 'POST' : 'PUT';
                        const res = await fetch(url, {
                          method,
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(editingItem),
                        });
                        if (res.ok) {
                          showNotification('Resource saved.');
                          setEditingItem(null);
                          loadData();
                        }
                      }}
                      className="px-4 py-2 bg-[#A67C52] text-[#211711] font-bold text-xs uppercase rounded hover:bg-[#C1A477]"
                    >
                      Save Resource
                    </button>
                    <button
                      onClick={() => setEditingItem(null)}
                      className="px-4 py-2 bg-[#302117] text-[#E8DCC5] text-xs uppercase rounded hover:bg-[#302117]/60"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Resource List */}
              <div className="space-y-3">
                {resources.map((res) => (
                  <div
                    key={res.id}
                    className="academic-panel p-4 rounded flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-[#F2E9D7]">{res.title}</h4>
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${res.status === 'published' ? 'bg-[#73734E]/30 text-[#C1A477]' : 'bg-yellow-950/40 text-yellow-300'}`}>
                          {res.status}
                        </span>
                        {res.isDemo && (
                          <span className="text-[10px] font-mono text-[#A67C52] bg-[#211711] px-1.5 py-0.5 rounded">
                            Demo
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#A67C52]">
                        {res.category} • {res.classLevel} • {res.language} • {res.fileSize}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={res.fileUrl}
                        target="_blank"
                        className="p-1.5 text-[#C1A477] hover:bg-[#302117] rounded"
                        title="Preview / Download"
                      >
                        <ExternalLink size={15} />
                      </a>
                      <button
                        onClick={() => { setIsNew(false); setEditingItem(res); }}
                        className="p-1.5 text-[#E8DCC5] hover:bg-[#302117] rounded"
                        title="Edit"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm(`Delete ${res.title}?`)) return;
                          await fetch(`/api/admin/resources?id=${res.id}`, { method: 'DELETE' });
                          showNotification('Resource removed.');
                          loadData();
                        }}
                        className="p-1.5 text-red-400 hover:bg-red-950/40 rounded"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#F2E9D7]">Inbound Correspondence Registry</h2>
                <p className="text-xs text-[#A67C52] font-mono uppercase">
                  Manage messages sent to Professor Janardhan Aghav via the contact folio
                </p>
              </div>

              {enquiries.length === 0 ? (
                <div className="academic-panel p-8 text-center rounded text-[#E8DCC5]/70 text-sm">
                  No correspondence letters currently recorded in the registry.
                </div>
              ) : (
                <div className="space-y-4">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className={`academic-panel p-5 rounded space-y-3 border-l-4 ${
                        enq.status === 'unread' ? 'border-l-[#C1A477]' : 'border-l-[#73734E]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-[#F2E9D7]">{enq.subject}</h4>
                            <span className="text-[10px] font-mono uppercase bg-[#211711] text-[#A67C52] px-2 py-0.5 rounded border border-[#A67C52]/30">
                              {enq.purpose}
                            </span>
                          </div>
                          <span className="text-xs text-[#C1A477]">
                            From: {enq.name} ({enq.email}) • {new Date(enq.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={enq.status}
                            onChange={async (e) => {
                              await fetch('/api/admin/enquiries', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: enq.id, status: e.target.value }),
                              });
                              loadData();
                            }}
                            className="text-xs font-mono bg-[#211711] border border-[#A67C52]/40 rounded px-2 py-1 text-[#E8DCC5]"
                          >
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="resolved">Resolved</option>
                          </select>

                          <button
                            onClick={async () => {
                              if (!confirm('Delete this inquiry?')) return;
                              await fetch(`/api/admin/enquiries?id=${enq.id}`, { method: 'DELETE' });
                              loadData();
                            }}
                            className="p-1 text-red-400 hover:bg-red-950/40 rounded"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm font-serif text-[#E8DCC5]/90 bg-[#191715] p-3 rounded border border-[#A67C52]/20">
                        {enq.message}
                      </p>

                      <div className="text-right">
                        <a
                          href={`mailto:${enq.email}?subject=Re: ${encodeURIComponent(enq.subject)}`}
                          className="text-xs font-mono uppercase text-[#C1A477] hover:underline"
                        >
                          Draft Reply via Email &rarr;
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 10: RESUME STUDIO */}
          {activeTab === 'resume' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#F2E9D7]">Curriculum Vitae Studio</h2>
                <p className="text-xs text-[#A67C52] font-mono uppercase">
                  Preview and generate the dynamic vintage academic curriculum vitae PDF
                </p>
              </div>

              <div className="academic-panel p-6 rounded space-y-4">
                <p className="text-sm font-serif text-[#E8DCC5]/90 leading-relaxed">
                  The academic résumé PDF is rendered in real-time pulling the latest published records from Janardhan Aghav's profile, scholastic degrees, teaching appointments, and scientific domains.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="/api/resume/download"
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#A67C52] text-[#211711] font-bold text-xs uppercase tracking-wider rounded hover:bg-[#C1A477] transition-all"
                  >
                    <FileDown size={16} />
                    <span>Generate &amp; Download Live PDF</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
