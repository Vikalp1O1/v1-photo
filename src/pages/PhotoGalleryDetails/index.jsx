import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import AlbumDetails from '@/components/AlbumDetails';
import { photoGalleryData } from '@/data/dummyData';

const PhotoGalleryDetails = () => {
  const { id } = useParams();
  
  const album = photoGalleryData.find(a => a.id === id);

  if (!album) {
    return <Navigate to="/photo-gallery" replace />;
  }

  return <AlbumDetails album={album} backPath="/photo-gallery" />;
};

export default PhotoGalleryDetails;
