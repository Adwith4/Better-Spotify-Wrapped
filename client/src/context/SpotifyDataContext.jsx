import { createContext, useContext, useState, useEffect } from 'react';
import { fetchSpotifyDataWithQuip } from '../utils/api';

const SpotifyDataContext = createContext(null);

export const SpotifyDataProvider = ({ children }) => {
    const [data, setData] = useState({
        stats: {
            topArtists: [],
            topTracks: [],
            listeningClock: {
                morning: [],
                afternoon: [],
                evening: [],
                night: []
            },
            monthlyTrends: Array(12).fill(0),
            longestStreak: 0,
            mostStreamedSong: null,
            highestBpmTrack: null
        },
        quip: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const responseData = await fetchSpotifyDataWithQuip();
                setData(responseData);
            } catch (err) {
                console.error('Error loading Spotify data:', err);
                setError('Failed to load Spotify data');
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <SpotifyDataContext.Provider value={{
            spotifyData: data.stats,
            quip: data.quip,
            isLoading,
            error
        }}>
            {children}
        </SpotifyDataContext.Provider>
    );
};

export const useSpotifyData = () => {
    const context = useContext(SpotifyDataContext);
    if (!context) {
        throw new Error('useSpotifyData must be used within SpotifyDataProvider');
    }
    return context;
};
