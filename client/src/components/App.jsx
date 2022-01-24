import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Song from './Song.jsx';

function App() {
  const [billboardData, setBillboardData] = useState({});

  useEffect(() => {
    axios.get('/top100').then((res) => {
      setBillboardData(res.data);
    });
  }, []);

  if (billboardData.description) {
    return (
      <div className="container">
        <table className="responsive-table">
          <caption>Billboard Hot 100 Songs</caption>
          <thead>
            <tr>
              <th scope="col">Favorite</th>
              <th scope="col">Song</th>
              <th scope="col">Artists</th>
              <th scope="col">Album</th>
              <th scope="col">Popularity</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan="7">
                Sources:
                {' '}
                <a href="https://codepen.io/pixelchar/pen/rfuqK" rel="external">CSS Template</a>
                {' '}
                &amp;
                {' '}
                <a href="https://developer.spotify.com/documentation/web-api/" rel="external">Spotify API</a>
                .
              </td>
            </tr>
          </tfoot>
          <tbody>
            {billboardData.tracks.items.map((song) => <Song song={song.track} key={song.id} />)}
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
