const mongoose = require('mongoose');
const Event = require('./models/Event');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB\n');

    // Get a few events to verify speaker details
    const events = await Event.find({}).limit(5);

    console.log('📊 Speaker Details Verification:\n');
    events.forEach((e, index) => {
      console.log(`${index + 1}. ${e.title}`);
      if (e.speakers && e.speakers.length > 0) {
        e.speakers.forEach(speaker => {
          console.log(`   ✓ ${speaker.role}: ${speaker.name}`);
          console.log(`     Title: ${speaker.title}`);
        });
      } else if (e.speaker) {
        console.log(`   ⚠️  Still using old 'speaker' field: ${e.speaker.name}`);
      } else {
        console.log(`   ✗ No speaker details found!`);
      }
      console.log('');
    });

    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
