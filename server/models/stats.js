// server/models/Stats.js
const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  year: {
    type: Number,
    default: 2024
  },
  topArtists: [String],
  topTracks: [String],
  topGenres: [String],
  totalStreams: Number,
  monthlyTrends: [Number],
  listeningClock: {
    morning: [String],
    afternoon: [String],
    evening: [String],
    night: [String]
  },
});

module.exports = mongoose.model('Stats', statsSchema);
