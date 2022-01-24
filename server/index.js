/* eslint-disable camelcase */
/**
 * This example is using the Authorization Code flow.
 *
 * In root directory run
 *
 *     npm install express
 *
 * then run with the followinng command. If you don't have a client_id and client_secret yet,
 * create an application on Create an application here: https://developer.spotify.com/my-applications to get them.
 * Make sure you whitelist the correct redirectUri in line 26.
 *
 *     node access-token-server.js "<Client ID>" "<Client Secret>"
 *
 *  and visit <http://localhost:8888/login> in your Browser.
 */
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const { CLIENT_ID, CLIENT_SECRET } = require('./spotify/config.js');
const billboardData = require('./spotify/billboard.js');

const BILLBOARD_TOP_100 = '6UeSakyzhiEt4NB3UAd6NQ';

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify',
];

const spotifyApi = new SpotifyWebApi({
  redirectUri: 'http://localhost:3000/callback',
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

const app = express();

app.use(express.static('./client'));

// Spotify oAuth setup

app.get('/login', (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get('/callback', (req, res) => {
  const { error } = req.query;
  const { code } = req.query;
  const { state } = req.query;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const { access_token } = data.body;
      const { refresh_token } = data.body;
      const { expires_in } = data.body;

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      res.send('Success! You can now close the window.');

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const { access_token } = data.body;

        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);
    })
    .catch((error) => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

app.get('/top100', (req, res) => {
  // spotifyApi.getPlaylist(BILLBOARD_TOP_100)
  //   .then((results) => {
  //     console.log(results);
  //     res.send(results.body);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  res.send(billboardData);
});

app.listen(3000, () => console.log(
  'Server running.',
));
