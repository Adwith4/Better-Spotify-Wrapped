import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import { SpotifyDataProvider } from './context/SpotifyDataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <SpotifyDataProvider> {/* Wrap App with Provider */}
      <App />
    </SpotifyDataProvider>
  </BrowserRouter>
);
