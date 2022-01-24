/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Song from './Song.jsx';

function App() {
  const [favoritesToggled, setFavoritesToggled] = useState(false);
  const [billboardData, setBillboardData] = useState([]);
  const [currentSort, setCurrentSort] = useState('');
  const [savedSongs, setSavedSongs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedIds, setSavedIds] = useState([]);

  function toggleSaved(addingSong, song) {
    if (addingSong) {
      setSavedSongs([...savedSongs, song]);
      setSavedIds([...savedIds, song.track.id]);
      axios.post('/top100', { song_id: song.track.id });
    } else {
      setSavedSongs(savedSongs.filter((saved) => saved.track.id !== song.track.id));
      setSavedIds(savedIds.filter((saved) => saved !== song.track.id));
      axios.patch('/top100', { song_id: song.track.id });
    }
  }

  useEffect(() => {
    axios.get('/top100').then((res) => {
      setSavedSongs(res.data.saved);
      setSavedIds(res.data.saved.map((song) => song.track.id));
      setBillboardData(res.data.songs.tracks.items);
      console.log(res.data.liveData);
      setLoggedIn(res.data.liveData);
    });
  }, []);

  useEffect(() => {
    const selectedFunction = favoritesToggled ? setSavedSongs : setBillboardData;
    const selectedBucket = favoritesToggled ? savedSongs : billboardData;

    selectedFunction([...selectedBucket].sort((a, b) => {
      switch (currentSort) {
        case 'Song':
          return a.track.name.toLowerCase().localeCompare(b.track.name.toLowerCase());
        case 'Artists':
          return a.track.artists[0].name.toLowerCase().localeCompare(b.track.artists[0].name.toLowerCase());
        case 'Album':
          return a.track.album.name.toLowerCase().localeCompare(b.track.album.name.toLowerCase());
        default:
          return b.track.popularity - a.track.popularity;
      }
    }));
  }, [currentSort]);

  function renderTitle(title) {
    return (
      <th scope="col" key={`header-${title}`}>
        <span>
          {`${title} `}
          <i
            onClick={() => setCurrentSort(title)}
            className={`arrow fas fa-chevron-${currentSort === title ? 'down' : 'up'}`}
            aria-hidden="true"
            style={{ display: title === 'Favorite' ? 'none' : '' }}
          />
        </span>
      </th>
    );
  }

  function renderSelectedList() {
    const selectedBucket = favoritesToggled ? savedSongs : billboardData;
    const displayBucket = selectedBucket.map((song) => <Song song={song} key={song.track.id} toggleSaved={toggleSaved} savedSong={savedIds.indexOf(song.track.id) !== -1} />);

    if (!displayBucket.length) {
      displayBucket.push(
        <tr>
          <td colSpan="5">
            <span>No songs favorited yet!</span>
          </td>
        </tr>,
      );
    }

    return displayBucket;
  }

  function renderAuthentication() {
    if (!loggedIn) {
      return (
        <caption>
          <a
            href="http://localhost:3000/login"
            target="popup"
            onClick="window.open('http://localhost:3000/login','popup','width=600,height=600'); return false;"
          >
            Log in to Spotify
          </a>
        </caption>
      );
    }
  }

  console.log(savedSongs);
  if (billboardData.length > 0) {
    return (
      <div className="container">
        <table className="responsive-table">
          <caption>Billboard Hot 100 Songs</caption>
          {renderAuthentication()}
          <caption>
            <button onClick={() => setFavoritesToggled(!favoritesToggled)} type="button">
              {favoritesToggled ? 'Show Hot 100 List' : 'Show Favorites'}
            </button>
          </caption>
          <thead>
            <tr>
              {['Favorite', 'Song', 'Artists', 'Album', 'Popularity'].map((type) => renderTitle(type))}
            </tr>
          </thead>
          <tbody>
            {renderSelectedList()}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div>
      Loading...
    </div>
  );
}

export default App;
