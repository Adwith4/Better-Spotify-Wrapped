import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { fetchUserProfile } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserProfile();
        setUserData(data);
      } catch (err) {
        setError('Failed to load your Spotify data.');
      }
    };
    fetchData();
  }, []);

  const handleStartJourney = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      navigate('/slide1', { replace: true });
    }
  };

  return (
    <Layout title="Welcome to Your Better Spotify Wrapped">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-spotify-black to-black">
        {error ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <p className="text-red-400 text-lg">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="spotify-button"
              onClick={() => navigate('/')}
            >
              Go Back
            </motion.button>
          </motion.div>
        ) : !userData ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2"
          >
            <div className="w-4 h-4 bg-spotify-green rounded-full animate-bounce" />
            <p className="text-spotify-white text-lg">Loading your data...</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl font-bold text-spotify-white mb-2">
              Hi, {userData.displayName || 'Music Fan'}!
            </h2>
            <p className="text-spotify-gray text-lg mb-8">
              Ready to explore your musical journey?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`spotify-button ${isNavigating ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleStartJourney}
              disabled={isNavigating}
            >
              {isNavigating ? 'Loading...' : 'Start Your Journey'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;