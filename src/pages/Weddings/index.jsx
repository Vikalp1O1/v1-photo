import React from 'react';
import AlbumSlider from '@/components/AlbumSlider';
import { realWeddingsData } from '@/data/dummyData';

const Weddings = () => {
  return <AlbumSlider albums={realWeddingsData} basePath="/weddings" />;
};

export default Weddings;
