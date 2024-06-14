import React from 'react';
import AlbumCard from './AlbumCard';

const AlbumGrid = ({ albums }) => {
  return (
    <div className="grid">
      {albums.map((album, index) => (
        <AlbumCard key={index} album={album} />
      ))}
    </div>
  );
};

export default AlbumGrid;
