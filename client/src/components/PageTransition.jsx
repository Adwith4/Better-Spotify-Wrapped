import React from 'react';
import { motion } from 'framer-motion';
import Layout from './Layout';

const PageTransition = ({ children, title }) => {
  return (
    <Layout title={title}>
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </Layout>
  );
};

export default PageTransition;