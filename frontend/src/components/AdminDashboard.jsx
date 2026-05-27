import React, { useState, useEffect } from 'react';
import API_BASE from '../api';
import { 
  LayoutDashboard, 
  Megaphone, 
  Calendar, 
  Image as ImageIcon, 
  Users, 
  Mail, 
  HeartHandshake, 
  Plus, 
  Edit2, 
  Trash2, 
  Upload, 
  X, 
  LogOut,
  Settings
} from 'lucide-react';
import SettingsForm from './SettingsForm';

const AdminDashboard = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data States
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [prayers, setPrayers] = useState([]);

  // Loading & Error States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modal / Form States
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // holds item being edited, else null for add
  const [uploading, setUploading] = useState(false);

  // Form Fields
  const [annForm, setAnnForm] = useState({ title: '', content: '', type: 'info', dateText: 'Today' });
  const [evtForm, setEvtForm] = useState({ title: '', description: '', date: '', time: '', location: '', imageUrl: '', countdownTarget: '' });
  const [galForm, setGalForm] = useState({ imageUrl: '', category: 'Retreats', title: '' });
  const [ldrForm, setLdrForm] = useState({ name: '', role: '', imageUrl: '', order: 0 });

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const [resAnn, resEvt, resGal, resLdr, resMsg, resPry] = await Promise.all([
        fetch(`${API_BASE}/api/announcements`),
        fetch(`${API_BASE}/api/events`),
        fetch(`${API_BASE}/api/gallery`),
        fetch(`${API_BASE}/api/leaders`),
        fetch(`${API_BASE}/api/messages`, { headers }),
        fetch(`${API_BASE}/api/prayer-requests`, { headers })
      ]);

      const [ann, evt, gal, ldr, msg, pry] = await Promise.all([
        resAnn.json(), resEvt.json(), resGal.json(), resLdr.json(), resMsg.json(), resPry.json()
      ]);

      setAnnouncements(Array.isArray(ann) ? ann : []);
      setEvents(Array.isArray(evt) ? evt : []);
      setGalleryItems(Array.isArray(gal) ? gal : []);
      setLeaders(Array.isArray(ldr) ? ldr : []);
      setMessages(Array.isArray(msg) ? msg : []);
      setPrayers(Array.isArray(pry) ? pry : []);

    } catch (err) {
      setError('Failed to fetch data from the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // Handle file uploads
  const handleImageUpload = async (e, setFormFields) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setFormFields(prev => ({ ...prev, imageUrl: `${API_BASE}${data.imageUrl}` }));
        setSuccess('Image uploaded successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Image upload failed.');
      }
    } catch (err) {
      setError('Network error during file upload.');
    } finally {
      setUploading(false);
    }
  };

  // CRUD Actions
  const handleDelete = async (endpoint, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setSuccess('Item deleted successfully!');
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await res.json();
        setError(data.message || 'Delete failed.');
      }
    } catch (err) {
      setError('Connection failure.');
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setAnnForm({ title: '', content: '', type: 'info', dateText: 'Today' });
    setEvtForm({ title: '', description: '', date: '', time: '', location: '', imageUrl: '', countdownTarget: '' });
    setGalForm({ imageUrl: '', category: 'Retreats', title: '' });
    setLdrForm({ name: '', role: '', imageUrl: '', order: 0 });
    setShowModal(true);
  };

  const handleOpenEditModal = (tab, item) => {
    setEditingItem(item);
    if (tab === 'announcements') {
      setAnnForm({ title: item.title, content: item.content || '', type: item.type, dateText: item.dateText });
    } else if (tab === 'events') {
      setEvtForm({
        title: item.title,
        description: item.description || '',
        date: item.date,
        time: item.time || '',
        location: item.location,
        imageUrl: item.imageUrl || '',
        countdownTarget: item.countdownTarget ? new Date(item.countdownTarget).toISOString().substring(0, 16) : ''
      });
    } else if (tab === 'gallery') {
      setGalForm({ imageUrl: item.imageUrl, category: item.category, title: item.title || '' });
    } else if (tab === 'leaders') {
      setLdrForm({ name: item.name, role: item.role, imageUrl: item.imageUrl, order: item.order });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let body = {};
    let endpoint = activeTab;

    if (activeTab === 'announcements') body = annForm;
    else if (activeTab === 'events') body = evtForm;
    else if (activeTab === 'gallery') body = galForm;
    else if (activeTab === 'leaders') body = ldrForm;

    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem 
      ? `${API_BASE}/api/${endpoint}/${editingItem._id}`
      : `${API_BASE}/api/${endpoint}`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setSuccess(editingItem ? 'Item updated successfully!' : 'Item created successfully!');
        setShowModal(false);
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await res.json();
        setError(data.message || 'Save operation failed.');
      }
    } catch (err) {
      setError('Connection failure.');
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar Panel */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <div className="admin-sidebar-logo-icon">†</div>
            <div>
              <h3>Admin Center</h3>
              <p>Catechism Unit</p>
            </div>
          </div>
        </div>

        <nav className="admin-nav">
          <li 
            className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveTab('dashboard'); setError(''); setSuccess(''); }}
          >
            <LayoutDashboard size={18} /> Overview
          </li>
          <li 
            className={`admin-nav-item ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => { setActiveTab('announcements'); setError(''); setSuccess(''); }}
          >
            <Megaphone size={18} /> Announcements
          </li>
          <li 
            className={`admin-nav-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => { setActiveTab('events'); setError(''); setSuccess(''); }}
          >
            <Calendar size={18} /> Events Manager
          </li>
          <li 
            className={`admin-nav-item ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => { setActiveTab('gallery'); setError(''); setSuccess(''); }}
          >
            <ImageIcon size={18} /> Gallery Manager
          </li>
          <li 
            className={`admin-nav-item ${activeTab === 'leaders' ? 'active' : ''}`}
            onClick={() => { setActiveTab('leaders'); setError(''); setSuccess(''); }}
          >
            <Users size={18} /> Leaders / Family
          </li>
          <li 
            className={`admin-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => { setActiveTab('messages'); setError(''); setSuccess(''); }}
          >
            <Mail size={18} /> Messages ({messages.length})
          </li>
          <li 
            className={`admin-nav-item ${activeTab === 'prayers' ? 'active' : ''}`}
            onClick={() => { setActiveTab('prayers'); setError(''); setSuccess(''); }}
          >
            <HeartHandshake size={18} /> Prayers ({prayers.length})
          </li>
          <li 
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('settings'); setError(''); setSuccess(''); }}
          >
            <Settings size={18} /> Site Settings
          </li>
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={onLogout} className="admin-logout-btn">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="admin-main">
        <div className="admin-main-header">
          <h2>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard
          </h2>
          
          <div className="admin-main-header-actions">
            {['announcements', 'events', 'gallery', 'leaders'].includes(activeTab) && (
              <button onClick={handleOpenAddModal} className="btn btn-primary" style={{ borderRadius: '6px' }}>
                <Plus size={16} /> Add New Item
              </button>
            )}
          </div>
        </div>

        {/* Global Alerts */}
        {error && <div className="alert-danger" style={{ marginBottom: '20px' }}>{error}</div>}
        {success && <div className="alert-success" style={{ marginBottom: '20px' }}>{success}</div>}

        {/* --- VIEW CONTENT SWAP --- */}
        
        {/* 1. OVERVIEW SCREEN */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="admin-stats-bar">
              <div className="admin-stat-card">
                <div className="admin-stat-info">
                  <h4>Announcements</h4>
                  <p>{announcements.length}</p>
                </div>
                <div className="admin-stat-icon"><Megaphone size={20} /></div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-info">
                  <h4>Upcoming Events</h4>
                  <p>{events.length}</p>
                </div>
                <div className="admin-stat-icon"><Calendar size={20} /></div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-info">
                  <h4>Gallery Images</h4>
                  <p>{galleryItems.length}</p>
                </div>
                <div className="admin-stat-icon"><ImageIcon size={20} /></div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-info">
                  <h4>Core Family</h4>
                  <p>{leaders.length}</p>
                </div>
                <div className="admin-stat-icon"><Users size={20} /></div>
              </div>
            </div>

            <div className="admin-card">
              <h3>System Overview</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
                Welcome to the Church Catechism Admin Center! Select any tab from the sidebar to start creating, editing, and deleting items. Contact submissions and prayer request intentions are updated dynamically below.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }}>
                {/* Recent Messages Summary */}
                <div style={{ backgroundColor: 'var(--bg-main)', padding: '20px', borderRadius: '8px' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Recent Messages ({messages.slice(0, 3).length})</h4>
                  {messages.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>No messages received.</p>
                  ) : (
                    messages.slice(0, 3).map((m, i) => (
                      <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '10px' }}>
                        <strong style={{ fontSize: '0.9rem' }}>{m.name}</strong>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.message}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Recent Prayers Summary */}
                <div style={{ backgroundColor: 'var(--bg-main)', padding: '20px', borderRadius: '8px' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Recent Prayers ({prayers.slice(0, 3).length})</h4>
                  {prayers.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>No requests submitted.</p>
                  ) : (
                    prayers.slice(0, 3).map((p, i) => (
                      <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '10px' }}>
                        <strong style={{ fontSize: '0.9rem' }}>{p.name}</strong>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.requestText}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. ANNOUNCEMENTS LIST */}
        {activeTab === 'announcements' && (
          <div className="admin-card">
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Tag</th>
                    <th>Title</th>
                    <th>Readings/Quote</th>
                    <th>Date Badge</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.map((ann) => (
                    <tr key={ann._id}>
                      <td><span className={`badge badge-${ann.type}`}>{ann.type}</span></td>
                      <td><strong>{ann.title}</strong></td>
                      <td style={{ color: 'var(--text-muted)', fontStyle: 'italic', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ann.content || 'N/A'}</td>
                      <td>{ann.dateText}</td>
                      <td>
                        <div className="actions-cell">
                          <button onClick={() => handleOpenEditModal('announcements', ann)} className="btn-icon btn-icon-edit"><Edit2 size={14} /></button>
                          <button onClick={() => handleDelete('announcements', ann._id)} className="btn-icon btn-icon-delete"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. EVENTS LIST */}
        {activeTab === 'events' && (
          <div className="admin-card">
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Schedule Date</th>
                    <th>Location</th>
                    <th>Countdown Target</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((evt) => (
                    <tr key={evt._id}>
                      <td>
                        <img 
                          src={evt.imageUrl || "https://images.unsplash.com/photo-1548625361-155deee22312?w=80" } 
                          alt="" 
                          style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} 
                        />
                      </td>
                      <td><strong>{evt.title}</strong></td>
                      <td>{evt.date} {evt.time}</td>
                      <td>{evt.location}</td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(evt.countdownTarget).toLocaleString()}</td>
                      <td>
                        <div className="actions-cell">
                          <button onClick={() => handleOpenEditModal('events', evt)} className="btn-icon btn-icon-edit"><Edit2 size={14} /></button>
                          <button onClick={() => handleDelete('events', evt._id)} className="btn-icon btn-icon-delete"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. GALLERY LIST */}
        {activeTab === 'gallery' && (
          <div className="admin-card">
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Preview</th>
                    <th>Category</th>
                    <th>Image Label</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {galleryItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img 
                          src={item.imageUrl} 
                          alt="" 
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} 
                        />
                      </td>
                      <td><span className="badge badge-info">{item.category}</span></td>
                      <td>{item.title || 'Untitled'}</td>
                      <td>
                        <div className="actions-cell">
                          <button onClick={() => handleOpenEditModal('gallery', item)} className="btn-icon btn-icon-edit"><Edit2 size={14} /></button>
                          <button onClick={() => handleDelete('gallery', item._id)} className="btn-icon btn-icon-delete"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. LEADERS LIST */}
        {activeTab === 'leaders' && (
          <div className="admin-card">
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Sorting Order</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaders.map((leader) => (
                    <tr key={leader._id}>
                      <td>
                        <img 
                          src={leader.imageUrl} 
                          alt="" 
                          style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '50%' }} 
                        />
                      </td>
                      <td><strong>{leader.name}</strong></td>
                      <td>{leader.role}</td>
                      <td>{leader.order}</td>
                      <td>
                        <div className="actions-cell">
                          <button onClick={() => handleOpenEditModal('leaders', leader)} className="btn-icon btn-icon-edit"><Edit2 size={14} /></button>
                          <button onClick={() => handleDelete('leaders', leader._id)} className="btn-icon btn-icon-delete"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. MESSAGES LIST */}
        {activeTab === 'messages' && (
          <div className="admin-card">
            <div className="msg-list">
              {messages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>No messages received.</div>
              ) : (
                messages.map((m) => (
                  <div key={m._id} className="msg-card">
                    <div className="msg-header">
                      <div className="msg-sender">
                        <h4>{m.name}</h4>
                        <p>{m.email} {m.phone ? `| ${m.phone}` : ''}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span className="msg-time">{new Date(m.createdAt).toLocaleString()}</span>
                        <button onClick={() => handleDelete('messages', m._id)} className="btn-icon btn-icon-delete"><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <div className="msg-body">{m.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 7. PRAYER INTENTIONS LIST */}
        {activeTab === 'prayers' && (
          <div className="admin-card">
            <div className="msg-list">
              {prayers.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>No prayer requests submitted.</div>
              ) : (
                prayers.map((p) => (
                  <div key={p._id} className="msg-card">
                    <div className="msg-header">
                      <div className="msg-sender">
                        <h4>{p.name}</h4>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span className="msg-time">{new Date(p.createdAt).toLocaleString()}</span>
                        <button onClick={() => handleDelete('prayer-requests', p._id)} className="btn-icon btn-icon-delete"><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <div className="msg-body" style={{ fontStyle: 'italic', color: 'var(--primary)' }}>"{p.requestText}"</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
          {activeTab === 'settings' && (
            <SettingsForm token={token} />
          )}
      </main>

      {/* --- FORM EDIT/ADD MODAL --- */}
      {showModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="prayer-modal-close" 
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '15px', right: '15px' }}
            >
              <X size={18} />
            </button>

            <h3>
              {editingItem ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
            </h3>

            <form onSubmit={handleSave} className="admin-form">
              
              {/* FORMS SWAP FOR TABS */}
              
              {/* 1. Announcement Fields */}
              {activeTab === 'announcements' && (
                <>
                  <div className="admin-form-group">
                    <label>Title *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={annForm.title}
                      onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Bible Scripture (Featured Block Only)</label>
                    <textarea 
                      className="form-input" 
                      style={{ height: '70px', resize: 'none' }}
                      value={annForm.content}
                      onChange={(e) => setAnnForm({ ...annForm, content: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Tag Category</label>
                    <select 
                      className="form-input"
                      value={annForm.type}
                      onChange={(e) => setAnnForm({ ...annForm, type: e.target.value })}
                    >
                      <option value="new">NEW</option>
                      <option value="event">EVENT</option>
                      <option value="info">INFO</option>
                      <option value="notice">NOTICE</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Date Label *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="E.g. Today, 20 May 2025"
                      value={annForm.dateText}
                      onChange={(e) => setAnnForm({ ...annForm, dateText: e.target.value })}
                      required 
                    />
                  </div>
                </>
              )}

              {/* 2. Event Fields */}
              {activeTab === 'events' && (
                <>
                  <div className="admin-form-group">
                    <label>Title *</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={evtForm.title}
                      onChange={(e) => setEvtForm({ ...evtForm, title: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Description</label>
                    <textarea 
                      className="form-input"
                      style={{ height: '70px', resize: 'none' }}
                      value={evtForm.description}
                      onChange={(e) => setEvtForm({ ...evtForm, description: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Calendar Date Label * (E.g. "07 June 2026", "20 - 22 June 2026")</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={evtForm.date}
                      onChange={(e) => setEvtForm({ ...evtForm, date: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Time Label</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="E.g. 6:30 PM"
                      value={evtForm.time}
                      onChange={(e) => setEvtForm({ ...evtForm, time: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Location *</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={evtForm.location}
                      onChange={(e) => setEvtForm({ ...evtForm, location: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Countdown Target Date/Time *</label>
                    <input 
                      type="datetime-local" 
                      className="form-input"
                      value={evtForm.countdownTarget}
                      onChange={(e) => setEvtForm({ ...evtForm, countdownTarget: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Image URL</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="Enter HTTP Image URL or upload below"
                      value={evtForm.imageUrl}
                      onChange={(e) => setEvtForm({ ...evtForm, imageUrl: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Or Upload Image File</label>
                    <div className="upload-btn-wrapper">
                      <button type="button" className="btn btn-secondary" style={{ padding: '8px 15px', fontSize: '0.8rem', borderRadius: '4px' }}>
                        <Upload size={14} style={{ marginRight: '6px' }} /> {uploading ? 'Uploading...' : 'Choose Image'}
                      </button>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setEvtForm)} 
                      />
                    </div>
                    {evtForm.imageUrl && (
                      <div style={{ marginTop: '10px' }}>
                        <img src={evtForm.imageUrl} alt="preview" className="image-preview-thumbnail" />
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* 3. Gallery Fields */}
              {activeTab === 'gallery' && (
                <>
                  <div className="admin-form-group">
                    <label>Category *</label>
                    <select 
                      className="form-input"
                      value={galForm.category}
                      onChange={(e) => setGalForm({ ...galForm, category: e.target.value })}
                    >
                      <option value="Retreats">Retreats</option>
                      <option value="Holy Mass">Holy Mass</option>
                      <option value="Celebrations">Celebrations</option>
                      <option value="Youth Activities">Youth Activities</option>
                      <option value="Bible Classes">Bible Classes</option>
                      <option value="Competitions">Competitions</option>
                      <option value="Charity Works">Charity Works</option>
                      <option value="Annual Day">Annual Day</option>
                      <option value="Prayer Meetings">Prayer Meetings</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Image Title / Caption</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={galForm.title}
                      onChange={(e) => setGalForm({ ...galForm, title: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Image URL *</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="Enter HTTP Image URL or upload below"
                      value={galForm.imageUrl}
                      onChange={(e) => setGalForm({ ...galForm, imageUrl: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Or Upload Image File</label>
                    <div className="upload-btn-wrapper">
                      <button type="button" className="btn btn-secondary" style={{ padding: '8px 15px', fontSize: '0.8rem', borderRadius: '4px' }}>
                        <Upload size={14} style={{ marginRight: '6px' }} /> {uploading ? 'Uploading...' : 'Choose Image'}
                      </button>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setGalForm)} 
                      />
                    </div>
                    {galForm.imageUrl && (
                      <div style={{ marginTop: '10px' }}>
                        <img src={galForm.imageUrl} alt="preview" className="image-preview-thumbnail" />
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* 4. Leader Fields */}
              {activeTab === 'leaders' && (
                <>
                  <div className="admin-form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={ldrForm.name}
                      onChange={(e) => setLdrForm({ ...ldrForm, name: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Role * (E.g. Chairman, Headmistress)</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={ldrForm.role}
                      onChange={(e) => setLdrForm({ ...ldrForm, role: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Sorting Order Number</label>
                    <input 
                      type="number" 
                      className="form-input"
                      placeholder="Lower number sorts first"
                      value={ldrForm.order}
                      onChange={(e) => setLdrForm({ ...ldrForm, order: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Profile Image URL *</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="Enter HTTP Image URL or upload below"
                      value={ldrForm.imageUrl}
                      onChange={(e) => setLdrForm({ ...ldrForm, imageUrl: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Or Upload Profile Image File</label>
                    <div className="upload-btn-wrapper">
                      <button type="button" className="btn btn-secondary" style={{ padding: '8px 15px', fontSize: '0.8rem', borderRadius: '4px' }}>
                        <Upload size={14} style={{ marginRight: '6px' }} /> {uploading ? 'Uploading...' : 'Choose Image'}
                      </button>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setLdrForm)} 
                      />
                    </div>
                    {ldrForm.imageUrl && (
                      <div style={{ marginTop: '10px' }}>
                        <img src={ldrForm.imageUrl} alt="preview" className="image-preview-thumbnail" style={{ borderRadius: '50%' }} />
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="admin-form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowModal(false)}
                  style={{ borderRadius: '4px', padding: '10px 20px' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ borderRadius: '4px', padding: '10px 25px' }}
                >
                  Save Item
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
