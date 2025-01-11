import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import { useSpotifyData } from '../context/SpotifyDataContext';

function Slide7_LongestStreak() {
  const { spotifyData, quip, error, isLoading } = useSpotifyData();

  return (
    <PageTransition title="Longest Listening Streak">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : isLoading ? (
          <p>Loading streak data...</p>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div className="text-6xl font-bold text-spotify-green">
              {spotifyData.longestStreak}
            </motion.div>
            <p className="text-xl">
              consecutive days of amazing music!
            </p>
            <p className="text-spotify-green italic">
              {quip}
            </p>
          </motion.div>
        )}
        <Navigation currentSlide={7} />
      </div>
    </PageTransition>
  );
}

export default Slide7_LongestStreak;
