import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import { useSpotifyData } from '../context/SpotifyDataContext';

function Slide3_Albums() {
  const { spotifyData, quip, error, isLoading } = useSpotifyData();

  // (WORK IN PROGRESS) Extract unique albums from top tracks because Spotify doesn't provide it directly (lame)
  const albums = spotifyData?.topTracks?.reduce((acc, track) => {
    if (!acc.some(album => album.name === track.album)) {
      acc.push({
        id: `album-${acc.length}`,
        name: track.album,
        imageUrl: track.imageUrl,
        artist: track.artist
      });
    }
    return acc;
  }, []) || [];

  return (
    <PageTransition title="Your Top Albums">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : isLoading ? (
          <p>Loading albums...</p>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album, index) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-spotify-gray/20 p-4 rounded-lg text-center"
                >
                  {album.imageUrl && (
                    <img 
                      src={album.imageUrl}
                      alt={album.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h3 className="text-spotify-white font-bold text-lg mb-2">
                    {album.name}
                  </h3>
                  <p className="text-spotify-gray">
                    {album.artist}
                  </p>
                </motion.div>
              ))}
            </div>
            <p className="text-spotify-green italic text-center mt-8">
              {quip}
            </p>
          </motion.div>
        )}
        <Navigation currentSlide={3} />
      </div>
    </PageTransition>
  );
}

export default Slide3_Albums;
