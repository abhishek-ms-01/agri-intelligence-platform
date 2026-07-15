require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.GEMINI_API_KEY;

(async () => {
    try {
        const response = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        console.log("MODELS:", response.data.models.map(m => m.name));
    } catch (e) {
        console.log("FAILED:", e.response?.data || e.message);
    }
})();
