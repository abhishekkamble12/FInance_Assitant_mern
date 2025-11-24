// test-fetch.js
(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/add-expense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer dummy'
      },
      body: JSON.stringify({category: 'Food', amount: 123, date: '2025-11-22', emoji: '🍕'})
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', data);
  } catch (err) {
    console.error('Fetch error:', err);
  }
})();
