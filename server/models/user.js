// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  spotifyId: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: String,
  email: String,
  profileUrl: String,
  images: [String],

  accessToken: String,
  refreshToken: String,

  stats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stats'
  }]
});

module.exports = mongoose.model('User', userSchema);
