import API_BASE from '../api';
import React, { useState } from 'react';
import { MapPin, Mail, Phone, Clock, MessageSquare, Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

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
    // Open WhatsApp Chat link
    window.open('https://wa.me/919876543210?text=Hi,%20I%20have%20a%20query%20regarding%20Ernakulam%20Catechism%20classes.', '_blank');
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
            <div className="contact-info-block">
              <div className="contact-info-icon">
                <MapPin size={18} />
              </div>
              <div className="contact-info-text">
                <h4>Our Location</h4>
                <p>Ernakulam Catechism Unit<br />St. Mary's Church, Ernakulam<br />Kerala, India - 682031</p>
              </div>
            </div>

            <div className="contact-info-block">
              <div className="contact-info-icon">
                <Mail size={18} />
              </div>
              <div className="contact-info-text">
                <h4>Email Us</h4>
                <p>catechism@ernakulamchurch.in<br />info@ernakulamchurch.in</p>
              </div>
            </div>

            <div className="contact-info-block">
              <div className="contact-info-icon">
                <Phone size={18} />
              </div>
              <div className="contact-info-text">
                <h4>Call Us</h4>
                <p>+91 98765 43210<br />+91 98765 43211</p>
              </div>
            </div>

            <div className="contact-info-block">
              <div className="contact-info-icon">
                <Clock size={18} />
              </div>
              <div className="contact-info-text">
                <h4>Office Time</h4>
                <p>Monday - Saturday: 9:00 AM - 5:00 PM<br />Sunday: 8:00 AM - 1:00 PM</p>
              </div>
            </div>

            <button onClick={handleWhatsAppRedirect} className="whatsapp-btn">
              <MessageSquare size={18} />
              Chat on WhatsApp
            </button>
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

          {/* Map Column */}
          <div className="contact-map-wrapper">
            <iframe 
              title="St Marys Church Ernakulam" 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0881958210344!2d76.2741126759714!3d9.976451673418876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d4400000001%3A0x86774e1d7cf9d1a!2sSt.%20Mary&#39;s%20Cathedral%20Basilica%2C%20Ernakulam!5e0!3m2!1sen!2sin!4v1716616089764!5m2!1sen!2sin" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
