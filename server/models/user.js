const mongoose = require('mongoose');
const { isNullOrUndefined } = require('mongoose/lib/utils');

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
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  tokenExpiresAt: {
    type: Date,
  },
  stats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stats',
    default: null
  },
});

module.exports = mongoose.model('User', userSchema);