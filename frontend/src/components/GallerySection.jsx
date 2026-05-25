import React, { useState } from 'react';

const GallerySection = ({ galleryItems = [] }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Retreats',
    'Holy Mass',
    'Celebrations',
    'Youth Activities',
    'Bible Classes',
    'Competitions',
    'Charity Works',
    'Annual Day',
    'Prayer Meetings'
  ];

  // Filtering Logic
  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="section-padding" id="gallery" style={{ backgroundColor: 'var(--bg-white)' }}>
      <div className="container">
        <div className="section-header">
          <h2>Gallery Highlights</h2>
          <p>Moments of prayer, celebrations, education, and social outreach caught in frame.</p>
        </div>

        {/* Filter Categories Tabs */}
        <div className="gallery-categories">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`gallery-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.length === 0 ? (
            <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '50px', color: 'var(--text-muted)' }}>
              No images added for this category yet.
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div key={item._id || idx} className="gallery-item">
                <img 
                  src={item.imageUrl || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600"} 
                  alt={item.title || 'Gallery Image'} 
                />
                <div className="gallery-overlay">
                  <h4>{item.title || 'Catechism Unit Activity'}</h4>
                  <p>{item.category}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
