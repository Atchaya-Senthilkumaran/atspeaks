const Event = require('../models/Event');
const mongoose = require('mongoose');

// Mock data fallback - All 13 real events from src/data/data.js
const mockEvents = [
  {
    _id: '1',
    title: "Data to Dimensions: 3D Data Visualization",
    date: "2025-11-01",
    type: "Past",
    description: "Visualizing Structured Data in 3D with React and Three.js. Learn how to turn data into immersive 3D visuals, build with React + Three.js, and map, optimize & visualize data interactively.",
    poster: "/posters/13.png",
    price: 299,
    recordingAvailable: true,
    highlights: [
      "Turn data into immersive 3D visuals",
      "Build with React + Three.js",
      "Map, optimize & visualize data interactively"
    ],
    speakers: [
      {
        role: "Speaker",
        name: "Keerthana M G",
        title: "AI/ML Content Strategist",
        bio: "Expert in data visualization and content strategy"
      },
      {
        role: "Host",
        name: "Atchaya Senthilkumaran",
        title: "Founder & CEO - AT Speaks",
        bio: "Tech educator and founder of AT Speaks"
      }
    ]
  },
  {
    _id: '2',
    title: "Agentic Frames: From CLI to MCP",
    date: "2025-10-12",
    type: "Past",
    description: "Command. Automate. Adapt. Premium course exploring agentic frameworks from command-line interfaces to model context protocol.",
    poster: "/posters/12.png",
    price: 499,
    recordingAvailable: true,
    highlights: [
      "Master command-line interfaces",
      "Understand agentic frameworks",
      "Explore Model Context Protocol (MCP)",
      "Build automated workflows"
    ],
    speaker: {
      name: "Atchaya Senthilkumaran",
      title: "Founder - AT Speaks | AI Tech Associate - C2A.AI",
      bio: "Expert in agentic frameworks and AI automation"
    }
  },
  {
    _id: '3',
    title: "Agentic AI Unlocked",
    date: "2025-08-17",
    type: "Past",
    description: "How Agentic AI is enhancing workflows across industries. Perfect for innovators, tech leads, and entrepreneurs.",
    poster: "/posters/10.png",
    price: 199,
    recordingAvailable: true,
    highlights: [
      "Automate repetitive tasks efficiently",
      "Execute complex workflows",
      "Real-world industry use cases",
      "Explore emerging Agentic AI tools"
    ],
    speakers: [
      {
        role: "Speaker",
        name: "Mr. Sujan Saijiej",
        title: "Founder & CEO - DiffuseAI Solutions",
        bio: "Industry expert in Agentic AI and automation solutions"
      },
      {
        role: "Host",
        name: "Atchaya Senthilkumaran",
        title: "Founder & CEO - AT Speaks",
        bio: "Tech educator and AI enthusiast"
      }
    ]
  },
  {
    _id: '4',
    title: "Resume to Recruiter",
    date: "2025-07-13",
    type: "Past",
    description: "Wanna know how to craft a killer resume & grab internships like a pro? This is for you! Learn professional resume writing and job application strategies.",
    poster: "/posters/9.jpg",
    price: 149,
    recordingAvailable: true,
    highlights: [
      "Craft a killer resume that stands out",
      "Learn internship application strategies",
      "Professional resume writing techniques",
      "Get noticed by recruiters"
    ],
    speaker: {
      name: "Atchaya Senthilkumaran",
      title: "Founder & CEO - AT Speaks",
      bio: "Career coach and resume expert helping students land internships"
    }
  },
  {
    _id: '5',
    title: "Figma For Absolute Beginners",
    date: "2025-06-15",
    type: "Past",
    description: "Premium hands-on training on UI/UX from basic to advanced. A comprehensive 3-day workshop covering Figma fundamentals and advanced design techniques.",
    poster: "/posters/8.png",
    price: 399,
    recordingAvailable: true,
    highlights: [
      "Hands-on UI/UX training from basic to advanced",
      "Master Figma tools and features",
      "Learn design principles and best practices",
      "Build real-world design projects"
    ],
    speaker: {
      name: "Atchaya Senthilkumaran",
      title: "Founder & CEO - AT Speaks",
      bio: "UI/UX design expert specializing in Figma training"
    }
  },
  {
    _id: '6',
    title: "Wordpress Simplified",
    date: "2025-05-17",
    type: "Past",
    description: "Build your first website with no code! Learn WordPress fundamentals and create your own website in this beginner-friendly session.",
    poster: "/posters/7.png",
    price: 249,
    recordingAvailable: true,
    highlights: [
      "Build your first website with no code required",
      "Master WordPress fundamentals",
      "Create professional-looking websites",
      "Learn website customization techniques"
    ],
    speaker: {
      name: "Atchaya Senthilkumaran",
      title: "Founder & CEO - AT Speaks",
      bio: "Web development expert specializing in no-code solutions"
    }
  },
  {
    _id: '7',
    title: "Beyond Boundaries: Unlock Your Tech Career Map",
    date: "2025-04-20",
    type: "Past",
    description: "Explore career domains, identify your ideal tech role, get skillset breakdown, and build your roadmap for success in tech.",
    poster: "/posters/6.png",
    price: 199,
    recordingAvailable: true,
    highlights: [
      "Explore various career domains in tech",
      "Identify your ideal tech role",
      "Get detailed skillset breakdown",
      "Build a personalized career roadmap"
    ],
    speaker: {
      name: "Atchaya Senthilkumaran",
      title: "Founder & CEO - AT Speaks",
      bio: "Tech career mentor helping students navigate their career paths"
    }
  },
  {
    _id: '8',
    title: "Dear Data Analyst: Begin with Power BI",
    date: "2025-03-30",
    type: "Past",
    description: "Premium course covering basics of Power BI, tools and features, and sample projects. A 2-day workshop for aspiring data analysts.",
    poster: "/posters/5.png",
    price: 349,
    recordingAvailable: true,
    highlights: [
      "Basics of Power BI platform",
      "Master Power BI tools and features",
      "Work on real sample projects",
      "Learn data visualization techniques"
    ],
    speaker: {
      name: "Atchaya Senthilkumaran",
      title: "Founder & CEO - AT Speaks",
      bio: "Data analytics expert specializing in Power BI and data visualization"
    }
  },
  {
    _id: '9',
    title: "Langchain Chatbots",
    date: "2025-03-02",
    type: "Past",
    description: "No API Needed — Code smart bots easily! Learn to build intelligent chatbots using LangChain and Python in this practical workshop.",
    poster: "/posters/4.png",
    price: 299,
    recordingAvailable: true,
    highlights: [
      "Build chatbots without external APIs",
      "Learn LangChain framework",
      "Code smart bots using Python",
      "Practical hands-on implementation"
    ],
    speaker: {
      name: "Atchaya Senthilkumaran",
      title: "Founder & CEO - AT Speaks",
      bio: "AI and chatbot development expert specializing in LangChain"
    }
  },
  {
    _id: '10',
    title: "Design Smarter: Master Figma in 3 Days",
    date: "2025-02-09",
    type: "Past",
    description: "Online Masterclass to master Figma in 3 days. Comprehensive training covering advanced Figma techniques and design workflows.",
    poster: "/posters/3.png",
    price: 299,
    recordingAvailable: true,
    highlights: [
      "Master Figma in just 3 days",
      "Advanced design techniques",
      "Professional design workflows",
      "Real-world project experience"
    ],
    speaker: {
      name: "Atchaya Senthilkumaran",
      title: "UI/UX Enthusiast | Founder & CEO - AT Speaks",
      bio: "Passionate design educator helping students master Figma"
    }
  },
  {
    _id: '11',
    title: "Wordpress Wonders",
    date: "2025-01-11",
    type: "Past",
    description: "Build Your First Website Faster Than Ever! Learn to create websites with WordPress in this hands-on session.",
    poster: "/posters/2.png",
    price: 249,
    recordingAvailable: true,
    highlights: [
      "Build websites faster than ever",
      "WordPress fundamentals and best practices",
      "Hands-on website creation",
      "Launch your first website"
    ],
    speaker: {
      name: "Atchaya Senthilkumaran",
      title: "Founder & CEO - AT Speaks",
      bio: "WordPress expert helping beginners build their first websites"
    }
  },
  {
    _id: '12',
    title: "Introduction To Figma",
    date: "2024-12-28",
    type: "Past",
    description: "Enter into the world of designing! A 2-day live webinar covering Figma basics, tools & features, sample projects, and UI/UX career path.",
    poster: "/posters/1.jpg",
    price: 0,
    recordingAvailable: false,
    highlights: [
      "Designing with Figma fundamentals",
      "Figma tools & features overview",
      "Work on sample projects",
      "UI/UX career path guidance",
      "Bonus: 5 AI Tools for Students + 1 Free Udemy Course"
    ],
    speaker: {
      name: "Atchaya Senthilkumaran",
      title: "Founder & CEO - AT Speaks",
      bio: "UI/UX design educator introducing students to the world of Figma"
    }
  },
  {
    _id: '13',
    title: "Campus to Corporate: Hack and Crack Placements",
    date: "2025-09-06",
    type: "Past",
    description: "A comprehensive session featuring industry insights on landing your dream job and navigating the placement process.",
    poster: "/posters/11.png",
    price: 199,
    recordingAvailable: true,
    highlights: [
      "Master placement preparation strategies",
      "Learn from Amazon Application Engineer",
      "Campus to corporate transition guidance",
      "Crack your dream job interviews"
    ],
    speakers: [
      {
        role: "Speaker",
        name: "Siva Santosh",
        title: "Application Engineer - Amazon",
        bio: "Industry expert sharing placement insights"
      },
      {
        role: "Host",
        name: "Atchaya Senthilkumaran",
        title: "Founder & CEO - AT Speaks",
        bio: "Career mentor and tech educator"
      }
    ]
  }
];

