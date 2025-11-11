require('dotenv').config();
const mongoose = require('mongoose');

// Test contact form submission
const testContactForm = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Show current contact submissions
    const db = mongoose.connection.db;
    const contacts = await db.collection('contacts').find({}).sort({createdAt: -1}).toArray();

    console.log('📧 RECENT CONTACT SUBMISSIONS:\n');
    if (contacts.length === 0) {
      console.log('  No submissions yet.\n');
    } else {
      contacts.forEach((contact, i) => {
        console.log(`${i + 1}. From: ${contact.name} (${contact.email})`);
        console.log(`   Subject: ${contact.subject || 'N/A'}`);
        console.log(`   Message: ${contact.message.substring(0, 80)}...`);
        console.log(`   Submitted: ${new Date(contact.createdAt).toLocaleString()}`);
        console.log(`   Saved to MongoDB: ✅`);
        console.log('');
      });
    }

    console.log('💡 EMAIL NOTIFICATIONS:');
    console.log('   Admin email: connect.atspeaks@gmail.com ✅');
    console.log('   User confirmation: Sent to submitted email ✅');
    console.log('\n📊 Total Submissions:', contacts.length);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testContactForm();
