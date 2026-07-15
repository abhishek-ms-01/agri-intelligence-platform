require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const connectDB = require('./src/config/db');
const { errorHandler } = require('./src/middleware/errorMiddleware');


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Vite default port
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Routes
app.use('/api/crop', require('./src/routes/cropRoutes'));
app.use('/api/weather', require('./src/routes/weatherRoutes'));
app.use('/api/yield', require('./src/routes/yieldRoutes'));
app.use('/api/advisor', require('./src/routes/advisorRoutes'));
app.use('/api/schemes', require('./src/routes/schemeRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('Agri-Intelligence API is running...');
});

// Error handling middleware
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

module.exports = app;
