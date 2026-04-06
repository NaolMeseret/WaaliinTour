async function testAPI() {
  try {
    // Test the working chat API first
    console.log('Testing main chat API...');
    const response1 = await fetch('http://localhost:3005/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'hello', timestamp: new Date() }],
        tourContext: { title: 'Test', location: 'Test' }
      })
    });
    const data1 = await response1.json();
    console.log('Main chat API - Status:', response1.status);
    console.log('Main chat API - Response:', data1);

    // Test the resort dashboard API
    console.log('\nTesting resort dashboard API...');
    const response2 = await fetch('http://localhost:3005/api/resort-dashboard/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'hello', timestamp: new Date() }],
        recommendations: ['test recommendation']
      })
    });
    const data2 = await response2.json();
    console.log('Resort API - Status:', response2.status);
    console.log('Resort API - Response:', data2);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();