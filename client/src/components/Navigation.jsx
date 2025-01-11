import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navigation({ currentSlide }) {
  const navigate = useNavigate();

  const handleNext = () => {
    const nextSlide = currentSlide + 1;
    if (nextSlide <= 10) {
      navigate(`/slide${nextSlide}`);
    }
  };

  const handlePrevious = () => {
    const prevSlide = currentSlide - 1;
    if (prevSlide >= 1) {
      navigate(`/slide${prevSlide}`);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="fixed bottom-8 right-8 flex space-x-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-spotify-gray/30 hover:bg-spotify-gray/50 text-spotify-white px-6 py-3 rounded-full font-bold transition-colors"
        onClick={handlePrevious}
      >
        Previous
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-spotify-green hover:bg-green-400 text-spotify-black px-6 py-3 rounded-full font-bold transition-colors"
        onClick={handleNext}
      >
        Next
      </motion.button>
    </div>
  );
}

export default Navigation;
