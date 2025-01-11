const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const slideQuips = {
  artists: [
    "Your music taste is as unique as a fingerprint, but way more danceable!",
    "These artists basically live in your playlist now",
    "Your top artists could form the world's most eclectic supergroup"
  ],
  tracks: [
    "These tracks have been your loyal companions through thick and thin",
    "Your repeat button got quite the workout with these gems",
    "The soundtrack of your year, no skips needed"
  ],
  genres: [
    "Your genre mix is like a musical smoothie - surprisingly delicious!",
    "Genre boundaries? You don't know her",
    "Your music taste spans more genres than a record store"
  ],
  clock: [
    "Your day runs on beats per minute instead of coffee",
    "You've got a song for every hour of the day",
    "Your listening schedule is more reliable than a Swiss watch"
  ],
  calendar: [
    "Your year in music was quite the journey",
    "You've created enough playlists to fill a calendar",
    "Every month had its own soundtrack"
  ],
  streak: [
    "Your listening streak is hotter than your coffee",
    "You're more consistent than a metronome",
    "Your dedication to music is unmatched"
  ],
  mostPlayed: [
    "This song knows all your secrets by now",
    "Your most played track could probably sing itself",
    "This song deserves a loyalty card"
  ],
  bpm: [
    "This track gets your heart racing faster than a coffee rush",
    "Warning: This song may cause spontaneous dance moves",
    "The speed demon of your playlist"
  ],
  final: [
    "You're not just listening to music, you're living it",
    "Your music taste deserves its own Grammy category",
    "Thanks for letting us be part of your musical journey"
  ]
};

exports.generateQuip = async (req, res) => {
  try {
    const { statDescription } = req.body;
    let quipCategory = 'artists'; // default

    // Determine slide based on the description
    if (statDescription.includes('top artists')) quipCategory = 'artists';
    if (statDescription.includes('top tracks')) quipCategory = 'tracks';
    if (statDescription.includes('genres')) quipCategory = 'genres';
    if (statDescription.includes('listening clock')) quipCategory = 'clock';
    if (statDescription.includes('monthly')) quipCategory = 'calendar';
    if (statDescription.includes('streak')) quipCategory = 'streak';
    if (statDescription.includes('most streamed')) quipCategory = 'mostPlayed';
    if (statDescription.includes('BPM')) quipCategory = 'bpm';
    if (statDescription.includes('final')) quipCategory = 'final';

    const quips = slideQuips[quipCategory];
    const randomQuip = quips[Math.floor(Math.random() * quips.length)];
    
    res.json({ quip: randomQuip });
  } catch (error) {
    const fallbackQuip = "Your music taste is as unique as you are!";
    res.json({ quip: fallbackQuip });
  }
};
