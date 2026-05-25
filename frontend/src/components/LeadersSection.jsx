import React, { useState } from 'react';

const LeadersSection = ({ leaders = [] }) => {
  const [activeDot, setActiveDot] = useState(0);

  // Group leaders into batches of 6 (or show all in responsive layout)
  // Clicking dots highlights them or acts as slider carousel indicators
  const handleDotClick = (idx) => {
    setActiveDot(idx);
  };

  return (
    <section className="section-padding" id="leadership" style={{ backgroundColor: 'var(--bg-white)' }}>
      <div className="container">
        <div className="section-header">
          <h2>Catechism Core Family</h2>
          <p>The dedicated spiritual guides and administrators heading our catechism division.</p>
        </div>

        <div className="leaders-grid">
          {leaders.length === 0 ? (
            <div style={{ gridColumn: 'span 6', textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
              No leadership data added yet.
            </div>
          ) : (
            leaders.map((leader, idx) => (
              <div key={leader._id || idx} className="leader-card">
                <div className="leader-image-container">
                  <img 
                    src={leader.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"} 
                    alt={leader.name} 
                  />
                </div>
                <h4 className="leader-name">{leader.name}</h4>
                <p className="leader-role">{leader.role}</p>
              </div>
            ))
          )}
        </div>

        {leaders.length > 0 && (
          <div className="leaders-dots">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`dot ${activeDot === i ? 'active' : ''}`}
                onClick={() => handleDotClick(i)}
              ></span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LeadersSection;
