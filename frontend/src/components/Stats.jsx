import React from 'react';
import { 
  GraduationCap, 
  UserCheck, 
  Users, 
  Layers, 
  Calendar, 
  HeartHandshake 
} from 'lucide-react';

const Stats = ({ siteSettings }) => {
  // Use dynamic values from site settings, with fallbacks
  const students = siteSettings?.stats?.students || 0;
  const teachers = siteSettings?.stats?.teachers || 0;
  const families = siteSettings?.stats?.families || 0;

  const statItems = [
    { number: `${students}+`, label: 'Students', icon: <GraduationCap size={22} /> },
    { number: `${teachers}+`, label: 'Teachers', icon: <UserCheck size={22} /> },
    { number: `${families}+`, label: 'Families', icon: <Users size={22} /> },
    { number: '18+', label: 'Ministries', icon: <Layers size={22} /> },
    { number: '28+', label: 'Years of Service', icon: <Calendar size={22} /> },
    { number: '120+', label: 'Community Programs', icon: <HeartHandshake size={22} /> }
  ];

  return (
    <section className="stats container">
      <div className="stats-grid">
        {statItems.map((item, idx) => (
          <div key={idx} className="stat-item">
            <div className="stat-icon">{item.icon}</div>
            <div className="stat-number">{item.number}</div>
            <div className="stat-label">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
