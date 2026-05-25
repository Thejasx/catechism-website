import React from 'react';
import { Megaphone, Calendar, ArrowRight } from 'lucide-react';

const AnnouncementsSection = ({ announcements = [] }) => {
  // Find the first announcement of type 'new' to feature, or default to a biblical quote
  const featuredQuote = announcements.length > 0 
    ? (announcements.find(a => a.content) || announcements[0])
    : null;

  const defaultQuote = {
    title: "Catechism classes every Sunday at 9:00 AM",
    content: "Train up a child in the way he should go; even when he is old he will not depart from it.",
    dateText: "Proverbs 22:6"
  };

  const quoteToDisplay = featuredQuote && featuredQuote.content 
    ? {
        title: featuredQuote.title,
        content: featuredQuote.content,
        dateText: featuredQuote.dateText
      }
    : defaultQuote;

  // Render badge helper
  const getBadgeClass = (type) => {
    switch (type) {
      case 'new': return 'badge badge-new';
      case 'event': return 'badge badge-event';
      case 'info': return 'badge badge-info';
      case 'notice': return 'badge badge-notice';
      default: return 'badge badge-info';
    }
  };

  return (
    <section className="section-padding" id="announcements" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        <div className="section-header">
          <h2>Announcements & Updates</h2>
          <p>Stay informed with the latest updates, circulars, and events from our Catechism Unit.</p>
        </div>

        <div className="announcements-grid">
          {/* Featured Scripture / Quote Left Card */}
          <div className="announcements-featured">
            <div>
              <div className="featured-quote-icon">“</div>
              <h4 className="featured-bible-quote">
                {quoteToDisplay.content}
              </h4>
              <p className="featured-bible-reference">
                – {quoteToDisplay.title.includes('Proverbs') || quoteToDisplay.title.includes('Matthew') ? quoteToDisplay.title : 'Proverbs 22:6'}
              </p>
            </div>

            <div className="featured-illustration" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '18px', padding: '30px'
            }}>
              <div style={{
                width: '90px', height: '90px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 30px rgba(var(--primary-rgb, 79,70,229),0.35)'
              }}>
                {/* Cross SVG icon */}
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="19" y="4" width="6" height="36" rx="3" fill="white"/>
                  <rect x="4" y="15" width="36" height="6" rx="3" fill="white"/>
                </svg>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                {/* Bible icon */}
                <div style={{
                  width: '54px', height: '54px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    <line x1="12" y1="6" x2="12" y2="12"/><line x1="9" y1="9" x2="15" y2="9"/>
                  </svg>
                </div>
                {/* Heart icon */}
                <div style={{
                  width: '54px', height: '54px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                {/* Dove/Peace icon */}
                <div style={{
                  width: '54px', height: '54px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                  </svg>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.78rem', textAlign: 'center', margin: 0 }}>
                "For God so loved the world"<br/><strong style={{color:'white'}}>John 3:16</strong>
              </p>
            </div>
          </div>

          {/* Announcements Scroll List Right Card */}
          <div className="announcements-list-wrapper">
            <div className="announcements-list-header">
              <h3>
                <Megaphone size={20} className="text-primary" />
                Latest Updates
              </h3>
              <a href="#events" className="view-all-link">
                View All Announcements <ArrowRight size={14} />
              </a>
            </div>

            <div className="announcements-scroll-list">
              {announcements.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  No announcements published yet.
                </div>
              ) : (
                announcements.map((ann, idx) => (
                  <div key={ann._id || idx} className="announcement-item">
                    <div className="announcement-item-content">
                      <span className={getBadgeClass(ann.type)}>
                        {ann.type}
                      </span>
                      <span className="announcement-title">{ann.title}</span>
                    </div>
                    <span className="announcement-date">{ann.dateText}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;
