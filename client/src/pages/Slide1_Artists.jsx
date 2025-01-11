import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import { useSpotifyData } from '../context/SpotifyDataContext';

function Slide1_Artists() {
  const { spotifyData, quip, error, isLoading } = useSpotifyData();

  return (
    <PageTransition title="Your Top Artists">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-spotify-black to-black">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : isLoading ? (
          <p className="text-spotify-white">Loading...</p>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="space-y-8 w-full max-w-2xl"
          >
            <ul className="space-y-4">
                {spotifyData?.topArtists?.map((artist, index) => (
                    <motion.li
                        key={artist.id || `artist-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-spotify-gray/20 p-4 rounded-lg flex items-center space-x-4"
                    >
                        {artist.imageUrl && (
                            <img 
                                src={artist.imageUrl} 
                                alt={artist.name}
                                className="w-16 h-16 rounded-full"
                            />
                        )}
                        <span className="text-spotify-white text-lg font-bold">
                            {artist.name}
                        </span>
                    </motion.li>
                ))}
            </ul>
            <p className="text-spotify-green italic text-center text-lg">
              {quip}
            </p>
          </motion.div>
        )}
        <Navigation currentSlide={1} />
      </div>
    </PageTransition>
  );
}

export default Slide1_Artists;