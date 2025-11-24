// Quick test script to verify the expense endpoint
const axios = require('axios');

async function testExpense() {
    try {
        // First, you'd need to login to get a valid token
        // For now, let's just test if the server is responding
        const response = await axios.get('http://localhost:3000/api/v1/test-route');
        console.log('Test route works:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testExpense();
