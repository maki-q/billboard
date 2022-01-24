/* eslint-disable camelcase */
const express = require('express');
const billboardData = require('../spotify/billboard.js');

const router = express.Router();
const db = require('../db/index.js');
const spotifyApi = require('../spotify');

const BILLBOARD_TOP_100 = '6UeSakyzhiEt4NB3UAd6NQ';

let favoritedSongs;

db.query('SELECT song_id FROM favorites')
  .then((results) => {
    favoritedSongs = results.rows;
  });

router.get('/', async (req, res) => {
  const payload = {};
  const compiledFavorites = favoritedSongs.map((song) => {
    for (let i = 0; i < billboardData.tracks.items.length; i += 1) {
      if (billboardData.tracks.items[i].track.id === song.song_id) {
        return billboardData.tracks.items[i];
      }
    }
  });

  payload.saved = compiledFavorites;
  payload.songs = billboardData;

  spotifyApi.getPlaylist(BILLBOARD_TOP_100)
    .then((results) => {
      payload.songs = results.body;
      payload.liveData = true;
      payload.liveDataMessage = 'SUCCESS';
      res.send(payload);
    })
    .catch((err) => {
      payload.liveDataMessage = err.message;
      res.send(payload);
    });
});

router.post('/', (req, res) => {
  const { song_id } = req.body;
  favoritedSongs.push(req.body);
  db.query('INSERT INTO favorites(song_id) VALUES ($1) RETURNING favorite_id', [song_id])
    .then(({ rows }) => {
      res.status(201).send({ status: 201, message: 'CREATED', entry_id: rows[0].favorite_id });
    }).catch((err) => {
      res.status(500).send({ status: 500, message: err.message, entry_id: null });
    });
});

router.patch('/', (req, res) => {
  const { song_id } = req.body;
  favoritedSongs = favoritedSongs.filter((song) => song.song_id !== song_id);
  db.query('DELETE FROM favorites WHERE song_id = $1 RETURNING *', [song_id])
    .then(({ rows }) => {
      res.status(201).send({ status: 201, message: 'DELETED', entry_id: rows });
    }).catch((err) => {
      res.status(500).send({ status: 500, message: err.message, entry_id: null });
    });
});

module.exports = router;
