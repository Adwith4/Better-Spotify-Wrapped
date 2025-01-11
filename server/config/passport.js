const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => done(null, user.id));
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
        let user = await User.findOne({ spotifyId: profile.id });
        if (!user) {
          // Create user with no stats
          const userData = {
            spotifyId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value,
            profileUrl: profile.profileUrl,
            images: profile.photos?.map(photo => photo.value) || [],
            accessToken,
            refreshToken,
            tokenExpiresAt: new Date(Date.now() + expires_in * 1000)
          };
          user = await User.create(userData);
        } else {
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          user.tokenExpiresAt = new Date(Date.now() + expires_in * 1000);
          if (!user.stats) {
            user.stats = null; //Set to null if undefined
          }
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);