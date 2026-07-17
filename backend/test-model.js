require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

(async () => {
    try {
        // Unfortunately SDK doesn't expose ListModels directly sometimes, but let's try a fallback test.
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
        const result = await model.generateContent('Hi');
        console.log("FLASH LATEST WORKED:", result.response.text());
    } catch (e) {
        console.log("FLASH LATEST FAILED:", e.message);
        try {
            const model2 = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
            const result2 = await model2.generateContent('Hi');
            console.log("PRO WORKED:", result2.response.text());
        } catch (e2) {
            console.log("PRO FAILED:", e2.message);
        }
    }
})();
