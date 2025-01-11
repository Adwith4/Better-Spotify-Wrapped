import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import { useSpotifyData } from '../context/SpotifyDataContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Slide4_Genres() {
  const { spotifyData, quip, error, isLoading } = useSpotifyData();

  const chartData = {
    labels: spotifyData.topGenres,
    datasets: [{
      data: spotifyData.topGenres?.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: Array(spotifyData.topGenres?.length).fill('#1DB954'),
      borderColor: Array(spotifyData.topGenres?.length).fill('#191414'),
      borderWidth: 1
    }]
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF'
        }
      }
    }
  };

  return (
    <PageTransition title="Your Top Genres">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : isLoading ? (
          <p>Loading genres...</p>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl"
          >
            <div className="w-full max-w-[90%] md:max-w-[70%] lg:max-w-[40%] mx-auto mb-6">
              <Pie data={chartData} options={chartOptions} />
            </div>
            <p className="text-spotify-green italic text-center">{quip}</p>
          </motion.div>
        )}
        <Navigation currentSlide={4} />
      </div>
    </PageTransition>
  );
}

export default Slide4_Genres;
