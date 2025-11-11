const mongoose = require('mongoose');
const Event = require('./models/Event');
const eventsData = require('../populate-events.json');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('🗑️  Cleared existing events');

    // Import new events with pricing
    const result = await Event.insertMany(eventsData);
    console.log(`\n✅ Imported ${result.length} events with pricing:\n`);

    result.forEach(e => {
      const status = e.recordingAvailable ? '✓ Available' : '✗ Unavailable';
      console.log(`  ${e.title.padEnd(50)} ₹${String(e.price).padStart(3)} - ${status}`);
    });

    console.log('\n✅ Import complete!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
