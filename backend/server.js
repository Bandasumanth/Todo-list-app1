const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

// ✅ Updated CORS for your actual frontend
app.use(cors({ 
  origin: [
    'https://victorious-dune-0c6640b00.7.azurestaticapps.net',  // Your frontend URL
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});