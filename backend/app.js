const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/requests');

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

// Root route - optional
app.get('/', (req, res) => {
  res.send('Prismatique Backend is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});