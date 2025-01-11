const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Updated CORS
app.use(cors({
  origin: CLIENT_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use(express.json());
app.use(session({ 
  secret: 'better-spotify-wrapped', 
  resave: false, 
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 1 dayy
  }
}));

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Rate limiter 
const quipLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 10, // 5 requests per window
  message: 'Too many requests to generate quip. Please try again later.',
});

// Attach rate limiter
app.use('/api/generate-quip', quipLimiter);

// Authentication 
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};

// Protected routes
app.use('/api/fetch-spotify-data', isAuthenticated);
app.use('/api/user-profile', isAuthenticated);

app.use('/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/userRoutes'));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});