// GET /api/events
exports.getEvents = async (req, res) => {
  try {
    console.log(`📊 MongoDB readyState: ${mongoose.connection.readyState}`);
    console.log(`📊 MONGO_URI set: ${process.env.MONGO_URI ? 'Yes' : 'No'}`);

    // Try to ensure connection if MONGO_URI is set
    if (process.env.MONGO_URI && mongoose.connection.readyState !== 1) {
      const { ensureConnection } = require('../config/db');
      console.log('🔄 Attempting to establish MongoDB connection...');
      try {
        await ensureConnection(process.env.MONGO_URI);
        // Wait a bit for connection to stabilize
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (connErr) {
        console.error('⚠️ Connection attempt failed:', connErr.message);
      }
    }

    // Check if MongoDB is connected after retry
    if (mongoose.connection.readyState === 1) {
      console.log('✅ MongoDB is connected, fetching events from database...');
      
      try {
        const events = await Event.find().sort({ date: -1, createdAt: -1 })
          .maxTimeMS(10000) // 10 second timeout
          .lean(); // Use lean for better performance
        
        console.log(`📊 Events from database: ${events.length}`);

        // If we have events in DB, return them
        if (events.length > 0) {
          console.log(`✅ Returning ${events.length} events from database`);
          return res.json(events);
        } else {
          console.log('⚠️  No events in database, using mock data');
          // Return mock data if DB is empty (helps during development/seed)
          return res.json(mockEvents);
        }
      } catch (dbErr) {
        console.error('❌ Database query error:', dbErr.message);
        // If it's a timeout or connection error, use mock as fallback
        if (dbErr.name === 'MongooseError' || dbErr.message.includes('buffering') || dbErr.message.includes('timeout')) {
          console.log('⚠️  Database operation failed, using mock data as fallback');
          // Return mock events so site still works
          return res.json(mockEvents);
        }
        throw dbErr;
      }
    } else {
      // MongoDB is not connected
      if (!process.env.MONGO_URI) {
        console.log('⚠️  MONGO_URI not configured, using mock data');
        return res.json(mockEvents);
      } else {
        // MONGO_URI is set but connection failed - use mock data as fallback
        console.log('⚠️  MongoDB connection failed, using mock data as fallback');
        console.log('⚠️  Please check MongoDB configuration in Vercel environment variables');
        // Still return mock events so the site works, but log the issue
        return res.json(mockEvents);
      }
    }
  } catch (err) {
    console.error('❌ Error in getEvents:', err);
    console.error('Stack trace:', err.stack);
    // Return mock data as fallback so site still works
    console.log('⚠️  Using mock data due to error');
    res.json(mockEvents);
  }
};

// POST /api/events
exports.createEvent = async (req, res) => {
  try {
    const ev = new Event(req.body);
    const saved = await ev.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
};
