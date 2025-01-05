const express = require('express');
const { fetchSpotifyData } = require('../controllers/spotifyController');
const router = express.Router();
const Stats = require('../models/stats');

const { generateQuip } = require('../controllers/openAIController'); //Chat GPT Quip
router.post('/generate-quip', generateQuip);

router.get('/fetch-spotify-data', fetchSpotifyData);

// CREATE
router.post('/stats', async (req, res) => {
  try {
    const newStats = await Stats.create(req.body);
    res.status(201).json(newStats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ
router.get('/stats/:userId', async (req, res) => {
  try {
    const userStats = await Stats.find({ user: req.params.userId });
    res.json(userStats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put('/stats/:statsId', async (req, res) => {
  try {
    const updatedStats = await Stats.findByIdAndUpdate(
      req.params.statsId,
      req.body,
      { new: true }
    );
    res.json(updatedStats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/stats/:statsId', async (req, res) => {
  try {
    await Stats.findByIdAndDelete(req.params.statsId);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
