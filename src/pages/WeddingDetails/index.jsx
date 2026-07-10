import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import AlbumDetails from '@/components/AlbumDetails';
import { realWeddingsData } from '@/data/dummyData';

const WeddingDetails = () => {
  const { id } = useParams();
  
  const wedding = realWeddingsData.find(w => w.id === id);

  if (!wedding) {
    return <Navigate to="/weddings" replace />;
  }

  return <AlbumDetails album={wedding} backPath="/weddings" />;
};

export default WeddingDetails;
