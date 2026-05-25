import React from 'react';

// Static hero component with a high-quality image of Jesus Christ
const Hero = () => {
  // Static content for the hero section (using first slide's text as example)
  const subtitle = "Welcome to Ernakulam Catechism";
  const title = <>Growing in Faith,<br /><span>Shining in Christ</span></>;
  const description = "Nurturing young hearts in faith, strengthening moral values, and building a vibrant, Christ-centered parish community.";
  const quote = "Let the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these.";
  const quoteRef = "Matthew 19:14";
  const image = "https://cdn.pixabay.com/photo/2023/12/25/16/12/jesus-8468800_1280.jpg";

  return (
    <section className="hero" style={{ position: 'relative' }}>
      <div className="container hero-grid">
        {/* Left Side: Text Content */}
        <div className="hero-content animate-fade-in">
          <h3>{subtitle}</h3>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="hero-quote">
            "{quote}"<br />
            <strong>– {quoteRef}</strong>
          </div>
          <div className="hero-actions">
            <a href="#about" className="btn btn-primary">Explore Ministry</a>
            <a href="#contact" className="btn btn-secondary">Join Activities</a>
          </div>
        </div>
        {/* Right Side: Static Image */}
        <div className="hero-illustration animate-fade-in">
          <div className="hero-image-wrapper">
            <img src={image} alt="Jesus Christ" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
