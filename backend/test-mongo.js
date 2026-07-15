require('dotenv').config();
const mongoose = require('mongoose');

async function testMongo() {
    try {
        console.log("Testing MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connection: SUCCESS");
        await mongoose.disconnect();
    } catch (err) {
        console.log("❌ MongoDB Connection: FAILED -", err.message);
    }
}
testMongo();
