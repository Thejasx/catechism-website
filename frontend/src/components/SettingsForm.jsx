import React, { useState, useEffect } from 'react';
import API_BASE from '../api';

const SettingsForm = ({ token }) => {
  const [settings, setSettings] = useState({
    socialLinks: { facebook: '', twitter: '', instagram: '', youtube: '', linkedin: '' },
    stats: { students: 0, teachers: 0, families: 0 },
    contactInfo: { location: '', emailPrimary: '', emailSecondary: '', phonePrimary: '', phoneSecondary: '', officeTime: '', whatsapp: '', mapLink: '' }
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/settings`);
        const data = await res.json();
        if (res.ok) setSettings(data);
      } catch (e) {
        console.error('Failed to load settings');
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (section, field) => e => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: e.target.value }
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Settings saved successfully');
        setSettings(data);
      } else {
        setMessage(data.message || 'Failed to save');
      }
    } catch (err) {
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-card">
      <h3>Site Settings</h3>
      {message && <div className="alert-success" style={{ marginBottom: '10px' }}>{message}</div>}
      <form onSubmit={handleSubmit} className="admin-form">
        <h4>Social Media Links</h4>
        {['facebook', 'twitter', 'instagram', 'youtube', 'linkedin'].map(key => (
          <div className="admin-form-group" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input type="text" className="form-input" value={settings.socialLinks[key] || ''} onChange={handleChange('socialLinks', key)} />
          </div>
        ))}
        <h4>Statistics Numbers</h4>
        {['students', 'teachers', 'families'].map(key => (
          <div className="admin-form-group" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input type="number" className="form-input" value={settings.stats[key] || 0} onChange={handleChange('stats', key)} />
          </div>
        ))}
        <h4>Contact Information</h4>
        {[
          { field: 'location', label: 'Location' },
          { field: 'emailPrimary', label: 'Primary Email' },
          { field: 'emailSecondary', label: 'Secondary Email' },
          { field: 'phonePrimary', label: 'Primary Phone' },
          { field: 'phoneSecondary', label: 'Secondary Phone' },
          { field: 'officeTime', label: 'Office Time' },
          { field: 'whatsapp', label: 'WhatsApp Number' },
          { field: 'mapLink', label: 'Google Maps Link' }
        ].map(item => (
          <div className="admin-form-group" key={item.field}>
            <label>{item.label}</label>
            <input type="text" className="form-input" value={settings.contactInfo[item.field] || ''} onChange={handleChange('contactInfo', item.field)} />
          </div>
        ))}
        <div className="admin-form-group" style={{ textAlign: 'right' }}>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '8px 20px' }}>
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
