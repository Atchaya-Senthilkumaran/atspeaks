require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Event = require("./models/Event");

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    // Clear old data
    await Event.deleteMany();

    // Insert real AT Speaks events from frontend
    const events = [
      {
        title: "Data to Dimensions: 3D Data Visualization",
        date: "2025-11-01",
        type: "Past",
        price: 299,
        recordingAvailable: true,
        description:
          "Visualizing Structured Data in 3D with React and Three.js. Learn how to turn data into immersive 3D visuals, build with React + Three.js, and map, optimize & visualize data interactively.",
        poster: "/posters/13.png",
        highlights: [
          "Turn data into immersive 3D visuals",
          "Build with React + Three.js",
          "Map, optimize & visualize data interactively",
        ],
        speakers: [
          {
            role: "Speaker",
            name: "Keerthana M G",
            title: "AI/ML Content Strategist",
            bio: "Expert in data visualization and content strategy",
          },
          {
            role: "Host",
            name: "Atchaya Senthilkumaran",
            title: "Founder & CEO - AT Speaks",
            bio: "Tech educator and founder of AT Speaks",
          },
        ],
      },
      {
        title: "Agentic Frames: From CLI to MCP",
        date: "2025-10-12",
        type: "Past",
        price: 499,
        description:
          "Command. Automate. Adapt. Premium course exploring agentic frameworks from command-line interfaces to model context protocol.",
        poster: "/posters/12.png",
        highlights: [
          "Master command-line interfaces",
          "Understand agentic frameworks",
          "Explore Model Context Protocol (MCP)",
          "Build automated workflows",
        ],
        speaker: {
          name: "Atchaya Senthilkumaran",
          title: "Founder - AT Speaks | AI Tech Associate - C2A.AI",
          bio: "Expert in agentic frameworks and AI automation",
        },
      },
      {
        title: "Campus to Corporate: Hack and Crack Placements",
        date: "2025-09-06",
        type: "Past",
        price: 199,
        description:
          "A comprehensive session featuring industry insights on landing your dream job and navigating the placement process.",
        poster: "/posters/11.png",
        highlights: [
          "Master placement preparation strategies",
          "Learn from Amazon Application Engineer",
          "Campus to corporate transition guidance",
          "Crack your dream job interviews",
        ],
        speakers: [
          {
            role: "Speaker",
            name: "Siva Santosh",
            title: "Application Engineer - Amazon",
            bio: "Industry expert sharing placement insights",
          },
          {
            role: "Host",
            name: "Atchaya Senthilkumaran",
            title: "Founder & CEO - AT Speaks",
            bio: "Career mentor and tech educator",
          },
        ],
      },
      {
        title: "Agentic AI Unlocked",
        date: "2025-08-17",
        type: "Past",
        price: 199,
        description:
          "How Agentic AI is enhancing workflows across industries. Perfect for innovators, tech leads, and entrepreneurs.",
        poster: "/posters/10.png",
        highlights: [
          "Automate repetitive tasks efficiently",
          "Execute complex workflows",
          "Real-world industry use cases",
          "Explore emerging Agentic AI tools",
        ],
        speakers: [
          {
            role: "Speaker",
            name: "Mr. Sujan Saijiej",
            title: "Founder & CEO - DiffuseAI Solutions",
            bio: "Industry expert in Agentic AI and automation solutions",
          },
          {
            role: "Host",
            name: "Atchaya Senthilkumaran",
            title: "Founder & CEO - AT Speaks",
            bio: "Tech educator and AI enthusiast",
          },
        ],
      },
      {
        title: "Resume to Recruiter",
        date: "2025-07-13",
        type: "Past",
        price: 149,
        description:
          "Wanna know how to craft a killer resume & grab internships like a pro? This is for you! Learn professional resume writing and job application strategies.",
        poster: "/posters/9.jpg",
        highlights: [
          "Craft a killer resume that stands out",
          "Learn internship application strategies",
          "Professional resume writing techniques",
          "Get noticed by recruiters",
        ],
        speaker: {
          name: "Atchaya Senthilkumaran",
          title: "Founder & CEO - AT Speaks",
          bio: "Career coach and resume expert helping students land internships",
        },
      },
      {
        title: "Figma For Absolute Beginners",
        date: "2025-06-15",
        type: "Past",
        price: 399,
        description:
          "Premium hands-on training on UI/UX from basic to advanced. A comprehensive 3-day workshop covering Figma fundamentals and advanced design techniques.",
        poster: "/posters/8.png",
        highlights: [
          "Hands-on UI/UX training from basic to advanced",
          "Master Figma tools and features",
          "Learn design principles and best practices",
          "Build real-world design projects",
        ],
        speaker: {
          name: "Atchaya Senthilkumaran",
          title: "Founder & CEO - AT Speaks",
          bio: "UI/UX design expert specializing in Figma training",
        },
      },
      {
        title: "Wordpress Simplified",
        date: "2025-05-17",
        type: "Past",
        price: 249,
        description:
          "Build your first website with no code! Learn WordPress fundamentals and create your own website in this beginner-friendly session.",
        poster: "/posters/7.png",
        highlights: [
          "Build your first website with no code required",
          "Master WordPress fundamentals",
          "Create professional-looking websites",
          "Learn website customization techniques",
        ],
        speaker: {
          name: "Atchaya Senthilkumaran",
          title: "Founder & CEO - AT Speaks",
          bio: "Web development expert specializing in no-code solutions",
        },
      },
      {
        title: "Beyond Boundaries: Unlock Your Tech Career Map",
        date: "2025-04-20",
        type: "Past",
        price: 199,
        description:
          "Explore career domains, identify your ideal tech role, get skillset breakdown, and build your roadmap for success in tech.",
        poster: "/posters/6.png",
        highlights: [
          "Explore various career domains in tech",
          "Identify your ideal tech role",
          "Get detailed skillset breakdown",
          "Build a personalized career roadmap",
        ],
        speaker: {
          name: "Atchaya Senthilkumaran",
          title: "Founder & CEO - AT Speaks",
          bio: "Tech career mentor helping students navigate their career paths",
        },
      },
      {
        title: "Dear Data Analyst: Begin with Power BI",
        date: "2025-03-30",
        type: "Past",
        price: 349,
        description:
          "Premium course covering basics of Power BI, tools and features, and sample projects. A 2-day workshop for aspiring data analysts.",
        poster: "/posters/5.png",
        highlights: [
          "Basics of Power BI platform",
          "Master Power BI tools and features",
          "Work on real sample projects",
          "Learn data visualization techniques",
        ],
        speaker: {
          name: "Atchaya Senthilkumaran",
          title: "Founder & CEO - AT Speaks",
          bio: "Data analytics expert specializing in Power BI and data visualization",
        },
      },
      {
        title: "Langchain Chatbots",
        date: "2025-03-02",
        type: "Past",
        price: 299,
        description:
          "No API Needed — Code smart bots easily! Learn to build intelligent chatbots using LangChain and Python in this practical workshop.",
        poster: "/posters/4.png",
        highlights: [
          "Build chatbots without external APIs",
          "Learn LangChain framework",
          "Code smart bots using Python",
          "Practical hands-on implementation",
        ],
        speaker: {
          name: "Atchaya Senthilkumaran",
          title: "Founder & CEO - AT Speaks",
          bio: "AI and chatbot development expert specializing in LangChain",
        },
      },
      {
        title: "Design Smarter: Master Figma in 3 Days",
        date: "2025-02-09",
        type: "Past",
        price: 299,
        description:
          "Online Masterclass to master Figma in 3 days. Comprehensive training covering advanced Figma techniques and design workflows.",
        poster: "/posters/3.png",
        highlights: [
          "Master Figma in just 3 days",
          "Advanced design techniques",
          "Professional design workflows",
          "Real-world project experience",
        ],
        speaker: {
          name: "Atchaya Senthilkumaran",
          title: "UI/UX Enthusiast | Founder & CEO - AT Speaks",
          bio: "Passionate design educator helping students master Figma",
        },
      },
      {
        title: "Wordpress Wonders",
        date: "2025-01-11",
        type: "Past",
        price: 249,
        description:
          "Build Your First Website Faster Than Ever! Learn to create websites with WordPress in this hands-on session.",
        poster: "/posters/2.png",
        highlights: [
          "Build websites faster than ever",
          "WordPress fundamentals and best practices",
          "Hands-on website creation",
          "Launch your first website",
        ],
        speaker: {
          name: "Atchaya Senthilkumaran",
          title: "Founder & CEO - AT Speaks",
          bio: "WordPress expert helping beginners build their first websites",
        },
      },
      {
        title: "Introduction To Figma",
        date: "2024-12-28",
        type: "Past",
        price: 0,
        recordingAvailable: false,
        description:
          "Enter into the world of designing! A 2-day live webinar covering Figma basics, tools & features, sample projects, and UI/UX career path.",
        poster: "/posters/1.jpg",
        highlights: [
          "Designing with Figma fundamentals",
          "Figma tools & features overview",
          "Work on sample projects",
          "UI/UX career path guidance",
          "Bonus: 5 AI Tools for Students + 1 Free Udemy Course",
        ],
        speaker: {
          name: "Atchaya Senthilkumaran",
          title: "Founder & CEO - AT Speaks",
          bio: "UI/UX design educator introducing students to the world of Figma",
        },
      },
    ];

    await Event.insertMany(events);

    console.log(`✅ Database seeded successfully with ${events.length} real AT Speaks events!`);
    process.exit();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
};

seed();
