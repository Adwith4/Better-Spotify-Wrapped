// server/config/passport.js
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_CALLBACK_URL,
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      try {
        // Transform the `photos` array into an array of strings
        const images = profile.photos.map(photo => photo.value);

        let existingUser = await User.findOne({ spotifyId: profile.id });
        if (!existingUser) {
          existingUser = await User.create({
            spotifyId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value || '',
            profileUrl: profile.profileUrl || '',
            images, // Use the transformed array of image URLs
            accessToken,
            refreshToken,
          });
        } else {
          existingUser.accessToken = accessToken;
          existingUser.refreshToken = refreshToken;
          existingUser.images = images; // Update images if necessary
          await existingUser.save();
        }
        return done(null, existingUser);
      } catch (err) {
        console.error('Error in Spotify strategy:', err);
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
