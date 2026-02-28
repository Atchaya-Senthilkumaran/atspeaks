require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB } = require("./config/db");
const Event = require("./models/Event");

const updateEvents = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('🔗 Connected to MongoDB');

    // Update events with correct prices, recordingAvailable, and isVisible fields
    const updates = [
      // Move Portfolio Launchpad to past and enable recordings
      {
        title: "Portfolio Launchpad",
        price: 199,
        recordingAvailable: true,
        isVisible: true,
        type: "Past",
        registrationUrl: null,
        whatsappGroupUrl: null,
      },
      { title: "Data to Dimensions: 3D Data Visualization", price: 199, recordingAvailable: true, isVisible: true },
      { title: "Agentic Frames: From CLI to MCP", price: 199, recordingAvailable: true, isVisible: true },
      { title: "Campus to Corporate: Hack and Crack Placements", price: 199, recordingAvailable: true, isVisible: true },
      { title: "Agentic AI Unlocked", price: 199, recordingAvailable: true, isVisible: true },
      { title: "Resume to Recruiter", price: 299, recordingAvailable: true, isVisible: true },
      { title: "Figma For Absolute Beginners", price: 399, recordingAvailable: true, isVisible: true },
      { title: "Wordpress Simplified", price: 199, recordingAvailable: true, isVisible: true },
      { title: "Beyond Boundaries: Unlock Your Tech Career Map", price: 299, recordingAvailable: true, isVisible: true },
      { title: "Dear Data Analyst: Begin with Power BI", price: 399, recordingAvailable: true, isVisible: true },
      { title: "Langchain Chatbots", price: 199, recordingAvailable: true, isVisible: true },
      { title: "Design Smarter: Master Figma in 3 Days", price: 0, recordingAvailable: false, isVisible: true },
      { title: "Wordpress Wonders", price: 199, recordingAvailable: true, isVisible: true },
      { title: "Introduction To Figma", price: 0, recordingAvailable: false, isVisible: true },
      { title: "Founders Unfiltered", price: 199, recordingAvailable: true, isVisible: true },
      { title: "InternMania", price: 299, recordingAvailable: false, isVisible: true, type: "Upcoming" },
      { title: "LinkedIn Wrapped", price: 299, recordingAvailable: true, isVisible: true, type: "Past" }
    ];

    console.log('📝 Updating events with prices, recordingAvailable, and visibility...');

    for (const update of updates) {
      // Build dynamic update doc so we don't overwrite fields unintentionally
      const setFields = {
        price: update.price,
        recordingAvailable: update.recordingAvailable,
        isVisible: update.isVisible !== false // Default to true if not specified
      };

      if (update.type) setFields.type = update.type;
      if (Object.prototype.hasOwnProperty.call(update, "registrationUrl")) {
        setFields.registrationUrl = update.registrationUrl;
      }
      if (Object.prototype.hasOwnProperty.call(update, "whatsappGroupUrl")) {
        setFields.whatsappGroupUrl = update.whatsappGroupUrl;
      }

      const result = await Event.updateOne(
        { title: update.title },
        { $set: setFields }
      );

      if (result.matchedCount > 0) {
        console.log(`✅ Updated: ${update.title} - ₹${update.price} (Visible: ${setFields.isVisible})`);
      } else {
        console.log(`⚠️  Not found: ${update.title}`);
      }
    }

    console.log('\n✅ All events updated successfully!');
    console.log('🔍 Fetching updated events to verify...\n');

    const events = await Event.find().select('title price recordingAvailable isVisible').sort({ date: -1 });
    events.forEach(event => {
      console.log(`  ${event.title}: ₹${event.price} (Available: ${event.recordingAvailable !== false}, Visible: ${event.isVisible !== false})`);
    });

    process.exit();
  } catch (err) {
    console.error("❌ Update failed:", err);
    process.exit(1);
  }
};

updateEvents();
