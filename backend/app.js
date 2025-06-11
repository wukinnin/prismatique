// backend/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const officeRoutes = require('./routes/offices');
const requestRoutes = require('./routes/requests');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/offices', officeRoutes);
app.use('/api/requests', requestRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Prismatique Backend is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});