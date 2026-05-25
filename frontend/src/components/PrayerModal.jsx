import React, { useState } from 'react';
import API_BASE from '../api';
import { X, Send } from 'lucide-react';

const PrayerModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    requestText: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.requestText) {
      setStatus({ type: 'danger', message: 'Please fill in all fields.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch(`${API_BASE}/api/prayer-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Your prayer request has been submitted to the parish intercessors.' });
        setFormData({ name: '', requestText: '' });
        // Close modal after brief delay
        setTimeout(() => {
          onClose();
          setStatus({ type: '', message: '' });
        }, 3000);
      } else {
        setStatus({ type: 'danger', message: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      setStatus({ type: 'danger', message: 'Failed to connect to backend server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prayer-modal-backdrop" onClick={onClose}>
      <div className="prayer-modal" onClick={(e) => e.stopPropagation()}>
        <button className="prayer-modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <h2>Submit Prayer Request</h2>
        <p>
          "For where two or three gather in my name, there am I with them." – Matthew 18:20. 
          Share your needs, and our catechism family will join in interceding for you.
        </p>

        {status.message && (
          <div className={status.type === 'success' ? 'alert-success' : 'alert-danger'} style={{ marginBottom: '15px' }}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="prayer-modal-form">
          <div className="admin-form-group">
            <label htmlFor="prayer-name">Your Name / Family Name</label>
            <input 
              type="text" 
              id="prayer-name"
              name="name" 
              placeholder="E.g. Johnson Family" 
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="prayer-request">Prayer Intention</label>
            <textarea 
              id="prayer-request"
              name="requestText" 
              placeholder="Describe your prayer intention here..." 
              className="form-input"
              style={{ height: '100px', resize: 'none' }}
              value={formData.requestText}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', marginTop: '10px' }}
          >
            {loading ? 'Submitting...' : 'Submit Intention'} <Send size={14} style={{ marginLeft: '6px' }} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrayerModal;
