const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

// Strong CORS Configuration
app.use(cors({
  origin: '*',   // Allow all for now (we can restrict later)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Explicitly handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

app.use(express.json());

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});