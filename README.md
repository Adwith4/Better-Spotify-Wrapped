# Better-Spotify-Wrapped

Welcome to the Better-Spotify-Wrapped repo! I've written out some intructions below on how to locally run this project on your end.

1. Clone the repo 

2. Make sure you have node.js installed and a have a spotify account (might have to be premium?)

3. Install dependencies:
    cd client
    npm install
    cd ../server
    npm install

4. Create a .env file in the server folder and add the following (Please don't share publicly!): 

MONGODB_URI=mongodb+srv://adwpillai:7osYtLa9XY5c0ykP@betterspotifywrapped.kcqc0.mongodb.net/?retryWrites=true&w=majority&appName=BetterSpotifyWrapped
SPOTIFY_CLIENT_ID=e332d3d5ad06449fba90691b6059e491
SPOTIFY_CLIENT_SECRET=e51b3540bdef489ebf571356efdd754a
SPOTIFY_CALLBACK_URL=http://localhost:3001/auth/spotify/callback
OPENAI_API_KEY= [ADD YOUR OPENAI API KEY HERE]
SESSION_SECRET=b0c94e0d5f7a9e8dd8bcda07a4c6505aa3f70792ac14bc85c3870b6bfe97f5dc
PORT=3001

5. Go to https://platform.openai.com/api-keys and create your own OpenAI API key. OpenAI will automatically delete the key if shared, so you'll have to make your own. Take that key and paste it in above where it says [ADD YOUR OPENAI API KEY HERE]

6. In the server directory run npm start

7. In the client directory run npm start

8. Go to http://localhost:3000/ if the program doesn't automatically open up a browser window

9. Enjoy!