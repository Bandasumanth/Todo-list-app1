const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

// 🔥 FINAL STRONG CORS CONFIGURATION
app.use(cors({
  origin: '*',                    // Allow all origins (for deployment)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight OPTIONS requests
app.options('*', cors());

app.use(express.json());

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});