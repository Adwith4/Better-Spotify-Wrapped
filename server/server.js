const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const session = require('express-session'); // Import express-session

const app = express();

// Initialize Passport
require('./config/passport'); // Ensure the Spotify strategy is registered
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultSecret', // Set a strong secret in .env
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session()); // Enable session support

// Import routes
const authRoutes = require('./routes/authRoutes');

// Middleware to use routes
app.use('/auth', authRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.send('Hello from the server');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
