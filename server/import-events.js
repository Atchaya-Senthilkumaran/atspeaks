require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');
const fs = require('fs');
const path = require('path');

const importEvents = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Read events from JSON file
    const eventsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../populate-events.json'), 'utf-8')
    );

    // Delete existing events
    await Event.deleteMany({});
    console.log('🗑️  Cleared existing events');

    // Insert new events
    const result = await Event.insertMany(eventsData);
    console.log(`✅ Successfully imported ${result.length} events`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

importEvents();
