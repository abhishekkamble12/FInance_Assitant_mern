// test-login.js
const axios = require('axios');
(async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/v1/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Login response:', res.data);
  } catch (err) {
    console.error('Login error:', err.response ? err.response.data : err.message);
  }
})();
