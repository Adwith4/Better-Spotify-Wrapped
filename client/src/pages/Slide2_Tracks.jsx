import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import { useSpotifyData } from '../context/SpotifyDataContext';

function Slide2_Tracks() {
  const { spotifyData, quip, error, isLoading } = useSpotifyData();

  return (
    <PageTransition title="Your Top Tracks">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : isLoading ? (
          <p>Loading tracks...</p>
        ) : (
          <div className="w-full max-w-[90%] md:max-w-[70%] lg:max-w-[50%] mb-6">
            {spotifyData.topTracks.map((track, index) => (
              <motion.li
                key={track.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-spotify-gray/20 p-4 rounded-lg flex items-center space-x-4 mb-4"
              >
                {track.imageUrl && (
                  <img 
                    src={track.imageUrl} 
                    alt={track.name}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-spotify-white text-lg font-bold">
                    {track.name}
                  </span>
                  <span className="text-spotify-gray text-sm">
                    {track.artist}
                  </span>
                </div>
              </motion.li>
            ))}
            <p className="text-spotify-green italic text-center mt-6">
              {quip}
            </p>
          </div>
        )}
        <Navigation currentSlide={2} />
      </div>
    </PageTransition>
  );
}

export default Slide2_Tracks;

