import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

// Countdown Sub-Component for individual event cards
const EventCountdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeftObj = { days: '00', hours: '00', minutes: '00', seconds: '00' };

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        timeLeftObj = {
          days: days < 10 ? `0${days}` : days.toString(),
          hours: hours < 10 ? `0${hours}` : hours.toString(),
          minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
          seconds: seconds < 10 ? `0${seconds}` : seconds.toString()
        };
      }
      return timeLeftObj;
    };

    setTimeLeft(calculateTime());

    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="event-countdown-wrapper">
      <div className="event-countdown-title">Countdown to event</div>
      <div className="event-countdown-timer">
        <div className="countdown-box">
          <span className="countdown-val">{timeLeft.days}</span>
          <span className="countdown-lbl">Days</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-val">{timeLeft.hours}</span>
          <span className="countdown-lbl">Hours</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-val">{timeLeft.minutes}</span>
          <span className="countdown-lbl">Mins</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-val">{timeLeft.seconds}</span>
          <span className="countdown-lbl">Secs</span>
        </div>
      </div>
    </div>
  );
};

const EventsSection = ({ events = [] }) => {
  // Helper to extract day and month abbreviation for card tags
  const getEventDateInfo = (dateString, countdownTarget) => {
    try {
      const target = new Date(countdownTarget);
      if (!isNaN(target.getTime())) {
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return {
          month: months[target.getMonth()],
          day: target.getDate() < 10 ? `0${target.getDate()}` : target.getDate().toString()
        };
      }
    } catch (e) {}

    // Fallbacks
    return {
      month: 'JUN',
      day: '07'
    };
  };

  return (
    <section className="section-padding" id="events" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        <div className="section-header">
          <h2>Upcoming Events</h2>
          <p>Mark your calendar for these upcoming retreats, camps, competitions, and gatherings.</p>
        </div>

        <div className="events-grid">
          {events.length === 0 ? (
            <div style={{ gridColumn: 'span 4', textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
              No upcoming events listed at this time.
            </div>
          ) : (
            events.map((evt, idx) => {
              const dateInfo = getEventDateInfo(evt.date, evt.countdownTarget);
              return (
                <div key={evt._id || idx} className="event-card">
                  <div className="event-image-container">
                    <img 
                      src={evt.imageUrl || "https://images.unsplash.com/photo-1548625361-155deee22312?w=800"} 
                      alt={evt.title} 
                    />
                    <div className="event-date-tag">
                      <span className="event-date-month">{dateInfo.month}</span>
                      <span className="event-date-day">{dateInfo.day}</span>
                    </div>
                  </div>

                  <div className="event-content">
                    <h4 className="event-title">{evt.title}</h4>
                    
                    <div className="event-info-item">
                      <Calendar size={14} className="text-secondary" />
                      <span>{evt.date}</span>
                    </div>

                    {evt.time && (
                      <div className="event-info-item">
                        <Clock size={14} className="text-secondary" />
                        <span>{evt.time}</span>
                      </div>
                    )}

                    <div className="event-info-item">
                      <MapPin size={14} className="text-secondary" />
                      <span>{evt.location}</span>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '10px 0 15px', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {evt.description || 'Join us for this blessing-filled event together with our catechism unit family.'}
                    </p>

                    <EventCountdown targetDate={evt.countdownTarget} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
