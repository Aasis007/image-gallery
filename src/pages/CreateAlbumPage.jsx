import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlbumForm from '../components/AlbumForm';
import { v4 as uuidv4 } from 'uuid';

const CreateAlbumPage = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState(JSON.parse(localStorage.getItem('albums')) || []);

  const handleAddAlbum = (newAlbum) => {
    const albumWithId = { ...newAlbum, id: uuidv4() };
    const updatedAlbums = [...albums, albumWithId];
    setAlbums(updatedAlbums);
    localStorage.setItem('albums', JSON.stringify(updatedAlbums));
    navigate('/');
  };

  return (
    <div className="container">
      <h1 className="title">Create New Album</h1>
      <AlbumForm onAddAlbum={handleAddAlbum} />
    </div>
  );
};

export default CreateAlbumPage;
