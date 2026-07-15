const axios = require('axios');

(async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/schemes');
        console.log("SUCCESS:", JSON.stringify(response.data));
    } catch (e) {
        console.error("ERROR:", e.response?.data?.message || e.message);
    }
})();
