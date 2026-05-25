import React from 'react';
import { Eye, Target, Sparkles, Heart } from 'lucide-react';

const AboutSection = () => {
  const cards = [
    {
      title: 'Our Vision',
      text: 'To build a vibrant faith community rooted in Christ, witnessing the Gospel values in daily life.',
      icon: <Eye size={20} />
    },
    {
      title: 'Our Goal',
      text: 'To nurture young disciples with sound doctrine and value-based education for future leadership.',
      icon: <Target size={20} />
    },
    {
      title: 'Our Values',
      text: 'Faith, Love, Service, Unity, Compassion, and Reverence for the Holy Sacraments.',
      icon: <Sparkles size={20} />
    },
    {
      title: 'Our Service',
      text: 'Reaching out to the needy, extending support, and engaging actively in community welfare.',
      icon: <Heart size={20} />
    }
  ];

  return (
    <section className="section-padding" id="about" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container about-grid">
        {/* Left Graphics Side */}
        <div className="about-graphics">
          <div className="about-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800" 
              alt="Teaching the Word" 
            />
          </div>
          <div className="about-overlay-card">
            <h3>Our Mission</h3>
            <p>
              To form dedicated disciples of Jesus Christ through intensive scriptural study, regular prayer, sacrosanct devotion, and sincere service to the community.
            </p>
          </div>
        </div>

        {/* Right Details Side */}
        <div className="about-details">
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--secondary-dark)', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              ✦ ABOUT ERNAKULAM CATECHISM UNIT
            </span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-dark)', margin: '10px 0 20px', fontFamily: 'var(--font-serif)' }}>
              Forming Hearts, Strengthening Minds
            </h2>
            <p className="about-desc-text">
              Ernakulam Catechism Unit is committed to the spiritual growth of children and youth. Through structured faith formation sessions, sacramental preparation, and community outreach programs, we guide minds to know, love, and serve Jesus Christ and His Church.
            </p>
          </div>

          <div className="about-cards-grid">
            {cards.map((card, idx) => (
              <div key={idx} className="about-card">
                <div className="about-card-icon">{card.icon}</div>
                <h4>{card.title}</h4>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
