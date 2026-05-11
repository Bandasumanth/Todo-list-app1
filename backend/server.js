const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); // Vite default port
app.use(express.json());

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});