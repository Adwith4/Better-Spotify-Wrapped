// server/index.js
require('dotenv').config();
require('./config/passport');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');


const app = express();

// ─────────────────────────────────────────────────────────────────────────────
// 1. Mongoose Connection
// ─────────────────────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Express Middlewares
// ─────────────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:3000', // React App
  credentials: true,
}));
app.use(express.json());

app.use(cookieSession({
  name: 'spotify-session',
  keys: [process.env.SESSION_SECRET],
  maxAge: 24 * 60 * 60 * 1000, // 1 day
}));

app.use(passport.initialize());
app.use(passport.session());

// ─────────────────────────────────────────────────────────────────────────────
// 3. Routes
// ─────────────────────────────────────────────────────────────────────────────
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes.js');
app.use('/auth', authRoutes);
app.use('/api', userRoutes);

// ─────────────────────────────────────────────────────────────────────────────
// 4. Start Server
// ─────────────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
