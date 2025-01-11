import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import { useSpotifyData } from '../context/SpotifyDataContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Slide6_Calendar() {
  const { spotifyData, quip, error, isLoading } = useSpotifyData();

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const chartData = {
    labels: months,
    datasets: [{
      label: 'Monthly Listening',
      data: spotifyData?.monthlyTrends || Array(12).fill(0),
      borderColor: '#1DB954',
      backgroundColor: 'rgba(29, 185, 84, 0.3)',
      fill: true,
      tension: 0.2
    }]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#FFFFFF'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#FFFFFF'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF'
        }
      }
    }
  };

  return (
    <PageTransition title="Your Listening Calendar">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : isLoading ? (
          <p>Loading calendar data...</p>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl"
          >
            <div className="w-full max-w-[90%] md:max-w-[70%] lg:max-w-[50%] mx-auto mb-6">
              <Line data={chartData} options={chartOptions} />
            </div>
            <p className="text-spotify-green italic text-center">{quip}</p>
          </motion.div>
        )}
        <Navigation currentSlide={6} />
      </div>
    </PageTransition>
  );
}

export default Slide6_Calendar;
