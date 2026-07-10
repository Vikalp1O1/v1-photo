import React from 'react';
import AlbumSlider from '@/components/AlbumSlider';
import { photoGalleryData } from '@/data/dummyData';

const PhotoGallery = () => {
  return <AlbumSlider albums={photoGalleryData} basePath="/photo-gallery" />;
};

export default PhotoGallery;
