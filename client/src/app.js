import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Slide1 from './pages/Slide1';
import Slide2 from './pages/Slide2';
import Slide3 from './pages/Slide3';
import Slide4 from './pages/Slide4';
import Slide5 from './pages/Slide5';
import Slide6 from './pages/Slide6';
import Slide7 from './pages/Slide7';
import Slide8 from './pages/Slide8';
import Slide9 from './pages/Slide9';
import Slide10 from './pages/Slide10';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Slide Routes */}
        <Route path="/slide1" element={<Slide1 />} />
        <Route path="/slide2" element={<Slide2 />} />
        <Route path="/slide3" element={<Slide3 />} />
        <Route path="/slide4" element={<Slide4 />} />
        <Route path="/slide5" element={<Slide5 />} />
        <Route path="/slide6" element={<Slide6 />} />
        <Route path="/slide7" element={<Slide7 />} />
        <Route path="/slide8" element={<Slide8 />} />
        <Route path="/slide9" element={<Slide9 />} />
        <Route path="/slide10" element={<Slide10 />} />
      </Routes>
    </Router>
  );
}

export default App;
