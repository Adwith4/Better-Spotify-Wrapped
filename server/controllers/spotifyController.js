const axios = require('axios');
const User = require('../models/user');
const Stats = require('../models/stats');

exports.fetchSpotifyData = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const accessToken = req.user.accessToken;

    // top artists
    const topArtistsRes = await axios.get(
      'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const topArtists = topArtistsRes.data.items.map(artist => artist.name);

    // top tracks
    const topTracksRes = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const topTracks = topTracksRes.data.items.map(track => track.name);

    // top genres (from top artists)
    let allGenres = [];
    topArtistsRes.data.items.forEach(artist => {
      allGenres = [...allGenres, ...artist.genres];
    });
    const uniqueGenres = Array.from(new Set(allGenres)).slice(0, 5);

    // total streams is not directly provided by Spotify's top endpoints
    const totalStreams = 1234; // placeholder

    // upsert Stats for year 2024
    const stats = await Stats.findOneAndUpdate(
      { user: req.user._id, year: 2024 },
      {
        topArtists,
        topTracks,
        topGenres: uniqueGenres,
        totalStreams
      },
      { new: true, upsert: true }
    );

    // connect Stats to User if not already in array
    if (!req.user.stats.includes(stats._id)) {
      req.user.stats.push(stats._id);
      await req.user.save();
    }

    return res.json(stats);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch Spotify data' });
  }
};
