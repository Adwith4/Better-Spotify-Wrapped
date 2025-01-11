import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useSpotifyData } from '../context/SpotifyDataContext';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

function Slide10_Final() {
  const { quip, error, isLoading } = useSpotifyData();
  const shareUrl = 'https://my-better-spotify-wrapped.com';

  return (
    <PageTransition title="Thank You for Exploring Your Better Spotify Wrapped!">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-spotify-green italic">
              {quip}
            </p>
            <p>Share your stats with friends:</p>
            <div className="flex gap-4 justify-center">
              <FacebookShareButton url={shareUrl} quote="Check out my Spotify Wrapped!">
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title="Check out my Spotify Wrapped!">
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <WhatsappShareButton url={shareUrl} title="Check out my Spotify Wrapped!">
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="bg-spotify-green text-spotify-black px-6 py-3 rounded-full font-bold"
            >
              Return to Home
            </motion.button>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}

export default Slide10_Final;
