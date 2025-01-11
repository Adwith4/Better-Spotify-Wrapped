import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Update imports
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Slide1Artists from './pages/Slide1_Artists';
import Slide2Tracks from './pages/Slide2_Tracks';
import Slide3Albums from './pages/Slide3_Albums';
import Slide4Genres from './pages/Slide4_Genres';
import Slide5Clock from './pages/Slide5_Clock';
import Slide6Calendar from './pages/Slide6_Calendar';
import Slide7LongestStreak from './pages/Slide7_LongestStreak';
import Slide8MostStreamedSong from './pages/Slide8_MostStreamedSong';
import Slide9HighestBpm from './pages/Slide9_HighestBpm';
import Slide10Final from './pages/Slide10_Final';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-spotify-black to-black text-spotify-white font-montserrat">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/slide1" element={<Slide1Artists />} />
        <Route path="/slide2" element={<Slide2Tracks />} />
        <Route path="/slide3" element={<Slide3Albums />} />
        <Route path="/slide4" element={<Slide4Genres />} />
        <Route path="/slide5" element={<Slide5Clock />} />
        <Route path="/slide6" element={<Slide6Calendar />} />
        <Route path="/slide7" element={<Slide7LongestStreak />} />
        <Route path="/slide8" element={<Slide8MostStreamedSong />} />
        <Route path="/slide9" element={<Slide9HighestBpm />} />
        <Route path="/slide10" element={<Slide10Final />} />
      </Routes>
    </div>
  );
}

export default App;
