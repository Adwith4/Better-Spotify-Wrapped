import axios from 'axios';
import axiosRetry from 'axios-retry';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
});

axiosRetry(api, { 
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 500;
  }
});

let cachedData = null;
let quipCooldown = false;

export const fetchSpotifyDataWithQuip = async () => {
    if (cachedData) return cachedData;
    if (quipCooldown) return cachedData; // Skip if cooldown is active

    quipCooldown = true;
    setTimeout(() => (quipCooldown = false), 5000); // Cooldown for 5 seconds

  const spotifyData = await api.get('/fetch-spotify-data');
  
  if (spotifyData.data?.topArtists?.length) {
    const artistNames = spotifyData.data.topArtists
      .map(artist => artist.name)
      .slice(0, 5)
      .join(', ');
      
    const quipResponse = await api.post('/generate-quip', {
      statDescription: `Your top artists are: ${artistNames}`
    });
    
    return {
      stats: spotifyData.data,
      quip: quipResponse.data.quip
    };
  }
  
  return {
    stats: spotifyData.data,
    quip: ''
  };
};

export const fetchUserProfile = async () => {
  const response = await api.get('/user-profile');
  return response.data;
};

export const fetchTopArtists = async () => {
  const response = await api.get('/stats/me/artists');
  return response.data;
};

export const fetchTopTracks = async () => {
  const response = await api.get('/stats/me/tracks');
  return response.data;
};

export default api;
