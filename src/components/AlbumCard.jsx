import React from 'react';
import { Link } from 'react-router-dom';

const AlbumCard = ({ album }) => {
  return (
    <Link to={`/album/${album.id}`} className="card">
      <h2>{album.title}</h2>
      <p>{album.description}</p>
    </Link>
  );
};

export default AlbumCard;
