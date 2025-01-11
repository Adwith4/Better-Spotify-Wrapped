import React from 'react';
import { motion } from 'framer-motion';

function Layout({ children, title }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-spotify-black to-black text-spotify-white p-8"
    >
      <div className="max-w-4xl mx-auto">
        {title && (
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold mb-8 text-center text-spotify-white"
          >
            {title}
          </motion.h1>
        )}
        {children}
      </div>
    </motion.div>
  );
}

export default Layout;
