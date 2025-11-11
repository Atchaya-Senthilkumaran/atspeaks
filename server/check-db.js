require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const db = mongoose.connection.db;

  console.log('\n📧 CONTACT SUBMISSIONS:\n');
  const contacts = await db.collection('contacts').find({}).sort({createdAt: -1}).limit(5).toArray();
  if (contacts.length === 0) {
    console.log('  No contact submissions yet.\n');
  } else {
    contacts.forEach((c, i) => {
      console.log(`${i+1}. ${c.name} (${c.email})`);
      console.log(`   Subject: ${c.subject || 'N/A'}`);
      console.log(`   Message: ${c.message.substring(0, 60)}...`);
      console.log(`   Date: ${new Date(c.createdAt).toLocaleString()}\n`);
    });
  }

  console.log('\n📹 RECORDING BOOKINGS:\n');
  const bookings = await db.collection('recordingrequests').find({}).sort({createdAt: -1}).limit(5).toArray();
  if (bookings.length === 0) {
    console.log('  No recording bookings yet.\n');
  } else {
    bookings.forEach((b, i) => {
      console.log(`${i+1}. ${b.name} (${b.email})`);
      console.log(`   WhatsApp: ${b.whatsapp}`);
      console.log(`   Institution: ${b.institution}`);
      console.log(`   Date: ${new Date(b.createdAt).toLocaleString()}\n`);
    });
  }

  console.log('\n📊 SUMMARY:');
  console.log(`  Events: ${await db.collection('events').countDocuments()}`);
  console.log(`  Contacts: ${await db.collection('contacts').countDocuments()}`);
  console.log(`  Recording Bookings: ${await db.collection('recordingrequests').countDocuments()}`);
  console.log(`  Testimonials: ${await db.collection('testimonials').countDocuments()}`);

  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
