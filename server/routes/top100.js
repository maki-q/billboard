const express = require('express');
const billboardData = require('../spotify/billboard.js');

const router = express.Router();
const db = require('../db/index.js');

const BILLBOARD_TOP_100 = '6UeSakyzhiEt4NB3UAd6NQ';

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
  res.send('POST OK');
});
