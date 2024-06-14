import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  color: #333;
`;

const DropzoneContainer = styled.div`
  border: 2px dashed #007BFF;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  color: #007BFF;
  margin-top: 20px;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const AlbumPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const albums = JSON.parse(localStorage.getItem('albums')) || [];
    const foundAlbum = albums.find(album => album.id === id);
    if (foundAlbum) {
      setAlbum(foundAlbum);
      setImages(foundAlbum.images || []);
    }
  }, [id]);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setImages([...images, ...newImages]);

    // Update localStorage
    const albums = JSON.parse(localStorage.getItem('albums')) || [];
    const updatedAlbums = albums.map(album => 
      album.id === id ? { ...album, images: [...album.images || [], ...newImages] } : album
    );
    localStorage.setItem('albums', JSON.stringify(updatedAlbums));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  if (!album) return <div>Album not found</div>;

  return (
    <Container>
      <Title>{album.title}</Title>
      <p>{album.description}</p>
      <DropzoneContainer {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </DropzoneContainer>
      <ImagesContainer>
        {images.map((image, index) => (
          <ImagePreview key={index} src={image.preview || image} alt={`preview-${index}`} />
        ))}
      </ImagesContainer>
    </Container>
  );
};

export default AlbumPage;
