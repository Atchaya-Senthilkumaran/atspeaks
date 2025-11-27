// Quick test script to verify registration endpoint is working
// Run this with: node test-registration.js

const API_URL = 'http://localhost:5000';

async function testRegistrationEndpoint() {
  console.log('🧪 Testing Registration Endpoint...\n');

  // Test 1: Health Check
  console.log('1️⃣ Testing health endpoint...');
  try {
    const healthResponse = await fetch(`${API_URL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check passed:',healthData);
    console.log('   MongoDB status:', healthData.mongo);
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    console.log('   Make sure backend server is running: node server.js');
    return;
  }

  // Test 2: Get Events (to get a valid eventId)
  console.log('\n2️⃣ Fetching events...');
  try {
    const eventsResponse = await fetch(`${API_URL}/api/events`);
    const eventsData = await eventsResponse.json();

    if (!eventsData.data || eventsData.data.length === 0) {
      console.log('⚠️  No events found. Please add events first.');
      return;
    }

    const firstEvent = eventsData.data[0];
    console.log('✅ Found event:', firstEvent.title);
    console.log('   Event ID:', firstEvent._id);

    // Test 3: Test Registration
    console.log('\n3️⃣ Testing registration submission...');
    const testRegistration = {
      eventId: firstEvent._id,
      fullName: 'Test User',
      email: `test${Date.now()}@example.com`, // Unique email to avoid duplicates
      phone: '+91 9876543210',
      schoolCollegeWorkplace: 'Test College, Chennai',
      yearOfStudy: '2nd Year',
      heardAboutFrom: 'Website',
      registrationType: 'Workshop Only - Free',
      transactionId: ''
    };

    const regResponse = await fetch(`${API_URL}/api/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testRegistration)
    });

    const regData = await regResponse.json();

    if (regResponse.ok) {
      console.log('✅ Registration test PASSED!');
      console.log('   Response:', regData);
      console.log('\n🎉 Registration endpoint is working correctly!');
      console.log('   You can now use the registration form in your frontend.');
    } else {
      console.log('❌ Registration test FAILED');
      console.log('   Status:', regResponse.status);
      console.log('   Error:', regData);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n📋 Summary:');
  console.log('   Backend URL:', API_URL);
  console.log('   Test completed at:', new Date().toLocaleString());
}

// Run the test
testRegistrationEndpoint();
