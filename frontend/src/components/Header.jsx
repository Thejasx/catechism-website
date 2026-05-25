import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  HeartHandshake, 
  LogIn, 
  User 
} from 'lucide-react';

const Header = ({ onOpenPrayerModal, onToggleAdmin, isAdminLoggedIn, currentView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-quote">
            "Let the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these." – Matthew 19:14
          </div>
          <div className="top-bar-links">
            <button onClick={onOpenPrayerModal} className="top-bar-link">
              <HeartHandshake size={14} className="text-secondary" />
              Prayer Request
            </button>
            <a href="#contact" className="top-bar-link">
              <User size={14} className="text-secondary" />
              Join Us
            </a>
            <button onClick={onToggleAdmin} className="top-bar-link">
              <LogIn size={14} className="text-secondary" />
              {currentView === 'admin' ? 'Exit Admin' : isAdminLoggedIn ? 'Admin Panel' : 'Admin Login'}
            </button>
            <div className="top-bar-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header / Navbar */}
      <header className="main-header" id="home">
        <div className="container nav-container">
          {/* Logo */}
          <a href="#home" className="logo" onClick={currentView === 'admin' ? onToggleAdmin : undefined}>
            <div className="logo-icon-container">
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'serif' }}>†</span>
            </div>
            <div className="logo-text">
              <h1>ERNAKULAM CATECHISM UNIT</h1>
              <p>CHURCH • CATECHISM FAMILY</p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          {currentView !== 'admin' && (
            <ul className="nav-links">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Desktop Call to Actions */}
          <div className="nav-actions">
            <button onClick={onOpenPrayerModal} className="btn btn-secondary btn-gold" style={{ borderRadius: '4px' }}>
              Prayer Request
            </button>
            <a href="#contact" className="btn btn-primary btn-gold" style={{ borderRadius: '4px', backgroundColor: '#3c1e69', color: '#fff', borderColor: '#3c1e69' }}>
              Join Us
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          {currentView !== 'admin' && (
            <button className="menu-toggle" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          )}
        </div>
      </header>

      {/* Mobile Navigation Drawer Backdrop */}
      <div 
        className={`mobile-nav-drawer-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setMobileMenuOpen(false)}>
          <X size={24} />
        </button>
        <ul className="mobile-nav-links">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <a 
                href={link.href} 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-nav-actions">
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPrayerModal();
            }} 
            className="btn btn-secondary btn-gold"
            style={{ width: '100%', borderRadius: '4px' }}
          >
            Prayer Request
          </button>
          <a 
            href="#contact" 
            className="btn btn-primary btn-gold"
            onClick={() => setMobileMenuOpen(false)}
            style={{ width: '100%', textAlign: 'center', borderRadius: '4px', backgroundColor: '#3c1e69', color: '#fff', borderColor: '#3c1e69' }}
          >
            Join Us
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
