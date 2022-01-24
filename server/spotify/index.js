const SpotifyWebApi = require('spotify-web-api-node');

const { CLIENT_ID, CLIENT_SECRET } = require('./config.js');

const spotifyApi = new SpotifyWebApi({
  redirectUri: 'http://localhost:3000/callback',
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

module.exports = spotifyApi;
