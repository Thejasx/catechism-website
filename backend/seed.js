require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Announcement = require('./models/Announcement');
const Event = require('./models/Event');
const GalleryItem = require('./models/GalleryItem');
const Leader = require('./models/Leader');
const Message = require('./models/Message');
const PrayerRequest = require('./models/PrayerRequest');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing collections
    await Admin.deleteMany({});
    await Announcement.deleteMany({});
    await Event.deleteMany({});
    await GalleryItem.deleteMany({});
    await Leader.deleteMany({});
    await Message.deleteMany({});
    await PrayerRequest.deleteMany({});

    console.log('Cleared existing collections.');

    // Seed default administrator
    const admin = new Admin({
      username: 'admin',
      password: 'adminpassword' // Plain password, will be hashed in Mongoose pre-save middleware
    });
    await admin.save();
    console.log('Admin account created (username: admin, password: adminpassword)');

    // Seed announcements (from screenshot)
    const announcements = [
      {
        title: 'Catechism classes every Sunday at 9:00 AM',
        content: 'Train up a child in the way he should go; even when he is old he will not depart from it. – Proverbs 22:6',
        type: 'new',
        dateText: 'Today'
      },
      {
        title: 'Youth Meeting on Friday at 6:30 PM',
        type: 'event',
        dateText: '20 May 2025'
      },
      {
        title: 'Bible Study Fellowship every Thursday',
        type: 'info',
        dateText: '18 May 2025'
      },
      {
        title: 'Parents meeting for all batches on 01 June',
        type: 'event',
        dateText: '17 May 2025'
      },
      {
        title: 'Retreat registration open – Limited seats only!',
        type: 'notice',
        dateText: '15 May 2025'
      }
    ];
    await Announcement.insertMany(announcements);
    console.log('Seed Announcements completed.');

    // Seed upcoming events (from screenshot)
    // Adjusting countdown target years to make them future dates relative to current local time (2026) if possible,
    // or keep them as standard dates. Let's make them active countdowns!
    // Current time is May 2026. Let's set countdown targets to June/July 2026 so they demonstrate active count downs.
    const events = [
      {
        title: 'Feast of Sacred Heart',
        description: 'Join us for the solemn Eucharistic celebration and family feast.',
        date: '07 June 2026',
        time: '9:00 AM',
        location: 'Catechism Centre',
        imageUrl: 'https://images.unsplash.com/photo-1548625361-155deee22312?w=800&auto=format&fit=crop',
        countdownTarget: new Date('2026-06-07T09:00:00')
      },
      {
        title: 'Youth Retreat 2026',
        description: 'A transformative spiritual retreat for our parish youth.',
        date: '20 - 22 June 2026',
        time: '6:30 PM',
        location: 'St. Joseph Retreat Centre',
        imageUrl: 'https://images.unsplash.com/photo-1438211394458-cf3b6b0e5c68?w=800&auto=format&fit=crop',
        countdownTarget: new Date('2026-06-20T18:30:00')
      },
      {
        title: 'Bible Quiz Competition',
        description: 'Showcase your scriptural knowledge and win grand prizes.',
        date: '05 July 2026',
        time: '10:00 AM',
        location: 'Parish Hall',
        imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad58565b90?w=800&auto=format&fit=crop',
        countdownTarget: new Date('2026-07-05T10:00:00')
      },
      {
        title: "Children's Camp",
        description: 'Three days of fun, music, learning, and fellowship for catechism children.',
        date: '15 - 17 August 2026',
        time: '9:00 AM',
        location: 'Catechism Centre',
        imageUrl: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=800&auto=format&fit=crop',
        countdownTarget: new Date('2026-08-15T09:00:00')
      },
      {
        title: 'Christmas Crusade & Carol Night',
        description: 'A grand Christmas crusade with carol singing, nativity play, and midnight prayer vigil.',
        date: '24 December 2026',
        time: '6:00 PM',
        location: 'Parish Church Grounds',
        imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop',
        countdownTarget: new Date('2026-12-24T18:00:00')
      },
      {
        title: 'Lenten Prayer Campaign',
        description: 'A 40-day journey of fasting, prayer, and almsgiving for all catechism families.',
        date: '18 February 2026',
        time: '7:00 AM',
        location: 'Catechism Centre Chapel',
        imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&auto=format&fit=crop',
        countdownTarget: new Date('2026-12-18T07:00:00')
      },
      {
        title: 'First Holy Communion Preparation',
        description: 'Special sacramental preparation classes for children receiving First Holy Communion.',
        date: '01 November 2026',
        time: '9:30 AM',
        location: 'Catechism Hall – Room 3',
        imageUrl: 'https://images.unsplash.com/photo-1548625361-155deee22312?w=800&auto=format&fit=crop',
        countdownTarget: new Date('2026-11-01T09:30:00')
      }
    ];
    await Event.insertMany(events);
    console.log('Seed Events completed.');

    // Seed core family leaders (from screenshot)
    const leaders = [
      {
        name: 'Fr. Binu Varghese',
        role: 'Chairman',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
        order: 1
      },
      {
        name: 'Sr. Jincy Maria',
        role: 'Headmistress',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        order: 2
      },
      {
        name: 'Mr. Jolly Mathew',
        role: 'Secretary',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
        order: 3
      },
      {
        name: 'Mr. Roy Thomas',
        role: 'Director',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
        order: 4
      },
      {
        name: 'Ms. Anita Rose',
        role: 'Youth Coordinator',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        order: 5
      },
      {
        name: 'Mr. Tom Joseph',
        role: 'Ministry Leader',
        imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
        order: 6
      }
    ];
    await Leader.insertMany(leaders);
    console.log('Seed Leaders completed.');

    // Seed gallery highlights
    const galleryItems = [
      {
        imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600',
        category: 'Retreats',
        title: 'Youth Retreat Prayer Session'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad58565b90?w=600',
        category: 'Bible Classes',
        title: 'Sunday Bible Class Group'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600',
        category: 'Holy Mass',
        title: 'Easter Sunday Solemn Mass'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600',
        category: 'Celebrations',
        title: 'Christmas Eve Choir and Skit'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600',
        category: 'Youth Activities',
        title: 'Teens Seminar Activities'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600',
        category: 'Competitions',
        title: 'Scriptural Quiz Finalists'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600',
        category: 'Charity Works',
        title: 'Distributing Aid to Needy Families'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600',
        category: 'Annual Day',
        title: 'Catechism Unit Annual Celebrations'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800',
        category: 'Prayer Meetings',
        title: 'Weekly Parish Prayer Meeting'
      }
    ];
    await GalleryItem.insertMany(galleryItems);
    console.log('Seed Gallery Items completed.');

    // Seed test message
    const testMessage = new Message({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+91 98765 43210',
      message: 'Hello, I would like to enroll my child in the upcoming Sunday classes. Please guide me through the registration process.'
    });
    await testMessage.save();

    // Seed test prayer request
    const testPrayer = new PrayerRequest({
      name: 'Amelia Smith',
      requestText: 'Please pray for my mother who is undergoing surgery this Friday. May God guide the doctors and grant her quick healing.'
    });
    await testPrayer.save();

    console.log('Successfully completed seeding all tables.');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
