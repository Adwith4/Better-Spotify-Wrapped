import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import { useSpotifyData } from '../context/SpotifyDataContext';

function Slide5_Clock() {
  const { spotifyData, quip, error, isLoading } = useSpotifyData();
  const { morning, afternoon, evening, night } = spotifyData.listeningClock || {};

  const timeSlots = [
    { title: 'Morning (6AM-12PM)', songs: morning },
    { title: 'Afternoon (12PM-6PM)', songs: afternoon },
    { title: 'Evening (6PM-12AM)', songs: evening },
    { title: 'Night (12AM-6AM)', songs: night }
  ];

  return (
    <PageTransition title="Your Listening Clock">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : isLoading ? (
          <p>Loading listening patterns...</p>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {timeSlots.map(({ title, songs }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-spotify-gray/20 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-bold mb-4">{title}</h3>
                  <ul className="space-y-2">
                    {songs?.map((song, index) => (
                      <li key={index} className="text-spotify-white/80">
                        <span className="font-medium">{song.name}</span>
                        <span className="text-spotify-gray"> - {song.artist}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <p className="text-spotify-green italic text-center mt-8">{quip}</p>
          </motion.div>
        )}
        <Navigation currentSlide={5} />
      </div>
    </PageTransition>
  );
}

export default Slide5_Clock;
