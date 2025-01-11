import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import { useSpotifyData } from '../context/SpotifyDataContext';

function Slide8_MostStreamedSong() {
  const { spotifyData, quip, error, isLoading } = useSpotifyData();

  return (
    <PageTransition title="Most Streamed Song">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : isLoading ? (
          <p>Loading song data...</p>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center space-y-6"
          >
            <h2 className="text-2xl">Your most played track is</h2>
            <motion.div 
              className="bg-spotify-gray/20 p-6 rounded-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {spotifyData.mostStreamedSong?.imageUrl && (
                <img 
                  src={spotifyData.mostStreamedSong.imageUrl}
                  alt={spotifyData.mostStreamedSong.name}
                  className="w-32 h-32 rounded-lg mx-auto mb-4"
                />
              )}
              <h3 className="text-3xl font-bold text-spotify-green">
                {spotifyData.mostStreamedSong?.name}
              </h3>
              <p className="text-lg text-spotify-gray mt-2">
                {spotifyData.mostStreamedSong?.artist}
              </p>
            </motion.div>
            <p className="text-spotify-green italic">
              {quip}
            </p>
          </motion.div>
        )}
        <Navigation currentSlide={8} />
      </div>
    </PageTransition>
  );
}

export default Slide8_MostStreamedSong;

