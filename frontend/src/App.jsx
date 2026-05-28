import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import AnnouncementsSection from './components/AnnouncementsSection';
import LeadersSection from './components/LeadersSection';
import EventsSection from './components/EventsSection';
import GallerySection from './components/GallerySection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const API_BASE = import.meta.env.VITE_API_URL || 'https://catechism-website-brown.vercel.app';

function App() {
  const [view, setView] = useState('home'); // 'home' or 'admin'
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [adminUser, setAdminUser] = useState(localStorage.getItem('adminUser') || '');
  // Dynamic Landing Page Data
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null);

  // Fetch Public Data
  const fetchPublicData = async () => {
    try {
      const [resAnn, resEvt, resGal, resLdr, resSettings] = await Promise.all([
        fetch(`${API_BASE}/api/announcements`),
        fetch(`${API_BASE}/api/events`),
        fetch(`${API_BASE}/api/gallery`),
        fetch(`${API_BASE}/api/leaders`),
        fetch(`${API_BASE}/api/settings`)
      ]);

      const [ann, evt, gal, ldr, settings] = await Promise.all([
        resAnn.json(), resEvt.json(), resGal.json(), resLdr.json(), resSettings.json()
      ]);

      if (Array.isArray(ann)) setAnnouncements(ann);
      if (Array.isArray(evt)) setEvents(evt);
      if (Array.isArray(gal)) setGalleryItems(gal);
      if (Array.isArray(ldr)) setLeaders(ldr);
      if (settings && settings._id) setSiteSettings(settings);

    } catch (err) {
      console.error('Failed to load landing page data:', err);
    }
  };

  useEffect(() => {
    fetchPublicData();
  }, [view]); // Refetch when toggling between admin and home so updates apply immediately

  // Scroll Reveal Animation Effect
  useEffect(() => {
    if (view !== 'home') return;

    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      const windowHeight = window.innerHeight;
      
      reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 80;
        
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial run to reveal elements already in viewport
    const timer = setTimeout(handleScroll, 300);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [view, announcements, events, galleryItems, leaders]);

  // Handle Admin Log in
  const handleLoginSuccess = (newToken, username) => {
    setToken(newToken);
    setAdminUser(username);
    localStorage.setItem('adminToken', newToken);
    localStorage.setItem('adminUser', username);
  };

  // Handle Admin Log out
  const handleLogout = () => {
    setToken(null);
    setAdminUser('');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setView('home');
  };

  // Toggle Admin Panel View
  const handleToggleAdmin = () => {
    if (view === 'home') {
      setView('admin');
    } else {
      setView('home');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Header (Shows in both views, toggles layout slightly) */}
      <Header 
        onToggleAdmin={handleToggleAdmin}
        isAdminLoggedIn={!!token}
        currentView={view}
      />

      {/* View Switching Router */}
      {view === 'admin' ? (
        token ? (
          <AdminDashboard token={token} onLogout={handleLogout} />
        ) : (
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        )
      ) : (
        <main style={{ flexGrow: 1 }}>
          {/* Landing Page Content */}
          <Hero />
          
          <div className="reveal">
            <Stats siteSettings={siteSettings} />
          </div>
          
          <div className="reveal-left">
            <AnnouncementsSection announcements={announcements} />
          </div>
          
          <div className="reveal">
            <LeadersSection leaders={leaders} />
          </div>
          
          <div className="reveal-right">
            <EventsSection events={events} />
          </div>
          
          <div className="reveal-left">
            <AboutSection />
          </div>

          <div className="reveal">
            <GallerySection galleryItems={galleryItems} />
          </div>
          
          <div className="reveal">
            <ContactSection siteSettings={siteSettings} />
          </div>
        </main>
      )}

      {/* Footer (Shows on public website) */}
      {view !== 'admin' && (
        <Footer 
          onToggleAdmin={handleToggleAdmin}
          isAdminLoggedIn={!!token}
          currentView={view}
          siteSettings={siteSettings}
        />
      )}

    </div>
  );
}

export default App;
