const axios = require('axios');

const fetchSpotifyData = async (req, res) => {
    try {
        // Verify token exists
        if (!req.user?.accessToken) {
            return res.status(401).json({ message: 'No access token available' });
        }

        const headers = { 
            Authorization: `Bearer ${req.user.accessToken}`
        };

        // Verify if token is valid
        const userProfileRes = await axios.get('https://api.spotify.com/v1/me', { headers });
        
        // Fetch data
        const [topArtistsRes, topTracksRes] = await Promise.all([
            axios.get('https://api.spotify.com/v1/me/top/artists', {
                headers,
                params: {
                    limit: 20,
                    time_range: 'long_term'
                }
            }),
            axios.get('https://api.spotify.com/v1/me/top/tracks', {
                headers,
                params: {
                    limit: 20,
                    time_range: 'long_term'
                }
            })
        ]);

        const topArtists = topArtistsRes.data.items.map(artist => ({
            id: artist.id,
            name: artist.name,
            imageUrl: artist.images[0]?.url
        }));

        const topTracks = topTracksRes.data.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            imageUrl: track.album.images[0]?.url
        }));

        const userData = {
            user: userProfileRes.data,
            topArtists,
            topTracks,
            mostStreamedSong: topTracks[0],
            listeningClock: {
                morning: topTracks.slice(0, 5),
                afternoon: topTracks.slice(5, 10),
                evening: topTracks.slice(10, 15),
                night: topTracks.slice(15, 20)
            }
        };

        res.status(200).json(userData);

    } catch (error) {
        console.error('Spotify API Error:', {
            status: error.response?.status,
            data: error.response?.data
        });
        
        if (error.response?.status === 403) {
            res.status(403).json({
                message: 'Access denied. Please re-authenticate with Spotify.',
                details: error.response.data
            });
        } else {
            res.status(500).json({
                message: 'Error fetching Spotify data',
                details: error.response?.data
            });
        }
    }
};

module.exports = { fetchSpotifyData };
