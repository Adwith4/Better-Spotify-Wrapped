import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import { useSpotifyData } from '../context/SpotifyDataContext';

function Slide9_HighestBpm() {
  const { spotifyData, quip, error, isLoading } = useSpotifyData();

  return (
    <PageTransition title="Highest BPM Track">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : isLoading ? (
          <p>Loading track data...</p>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-6"
          >
            <p className="text-xl">The track that gets your heart racing:</p>
            <motion.div 
              className="text-4xl font-bold text-spotify-green"
              whileHover={{ scale: 1.05 }}
            >
              {spotifyData.highestBpmTrack}
            </motion.div>
            <p className="text-spotify-green italic">
              {quip}
            </p>
          </motion.div>
        )}
        <Navigation currentSlide={9} />
      </div>
    </PageTransition>
  );
}

export default Slide9_HighestBpm;
