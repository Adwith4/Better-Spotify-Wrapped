const express = require('express');
const router = express.Router();
const { fetchSpotifyData } = require('../controllers/spotifyController');
const { generateQuip } = require('../controllers/openAIController');

router.get('/user-profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  res.json({
    id: req.user.id,
    displayName: req.user.displayName,
    email: req.user.email
  });
});

router.get('/fetch-spotify-data', fetchSpotifyData);

router.get('/stats/me/artists', async (req, res) => {
  try {
    const stats = await fetchSpotifyData(req, res, 'artists');
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
});

router.get('/stats/me/tracks', async (req, res) => {
  try {
    const stats = await fetchSpotifyData(req, res, 'tracks');
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
});

router.post('/generate-quip', generateQuip);

module.exports = router;
