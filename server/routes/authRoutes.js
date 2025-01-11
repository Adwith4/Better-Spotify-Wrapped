const express = require('express');
const passport = require('passport');
const router = express.Router();

// Redirect to Spotify for login
router.get('/spotify',
  passport.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private',
      'user-top-read',
      'user-read-recently-played',
      'user-read-playback-state',
      'user-library-read'
    ],
    showDialog: true
  })
);

// Spotify callback
router.get('/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: 'http://localhost:3000/login?error=true'
  }),
  (req, res) => {
    // Success: Redirect to React 
    res.redirect('http://localhost:3000/dashboard');
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.session = null;
    res.redirect('http://localhost:3000/');
  });
});

module.exports = router;
