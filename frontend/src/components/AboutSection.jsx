import React, { useState } from 'react';
import { Eye, Target, Sparkles, Heart } from 'lucide-react';

const AboutSection = () => {
  const [showMalayalam, setShowMalayalam] = useState(false);
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
          <div className="about-image-wrapper" style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: 'none', height: '100%', minHeight: '500px' }}>
            <img 
              src="https://images.unsplash.com/photo-1555696958-c5049b866f6f?w=1200&auto=format&fit=crop&q=80" 
              alt="Jesus Statue" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            
            <div className="about-overlay-card" style={{ 
              position: 'absolute', 
              bottom: '30px', 
              left: '30px', 
              right: '30px', 
              background: 'rgba(255, 255, 255, 0.85)', 
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: 'var(--primary-dark)', 
              padding: '30px', 
              borderRadius: '20px', 
              boxShadow: '0 15px 35px rgba(0,0,0,0.1)', 
              borderLeft: '6px solid var(--secondary)',
              transition: 'transform 0.3s ease',
              margin: 0
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h3 style={{ color: 'var(--primary-dark)', marginBottom: '12px', fontSize: '1.5rem', fontWeight: '800' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6', opacity: '0.9' }}>
                To form dedicated disciples of Jesus Christ through intensive scriptural study, regular prayer, sacrosanct devotion, and sincere service to the community.
              </p>
            </div>
          </div>
        </div>

        {/* Right Details Side */}
        <div className="about-details" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div>
            <span style={{ 
              fontSize: '0.85rem', 
              color: 'var(--secondary)', 
              fontWeight: '800', 
              letterSpacing: '0.15em', 
              textTransform: 'uppercase',
              background: 'var(--bg-lavender)',
              padding: '6px 14px',
              borderRadius: '30px',
              display: 'inline-block',
              marginBottom: '20px'
            }}>
              ✦ About Catechism
            </span>
            <h2 style={{ fontSize: '2.8rem', color: 'var(--primary-dark)', margin: '0 0 25px', fontFamily: 'var(--font-serif)', lineHeight: '1.2' }}>
              Forming Hearts, <br/> Strengthening Minds
            </h2>
            <div className="about-desc-text" style={{ marginBottom: '35px', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
              {showMalayalam ? (
                <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                  <h4 style={{ color: 'var(--primary-dark)', marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>കത്തോലിക്കാ മതബോധനത്തെക്കുറിച്ച്</h4>
                  <p style={{ marginBottom: '15px' }}>
                    സീറോ മലബാർ സഭയുടെ മതബോധന പാരമ്പര്യം സഭയുടെ ചരിത്രത്തിനുതന്നെ സമാനമായ പ്രാചീനതയുള്ളതാണ്. ലോകത്തിലെ മറ്റു സഭകളിലേതുപോലെ തന്നെ, വിശ്വാസം ഒരു തലമുറയിൽ നിന്നും അടുത്ത തലമുറയിലേക്ക് കൈമാറുന്ന സമ്പന്നമായ മതബോധന സംവിധാനവും വിശ്വാസപരമായ ജീവിതശൈലിയുമാണ് വിശുദ്ധ തോമാശ്ലീഹായുടെ പാരമ്പര്യമുള്ള ക്രൈസ്തവ സമൂഹത്തിനിടയിലും നിലനിന്നിരുന്നത്.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    എന്നാൽ സീറോ മലബാർ സഭയിലെ മതബോധന ചരിത്രത്തെ സമഗ്രമായും ക്രമബദ്ധമായും അവതരിപ്പിക്കുന്ന രേഖകൾ വളരെ പരിമിതമാണ്. അതുകൊണ്ടുതന്നെ സഭയുടെ ചരിത്രരേഖകളിൽ നിന്നും ജീവിച്ചിരിക്കുന്ന വിശ്വാസപാരമ്പര്യങ്ങളിൽ നിന്നും ഈ മതബോധന പൈതൃകത്തിന്റെ അടയാളങ്ങൾ കണ്ടെത്തേണ്ടിവരുന്നു.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    കുടുംബം, ദേവാലയം, സമൂഹം എന്നിവയെ കേന്ദ്രീകരിച്ചായിരുന്നു മതബോധനത്തിന്റെ വളർച്ച. വിശ്വാസജീവിതം, പ്രാർത്ഥന, സ്നേഹം, ശുശ്രൂഷ, ആത്മീയ മൂല്യങ്ങൾ എന്നിവ കുട്ടികളുടെയും യുവജനങ്ങളുടെയും ജീവിതത്തിൽ വളർത്തിപ്പോറ്റുക എന്നതാണ് കത്തോലിക്കാ മതബോധനത്തിന്റെ പ്രധാന ലക്ഷ്യം.
                  </p>
                  <p>
                    ഇന്നും സീറോ മലബാർ സഭയുടെ കത്തോലിക്കാ മതബോധന പ്രസ്ഥാനം വിശ്വാസത്തെ പുതിയ തലമുറയിലേക്ക് സന്തോഷത്തോടും ആത്മീയ ആവേശത്തോടും കൂടി കൈമാറിക്കൊണ്ടിരിക്കുന്നു.
                  </p>
                </div>
              ) : (
                <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                  <p style={{ marginBottom: '15px' }}>
                    The catechetical heritage of the Syro-Malabar Church is as old as this Church itself. As was the case with all other Churches, among the St. Thomas Christians also there existed a system of catechesis by which faith was handed down from generation to generation. 
                  </p>
                  <p>
                    However, there is no comprehensive and chronological exposition of the history of catechesis of the Syro-Malabar Church. Hence, many things have to be traced from the historical documents and living traditions of the Church, passed down joyfully to the next generations.
                  </p>
                </div>
              )}

              <button 
                onClick={() => setShowMalayalam(!showMalayalam)}
                style={{
                  marginTop: '20px',
                  background: 'var(--primary-dark)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--secondary-dark)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'var(--primary-dark)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {showMalayalam ? 'Read in English' : 'വായിക്കാൻ മലയാളം (Read in Malayalam)'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '60px' }}>
        <div className="about-cards-responsive-grid">
          {cards.map((card, idx) => (
            <div key={idx} className="about-card" style={{ 
              background: 'var(--bg-white)', 
              padding: '25px', 
              borderRadius: '16px', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.03)', 
              border: '1px solid rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
              e.currentTarget.style.borderColor = 'var(--secondary-light)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.03)';
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
            }}
            >
              <div className="about-card-icon" style={{ 
                width: '55px', height: '55px', 
                borderRadius: '14px', 
                background: 'var(--bg-lavender)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                color: 'var(--primary)', marginBottom: '18px', 
                transition: 'all 0.3s ease'
              }}>
                {card.icon}
              </div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '8px', fontWeight: '700' }}>{card.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
