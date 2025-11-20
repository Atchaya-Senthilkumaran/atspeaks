require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB } = require("./config/db");
const Event = require("./models/Event");

const updateEvents = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('🔗 Connected to MongoDB');

    // Update events with correct prices and recordingAvailable field
    const updates = [
      { title: "Data to Dimensions: 3D Data Visualization", price: 199, recordingAvailable: true },
      { title: "Agentic Frames: From CLI to MCP", price: 199, recordingAvailable: true },
      { title: "Campus to Corporate: Hack and Crack Placements", price: 199, recordingAvailable: true },
      { title: "Agentic AI Unlocked", price: 199, recordingAvailable: true },
      { title: "Resume to Recruiter", price: 299, recordingAvailable: true },
      { title: "Figma For Absolute Beginners", price: 399, recordingAvailable: true },
      { title: "Wordpress Simplified", price: 199, recordingAvailable: true },
      { title: "Beyond Boundaries: Unlock Your Tech Career Map", price: 299, recordingAvailable: true },
      { title: "Dear Data Analyst: Begin with Power BI", price: 399, recordingAvailable: true },
      { title: "Langchain Chatbots", price: 199, recordingAvailable: true },
      { title: "Design Smarter: Master Figma in 3 Days", price: 0, recordingAvailable: false},
      { title: "Wordpress Wonders", price: 199, recordingAvailable: true },
      { title: "Introduction To Figma", price: 0, recordingAvailable: false },
    ];

    console.log('📝 Updating events with prices and recordingAvailable...');

    for (const update of updates) {
      const result = await Event.updateOne(
        { title: update.title },
        {
          $set: {
            price: update.price,
            recordingAvailable: update.recordingAvailable
          }
        }
      );

      if (result.matchedCount > 0) {
        console.log(`✅ Updated: ${update.title} - ₹${update.price}`);
      } else {
        console.log(`⚠️  Not found: ${update.title}`);
      }
    }

    console.log('\n✅ All events updated successfully!');
    console.log('🔍 Fetching updated events to verify...\n');

    const events = await Event.find().select('title price recordingAvailable').sort({ date: -1 });
    events.forEach(event => {
      console.log(`  ${event.title}: ₹${event.price} (Available: ${event.recordingAvailable !== false})`);
    });

    process.exit();
  } catch (err) {
    console.error("❌ Update failed:", err);
    process.exit(1);
  }
};

updateEvents();
