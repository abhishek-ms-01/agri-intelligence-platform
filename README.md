# Agri Intel

![Agri Intel Banner](https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2069&auto=format&fit=crop)

A premium, AI-powered agricultural platform designed to provide actionable intelligence to farmers. Built for a national-level hackathon, it leverages Google Gemini Vision and AI models to transform farm operations through predictive analytics and crop health management.

## ✨ Features

- **Crop Health Analysis**: Upload crop images and use Gemini Vision AI to instantly detect diseases, receive health scores, and get actionable treatment plans.
- **Weather Intelligence**: Real-time OpenWeatherMap data layered with Gemini AI insights to provide localized disease risk, irrigation, and spraying advice.
- **Yield & Profit Prediction**: Advanced algorithms predict farm yields, revenue, and profit based on soil, season, rainfall, and crop data, offering business insights and ROI.
- **AI Farm Advisor**: Chat contextually with an expert AI Advisor tailored to agricultural queries.
- **Government Scheme Explorer**: AI-matched financial assistance and subsidies recommendations based on your farm profile.

## 🏗 Architecture

The platform uses a decoupled client-server architecture:
- **Frontend**: Built with React (Vite), Framer Motion, and Axios. Designed with a stunning, high-fidelity dark SaaS aesthetic using Glassmorphism.
- **Backend**: Node.js & Express API Gateway.
- **Database**: MongoDB Atlas for storing historical predictions, weather data, and chats.
- **AI Engine**: Google Generative AI (Gemini 1.5 Pro & Vision) for all analytical features.
- **Cache**: In-memory caching for API optimization using `node-cache`.

## 💻 Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS v4, Framer Motion, Recharts, Lucide-React
- **Backend**: Node.js, Express, Multer (Memory Storage), Mongoose, Axios, Compression, Helmet
- **Database**: MongoDB Atlas
- **External APIs**: Google Gemini API, OpenWeatherMap API

## 🚀 Installation & Running Locally

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas URI
- Google Gemini API Key
- OpenWeatherMap API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` and configure your keys:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_uri
   GEMINI_API_KEY=your_gemini_api_key
   OPENWEATHERMAP_API_KEY=your_openweathermap_key
   CLIENT_URL=http://localhost:5173
   ```
4. Start the server:
   ```bash
   node server.js
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

### Frontend (Vercel)
The frontend is optimized for zero-config Vercel deployment.
1. Connect your GitHub repository to Vercel.
2. Select the `frontend` directory as the Root Directory.
3. Framework Preset: `Vite`.
4. Add Environment Variables:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
5. Deploy.

### Backend (Render / Heroku)
1. Connect your repository to Render as a Web Service.
2. Set Root Directory to `backend`.
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add Environment Variables (MongoDB, Gemini, OpenWeather).
6. Deploy.

## 🔮 Future Scope
- Drone imagery integration for large-scale field scanning.
- Automated IoT sensor data collection directly into the Yield Prediction engine.
- Multi-language support (Hindi, Marathi, etc.) for broader accessibility among farmers.

## 📜 License
This project is licensed under the MIT License.
