import React from 'react';

function Song({ song }) {
  console.log(song);
  return (
    <tr>
      <th scope="row">{'<3'}</th>
      <td data-title="Name">{song.name}</td>
      <td data-title="Artist Name">{song.artists[0].name}</td>
      <td data-title="Album Name">{song.album.name}</td>
      <td data-title="Popularity">{song.popularity}</td>
    </tr>
  );
}

export default Song;
