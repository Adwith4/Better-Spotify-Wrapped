const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  topArtists: [String],
  topTracks: [String],
  topAlbums: [String],
  topGenres: [String],
  listeningClock: {
    morning: [String],
    afternoon: [String],
    evening: [String],
    night: [String],
  },
  monthlyTrends: [Number],
  longestStreak: Number,
  mostStreamedSong: String,
  highestBpmTrack: String,
});

module.exports = mongoose.model('Stats', StatsSchema);