import React, { useState, useEffect } from 'react';
import AlbumGrid from '../components/AlbumGrid';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Load albums from localStorage
    const savedAlbums = JSON.parse(localStorage.getItem('albums')) || [];
    setAlbums(savedAlbums);
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">My Albums</h1>
        <Link className="create-link" to="/create">Create New Album</Link>
      </header>
      <AlbumGrid albums={albums} />
    </div>
  );
};

export default HomePage;
