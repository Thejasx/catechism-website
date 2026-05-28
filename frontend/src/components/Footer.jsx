import React from 'react';
import logo from '../assets/logo.png';
import { Heart } from 'lucide-react';

const Footer = ({ onOpenPrayerModal, onToggleAdmin, isAdminLoggedIn, currentView, siteSettings }) => {
  // Use dynamic social links from site settings, with fallbacks
  const socialLinks = siteSettings?.socialLinks || {};
  const facebookUrl = socialLinks.facebook || '#';
  const twitterUrl = socialLinks.twitter || '#';
  const instagramUrl = socialLinks.instagram || '#';
  const youtubeUrl = socialLinks.youtube || '#';

  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        {/* Branding Column */}
        <div className="footer-info">
          <div className="footer-logo">
            <div className="logo-icon-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'transparent', border: 'none' }}>
              <img src={logo} alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem' }}>THIRUHRUDAYAKUNNU CATECHISM FAMILY</h2>
              <p>DIOCESE ERNAKULAM-ANGAMALI</p>
            </div>
          </div>
          <p className="footer-info-text">
            Building faith, inspiring hearts, and transforming lives in Christ. Nurturing the next generation of spiritual leaders and disciples.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#leadership">Leadership</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="footer-column">
          <h3>Useful Links</h3>
          <ul className="footer-links">
            <li>
              <button
                onClick={onToggleAdmin}
                style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}
              >
                {currentView === 'admin' ? 'Exit Admin Dashboard' : isAdminLoggedIn ? 'Go to Admin Panel' : 'Admin Login'}
              </button>
            </li>
          </ul>

          {/* Social Media Icons */}
          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>Follow Us</h4>
          <div className="footer-socials">
            {facebookUrl && facebookUrl !== '#' && (
              <a href={facebookUrl} target="_blank" rel="noreferrer" title="Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            )}
            {twitterUrl && twitterUrl !== '#' && (
              <a href={twitterUrl} target="_blank" rel="noreferrer" title="Twitter">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
            )}
            {instagramUrl && instagramUrl !== '#' && (
              <a href={instagramUrl} target="_blank" rel="noreferrer" title="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            )}
            {youtubeUrl && youtubeUrl !== '#' && (
              <a href={youtubeUrl} target="_blank" rel="noreferrer" title="YouTube">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            )}
          </div>
        </div>

      </div>

      <div className="container footer-bottom">
        <p>© 2026 Thiruhrudayakunnu Catechism Family. All Rights Reserved.</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Designed with <Heart size={12} className="text-secondary" style={{ fill: 'var(--secondary)' }} /> for God's Glory
        </p>
      </div>
    </footer>
  );
};

export default Footer;
