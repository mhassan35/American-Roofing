// server.js

const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
require('dotenv').config();

const connectDB = require('./db/connect.js');

const app = express();
const port = process.env.PORT || 8080;

// Check required environment variables
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in .env file');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route (optional health check)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server function
const startServer = async () => {
  try {
    await connectDB();

    app.use('/api', userRoutes);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

startServer();
