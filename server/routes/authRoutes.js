// server/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// 1) Redirect to Spotify for login
router.get('/spotify',
  passport.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private',
      'user-top-read',
      'user-read-recently-played'
    ],
    showDialog: true
  })
);

// 2) Spotify callback
router.get('/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: 'http://localhost:3000/login?error=true'
  }),
  (req, res) => {
    // Success: redirect to React app
    res.redirect('http://localhost:3000/dashboard');
  }
);

// 3) Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.session = null;
    res.redirect('http://localhost:3000/');
  });
});

module.exports = router;
