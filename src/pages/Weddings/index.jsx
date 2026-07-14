import React from 'react';
import AlbumSlider from '@/components/AlbumSlider';
import useApi from '@/hooks/useApi';
import { weddingApi } from '@/lib/endpoints';
import { resolveImageSrc, PLACEHOLDER_IMAGE } from '@/lib/helpers';

const Weddings = () => {
  const { data: weddings, loading } = useApi(() =>
    weddingApi.list({ limit: 50 })
  );

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white font-button text-sm tracking-widest uppercase animate-pulse">
          Loading Weddings...
        </div>
      </div>
    );
  }

  const albums = (weddings || []).map((wedding) => ({
    id: wedding.slug,
    title: wedding.coupleName,
    location: '',
    coverImage: resolveImageSrc(wedding.coverImage, PLACEHOLDER_IMAGE),
    description: wedding.description || '',
  }));

  return <AlbumSlider albums={albums} basePath="/weddings" />;
};

export default Weddings;
