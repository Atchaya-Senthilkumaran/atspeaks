require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Event = require("./models/Event");

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    // Clear old data
    await Event.deleteMany();

    // Insert your real AT Speaks events
    const events = [
      {
        title: "Figma: For Absolute Beginners",
        date: "2025-07-02",
        type: "Past",
        description:
          "A hands-on 3-day beginner-friendly workshop focused on UI/UX fundamentals, Figma tools, design systems, and real-world project practice.",
        poster: "/posters/figma-beginners.jpg",
        highlights: [
          "UI/UX basics from scratch",
          "Figma tools, components, and auto-layouts",
          "Typography, color theory & accessibility",
          "Build your first app design",
          "Certificate of participation for all attendees",
        ],
        speaker: {
          name: "Atchaya Senthilkumaran",
          title: "Founder & CEO, AT Speaks",
          bio: "A passionate educator and UI/UX designer who helps students explore practical, hands-on design tools through engaging learning sessions.",
        },
      },
      {
        title: "From Data to Dimensions — Visualizing Structured Data in 3D",
        date: "2025-10-25",
        type: "Past",
        description:
          "A technical session introducing how structured datasets can be transformed into immersive 3D visualizations using React and Three.js.",
        poster: "/posters/data-to-dimensions.jpg",
        highlights: [
          "Introduction to React and Three.js",
          "Data visualization concepts",
          "3D rendering from structured datasets",
          "Hands-on coding with visuals",
          "Showcasing final 3D project builds",
        ],
        speaker: {
          name: "Atchaya Senthilkumaran",
          title: "Founder & CEO, AT Speaks | AI Tech Associate, c2X.ai",
          bio: "Bridging the gap between design and development with interactive visual experiences, and empowering learners through tech education.",
        },
      },
      {
        title: "Building Designer Portfolios",
        date: "2025-12-10",
        type: "Upcoming",
        description:
          "An upcoming live Figma + career session helping aspiring designers craft impactful portfolios, resumes, and project presentations.",
        poster: "/posters/portfolio-clinic.jpg",
        highlights: [
          "Portfolio design framework",
          "Resume optimization tips",
          "Showcasing UI/UX case studies",
          "Live design critique & review",
          "Guided practice with Figma",
        ],
        speaker: {
          name: "Atchaya Senthilkumaran",
          title: "Founder & CEO, AT Speaks",
          bio: "Guiding creative learners to turn their design passion into strong, career-ready portfolios through live mentorship sessions.",
        },
      },
    ];

    await Event.insertMany(events);

    console.log("✅ Database seeded successfully with AT Speaks events!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
};

seed();
