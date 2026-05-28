import API_BASE from '../api';
import React, { useState } from 'react';
import { MapPin, Mail, Phone, Clock, MessageSquare, Send } from 'lucide-react';

const ContactSection = ({ siteSettings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Use dynamic contact info from site settings, with fallbacks
  const contactInfo = siteSettings?.contactInfo || {};
  const location = contactInfo.location || 'Thiruhrudayakunnu Catechism Family\nSt. Mary\'s Church, Ernakulam\nKerala, India - 682031';
  const emailPrimary = contactInfo.emailPrimary || '';
  const emailSecondary = contactInfo.emailSecondary || '';
  const phonePrimary = contactInfo.phonePrimary || '';
  const phoneSecondary = contactInfo.phoneSecondary || '';
  const officeTime = contactInfo.officeTime || '';
  const whatsapp = contactInfo.whatsapp || '';
  const mapLink = contactInfo.mapLink || '';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'danger', message: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Send contact message to backend API
      const res = await fetch(`${API_BASE}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! We will get in touch soon.' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus({ type: 'danger', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      setStatus({ type: 'danger', message: 'Failed to connect to backend server.' });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const waNumber = whatsapp.replace(/[^0-9]/g, '');
    if (waNumber) {
      window.open(`https://wa.me/${waNumber}?text=Hi,%20I%20have%20a%20query%20regarding%20Ernakulam%20Catechism%20classes.`, '_blank');
    }
  };

  return (
    <section className="section-padding" id="contact" style={{ backgroundColor: 'var(--bg-white)' }}>
      <div className="container">
        <div className="section-header">
          <h2>Contact Us</h2>
          <p>Have questions or want to register? Get in touch with us through any of the channels below.</p>
        </div>

        <div className="contact-grid">
          {/* Info Blocks Column */}
          <div className="contact-info">
            {location && (
              <div className="contact-info-block">
                <div className="contact-info-icon">
                  <MapPin size={18} />
                </div>
                <div className="contact-info-text">
                  <h4>Our Location</h4>
                  <p>{location}</p>
                </div>
              </div>
            )}

            {(emailPrimary || emailSecondary) && (
              <div className="contact-info-block">
                <div className="contact-info-icon">
                  <Mail size={18} />
                </div>
                <div className="contact-info-text">
                  <h4>Email Us</h4>
                  <p>{emailPrimary}{emailPrimary && emailSecondary && <br />}{emailSecondary}</p>
                </div>
              </div>
            )}

            {(phonePrimary || phoneSecondary) && (
              <div className="contact-info-block">
                <div className="contact-info-icon">
                  <Phone size={18} />
                </div>
                <div className="contact-info-text">
                  <h4>Call Us</h4>
                  <p>{phonePrimary}{phonePrimary && phoneSecondary && <br />}{phoneSecondary}</p>
                </div>
              </div>
            )}

            {officeTime && (
              <div className="contact-info-block">
                <div className="contact-info-icon">
                  <Clock size={18} />
                </div>
                <div className="contact-info-text">
                  <h4>Office Time</h4>
                  <p>{officeTime}</p>
                </div>
              </div>
            )}

            {whatsapp && (
              <button onClick={handleWhatsAppRedirect} className="whatsapp-btn">
                <MessageSquare size={18} />
                Chat on WhatsApp
              </button>
            )}
          </div>

          {/* Contact Form Column */}
          <div className="contact-form-wrapper">
            {status.message && (
              <div className={status.type === 'success' ? 'alert-success' : 'alert-danger'} style={{ marginBottom: '20px' }}>
                {status.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="contact-form-grid">
              <div>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name *" 
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email *" 
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group-full">
                <input 
                  type="text" 
                  name="phone" 
                  placeholder="Phone Number (Optional)" 
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group-full">
                <textarea 
                  name="message" 
                  placeholder="Your Message *" 
                  className="form-input"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group-full" style={{ textAlign: 'right' }}>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                  style={{ display: 'inline-flex', padding: '12px 30px' }}
                >
                  {loading ? 'Sending...' : 'Send Message'} <Send size={14} style={{ marginLeft: '6px' }} />
                </button>
              </div>
            </form>
          </div>

          {mapLink && (
            <div className="contact-map-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee', borderRadius: '8px', padding: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <MapPin size={48} style={{ color: 'var(--primary)', marginBottom: '10px' }} />
                <h3>Find Us on Google Maps</h3>
                <p style={{ margin: '15px 0' }}>Click the link below to open our location in Google Maps.</p>
                <a 
                  href={mapLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  Open Map Link
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
