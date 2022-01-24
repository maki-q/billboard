import React, { useState } from 'react';

function Song({ song, savedSong, toggleSaved }) {
  const [favorited, setFavorite] = useState(savedSong);

  function toggleFavorite() {
    toggleSaved(!favorited, song);
    setFavorite(!favorited);
  }

  return (
    <tr>
      <th scope="row">
        <i onClick={toggleFavorite} className={favorited ? 'fas fa-heart' : 'favorite-icon far fa-heart'} aria-hidden="true" />
      </th>
      <td data-title="Name">{song.name}</td>
      <td data-title="Artist Name">{song.artists[0].name}</td>
      <td data-title="Album Name">{song.album.name}</td>
      <td data-title="Popularity">{song.popularity}</td>
    </tr>
  );
}

export default Song;
