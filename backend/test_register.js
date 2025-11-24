// Quick test to diagnose the 400 error
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

async function testRegister() {
    try {
        const form = new FormData();
        form.append('name', 'Test User');
        form.append('email', 'testuser123@test.com');
        form.append('password', 'password123');
        
        console.log('Sending registration request...');
        const response = await axios.post('http://localhost:3000/api/v1/register', form, {
            headers: form.getHeaders()
        });
        
        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);
        console.error('Error message:', error.message);
    }
}

testRegister();
