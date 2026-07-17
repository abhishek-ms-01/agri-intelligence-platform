require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testConnections() {
    console.log("--- TESTING CONNECTIONS ---");
    
    // 1. Test MongoDB
    try {
        console.log("Testing MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ MongoDB Connection: SUCCESS");
        await mongoose.disconnect();
    } catch (err) {
        console.log("❌ MongoDB Connection: FAILED -", err.message);
    }

    // 2. Test OpenWeatherMap
    try {
        console.log("\nTesting OpenWeatherMap API...");
        const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=${process.env.OPENWEATHERMAP_API_KEY}`);
        if (weatherRes.data && weatherRes.data.name) {
            console.log("✅ OpenWeatherMap API: SUCCESS");
        }
    } catch (err) {
        console.log("❌ OpenWeatherMap API: FAILED -", err.response?.data?.message || err.message);
    }

    // 3. Test Gemini API
    try {
        console.log("\nTesting Gemini API...");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent("Say hello");
        if (result.response.text()) {
             console.log("✅ Gemini API: SUCCESS");
        }
    } catch (err) {
        console.log("❌ Gemini API: FAILED -", err.message);
    }
}

testConnections();
